---
path: 'handle-jwt-more-securely-in-a-single-page-app'
createdAt: '2022-01-21'
updatedAt: '2022-01-26'
title: 'Handle JWT more securely in a single page app'
featuredImage: ../images/security.jpg
isFeatured: true
topics: ['Authentication', 'React']
---

## Introduction

Nowadays, JWT is one of the most popular ways to implement authentication. It's
a fantastic way to implement authentication but it has some security issues. As
we normally store our JWT token in `localStorage` or `cookie`, it's very
lucrative to the attackers and can be stolen easily. So we need to increase our
security. We can do this by implementing a refresh token with `httpOnly` cookie.

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

When a user first sends a login request to our service, after verifying the user
we will create two JWT tokens. We will send one token, we will call it **Refresh
Token** over `httpOnly` cookie, and another one, this we will call it **Access
Token** through API response. Now on the client-side, we will store the **Access
Token** in our memory instead of `localStorage` or `cookie` and used the
**Access Token** as `Authorized` `header`. Now, before the **Access Token**
token expired, we send another request to our `/refresh-token` endpoint, here we
verify the **Refresh Token** and send another **Access Token**.

## Implement API

First, we need to make our service work with `httpOnly` cookie, we will add
`origin` and `credentials` to `cors` settings.

```javascript
app.use(cors({ credentials: true, origin: 'https://example.com' }));
```

> **_NOTE:_** You can get full code
> [here](https://github.com/mbmohib/jwt-auth-refresh-token)

Now we need to create two route functions, one for creating **Refresh Token**.
Its expiry can be one day or more depending on your app. And another one is
**Access Token**, its expiry should not be more than 10-15mins.

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
    res.cookie('rt', refreshToken, {
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
**Refresh token** will be set by the server and we can't access it using
javascript. On the other hand the **Access Token** that has been sent over API,
we will store in our memory. It can be `context` or `redux store` depending on
your implementation.

### Handle login

For handling API request I am using my favorite library
[`React Query`](https://react-query.tanstack.com/). It makes handing
data-fetching so much easy! Here, in line number 7, after receiving the data we
are storing it in our context.

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

This is nothing special, we just set auth data, and two functions, `setAuth` and
`removeAuth` to our context value to access anywhere in our app. Although, we
are doing one extra thing in lines number 29, 30, which is decoding `JWT` and
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

Now, we can verify that the **Refresh Token** is set as `httpOnly` by inspecting
the app and opening `Cookies` section in `Application` tab. And also, if you go
to the console and execute `document.cookie`, you will see our `ra` aka
**Refresh Token** cookie is not there, so it's not accessible by javascript.

![image of httpOnly cookie in of handling your JWT more securely in a single page app's article](../images/image-of-httpOnly-cookie.png 'httpOnly cookie')

So, our **Refresh Token** is set by our service, and we are storing our **Access
Token** in our memory, that will be used as `Authorized` `header`. Now we have
two problems that need to be handled

1. Every time we reload our app, the token will be gone and we will loose the
   authentication as we are storing **Access Token** in memory.
2. The **Access Token** expires within a very short time, like in 10mins. So we
   will need to silently get a new token before it expired.

### Handle app reload

In our `app.tsx` we will first show loading and in the meantime, we will hit our
**Refresh Token** route to get a new **Access Token**, so every time our user
reload we will get a new **Access Token** and keep our used authenticated.

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
time the token expires and the server return `401` we will hit our
`/refresh-token` route and get new **Access Token** then again hit the protected
route. But I like another way most, in this way every time we sent any API
request first we check the current token expiry, if it expires first we will get
new **Access Token** then sent the API request along with our new token. We can
easily implement this using `axios` `interceptors`. So let's create another cool
custom hook `use-axios.ts`

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
we have decoded the token expiry and saved it in our context, now in the above
line 15, we will check if the token expired and get a new token.

## Let's talk Logout

Normally when we were storing our token in `localStorage` we simply, delete
`auth` from `localStorage` and user is logged out, but in our **Refresh Token**
the workflow we need to create an `API` for this.

### Create logout route

In this `/logout` endpoint we will set a new token with **same cookie name**,
where the the value will be an empty string and we also set the `maxAge` to `0`

```javascript
/*
  This route will perform logout
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

## Handle **Refresh Token** expiry

Our **Refresh Token** will also expire, we can renew in multiple ways, one way
is, every time we create a new **Access Token** we will also create new
**Refresh Token** and send as `httpOnly` cookie.

## Going extra mile

Now, if you check `Request Headers` for any request you will fine we are sending
our **Refresh Token** named `rt` cookie with every request.

![image of request header containing refresh token of handling your JWT more securely in a single page app's article](../images/reqeust-header-containing-refresh-token.png 'request header containing refresh token')

But we actually don't need our **Refresh Token** passing with every API request,
we can limit this to only `/refresh-token` endpoint by including `path` in our
`cookie` options.

```javascript{4}
res.cookie('rt', refreshToken, {
  httpOnly: true,
  maxAge: refreshTokenMaxAge,
  path: '/refresh-token',
});
```

Now, if you check you see, only in `/refresh-token` endpoint we are sending the
**Refresh Token**

## Conclusion

The way we have implemented our authentication its surely better than simply
storing it in our `localStorage` but its not 100% secure, in fact nothing is,
but it's much better implementation.

## Resources

1. [The Ultimate Guide to handling JWTs on frontend clients (GraphQL)](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#jwt_structure) -
   hasura.io
2. [JWT Authentication Node.js Tutorial with GraphQL and React](https://www.youtube.com/watch?v=25GS0MLT8JU&t=8384s) -
   Ben Awad
