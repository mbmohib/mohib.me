---
path: 'handle-your-jwt-more-securely-in-a-single-page-app'
date: '2022-01-21'
title: 'Handle your JWT more securely in a single page app'
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

## Things to do:

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
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
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
app.

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
