---
path: 'handle-jwt-more-securely-in-a-single-page-app'
date: '2022-01-21'
title: 'Handle JWT more securely in a single page app'
featuredImage: ../images/security.jpg
isFeatured: true
topics: ['Authentication', 'React']
---

## Introduction

Now a days, JWT is one of the most popular way to implement authentication. But
with every good, there is a bad! As we normally store our JWT token in
`localStorage` or `cookie`, it's very lucrative to the attackers and can be
stolen easily. So we can increase our security by implementing refresh token &
`httpOnly` cookie.

> **_NOTE:_** This article is heavily inspired from
> [The Ultimate Guide to handling JWTs on frontend clients (GraphQL)](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#jwt_structure)
> It's more of a "React Implementation" of the article. You will get better
> understanding if you read that first.

## Things to do

1. Create JWT for a very short time, optimal is 10-15mins.
2. Implement **Refresh Token**
3. Use `httpOnly` cookie
4. Store JWT in a memory instead of `localStorage` or `cookie`.

## Workflow

When user first send login request to our service, after verify the user we will
create two JWT tokens. We will send one token aka **Refresh Token** over
`httpOnly` cookie, and another one aka **Access Token** through api response.
Now in the client side we will store the **Access Token** in our memory, and
will send it as Authorization header. Before expire the **Access Token** token,
we another request to our `/refresh-token` endpoint, here we verify and send
another **Access Token**.

## Implement API

To make our service work with `httpOnly` cookie, we need to add `origin` and
`credentials` to `cors` settings.

```javascript
app.use(cors({ credentials: true, origin: 'https://example.com' }));
```

> **_NOTE:_** You can get full code
> [here](https://github.com/mbmohib/jwt-auth-refresh-token)

Now we need to create two route functions, one for creating **Refresh Token**.
It's expiry can be one day or more depends on your app. And another one is
**Access Token**, it's expiry should not be more than 10-15mins.

### Create login function

```javascript
/*
  This route will perform login and generate both tokens
*/
router.post('/login', async (req: Request, res: Response) => {
  try {
    // after verifying email and password, get user info from db

    // create refresh token for 1day
    const { token: refreshToken } = generateToken(user, '1d');
    // create access token for 10min
    const { token } = generateToken(user, '10m');

    // send refresh token thorough httpOnly cookie
    res.cookie('cookie-name', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000; // setting cookie age for 1day
    });

    // send only access token thorough api response
    res.status(200).json({
      data: {
        user,
        token,
      },
      message: 'Logging successful',
    });
  } catch(err) {
    // handler error
  }
});
```

### Create refresh token route

```javascript
/*
  This route will silently generate access token after
  verifying refresh token from cookie
*/
router.post('/refresh-token', async (req: Request, res: Response) => {
  try {
    // get refresh token from cookie
    const refreshToken = req.cookies.rt;

    if (!refreshToken) {
      throw 401;
    }

    const payload = verifyToken(refreshToken, jwtRefreshTokenSecret!);

    const user = payload?.data;
    // create new access token again for 10mins
    const { token } = generateToken(user, '10m');

    res.status(200).json({
      data: {
        user,
        token,
      },
      message: 'Token fetched successfully',
    });
  } catch (err) {
    // handle error
  }
};
```

## Implement in front-end

As our service is fully ready to work with refresh token workflow, now we will
implement it in our favorite `React` app. As per our discussion above, our
**Refresh token** will be set by server and we can't access it using javascript.
On the other hand the **Access Token** that has been sent over api, we will
store it in our memory. It can be `context` or `redux store` depends on your
implementation.

### Handle login

For handling api request I am using my favorite library
[`React Query`](https://react-query.tanstack.com/). It makes handing
data-fetching so much easy! In line number 7, after receiving the data we are
storing it in our context.

```javascript
export const useLogin = () => {
  const axios = useAxios();
  const { setAuth } = useAuth();

  return useMutation(({ data }: loginData) => axios.post(`/login`, data), {
    onSuccess: data => {
      setAuth(data.data.data); // highlight-line
    },
  });
};
```

### Create auth context

This is nothing special, we just setting auth data, and two function,
**setAuth** and **removeAuth** to our context value to access anywhere in our
app. Although, we doing one extra thing in line number 29, 30, is decoding `JWT`
store expiry in our auth data. You will find out next, why we are doing this.

```javascript
import { createContext, useContext, useMemo, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Auth, Token } from '../types';

interface AuthContextState extends Auth {
  setAuth: (data: Auth) => void;
  removeAuth: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const initialAuthState: Auth = {
  isAuthenticated: false,
  user: {},
};

export const AuthContext = createContext({} as AuthContextState);

export function AuthProvider({ children }: AuthProviderProps) {
  const [authData, setAuthData] = useState<Auth>(initialAuthState);

  const setAuth = (data: Auth) => {
    if (!data.token) {
      return initialAuthState;
    }

    const decoded: Token = jwtDecode(data.token); // highlight-line
    setAuthData({ ...data, isAuthenticated: true, expiredIn: decoded.exp }); // highlight-line
  };

  const removeAuth = () => {
    setAuthData(initialAuthState);
  };

  const contextValue: AuthContextState = useMemo(
    () => ({
      ...authData,
      setAuth: setAuth,
      removeAuth: removeAuth,
    }),

    // eslint-disable-next-line
    [authData],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
```

We can verify that the **Refresh Token** is setting as `httpOnly` by inspecting
the app and opening `Cookies` section in `Application` tab. And also, if you go
to the console and execute `document.cookie`, you will see our `ra` aka
**Refresh Token** cookie is not there, so it's not accessible by javascript.

![image of httpOnly cookie in of handle your JWT more securely in a single page app's article](../images/image-of-httpOnly-cookie.png 'httpOnly cookie')

So, our **Refresh Token** is setting by our service, and we are storing our
access token in our memory that will be used as Authorized header. Now we have
two problems that needs to be handled

1. Every time we reload our app, the token will be gone and we will loose the
   authentication as we are storing our access token in memory.
2. The **Access Token** expires within very short time, like in 10mins. So we
   will need to silently get new token before it expired.

### Handle app reload

In our `app.tsx` we will first show loading and in the meantime we will hit our
**Refresh Token** route to get a new **Access Token**, so every time our user
reload we will get a new **Access Token**

```javascript
export default function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getRefreshToken = useRefreshToken();

  useEffect(() => {
    getRefreshToken.mutate(
      {
        data: null,
      },
      {
        onSettled: () => {
          setLoading(false);
        },
        onError: () => {
          navigate('/login');
        },
      },
    );
  }, []);

  return (
    <PreLoader isLoading={loading}>
      <AppRoutes />
    </PreLoader>
  );
}
```

### Handle **Access Token** expiry

Now there are multiple ways to handle the expiry token. One way can be every
time the token expire and the server return `401` we will hit our
`/refresh-token` route and get new **Access Token** then again hit the protected
route. But I like another way most, in this way every time we sent any api
request first we check if the current token expire, if it's expire first we will
get new **Access Token** then sent the api request. We can easily implement this
using `axios` `interceptors`. So let's create another cool custom hook
`use-axios.ts`

```javascript{15-20}
export default function useAxios() {
  const { token, expiredIn, setAuth, removeAuth } = useAuth();

  const axiosClient: Axios = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: apiEndpoint,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        if (token && expiredIn && Date.now() >= expiredIn * 1000) {
          const { data, status } = await axios.post(
            '/refresh-token',
            {},
            config,
          );

          if (config.headers && status === 200) {
            setAuth(data.data);
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${data.data.token}`;
          }
        } else if (token && config.headers) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
    );

    axiosInstance.interceptors.response.use(
      undefined,
      (error: AxiosError): Promise<AxiosError> => {
        const statusCode = error.response ? error.response.status : null;

        if (statusCode === 401) {
          removeAuth();
        }

        return Promise.reject(error);
      },
    );

    return axiosInstance;

    // eslint-disable-next-line
  }, [token]);

  return axiosClient;
}
```

Earlier in our [Create auth context](#create-auth-context) section, in line 19
we have decoded the token expiry and save it our context, now in the above
highlighted line 15, we will check if token expired and get new token.

## Let's talk Logout

Normally when we were storing our token in `localStorage` we simply, delete
`auth` from `localStorage` and user is logged out, but in our **Refresh Token**
workflow we need to create an `api` for this.

### Create logout route

In this `/logout` endpoint we will set a new token with **same name**, where the
value will be empty string and we also set the `maxAge` to `0`

```javascript
/*
  This route will perform login and generate both tokens
*/
router.post('/logout', async (req: Request, res: Response) => {
  try {
    res.cookie('rt', '', {
      httpOnly: true,
      maxAge: 0,
    });

    res.status(200).json({
      data: {},
      message: 'Logout successfully',
    });
  } catch (err) {
    // handler error
  }
});
```

### Handle logout in client

We also need to remove our `auth` data from our memory, so let's write a `hook`
for that.

```javascript
export const useLogout = () => {
  const axios = useAxios();
  const { removeAuth } = useAuth();

  return useMutation(() => axios.post(`/logout`), {
    onSuccess: () => {
      removeAuth();
    },
  });
};
```

So, this is how we can implement a **Refresh Token** workflow, and increase our
security.
