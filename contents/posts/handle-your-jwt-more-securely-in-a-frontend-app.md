---
path: 'handle-your-jwt-more-securely-in-a-frontend-app'
date: '2022-01-21'
title: 'Handle your JWT more securely in a frontend app'
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
It's expiry can be one day or more depends on your app.

### writing continues...
