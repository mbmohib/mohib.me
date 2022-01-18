---
path: 'improve-ux-by-logging-out-from-other-tabs'
date: '2022-01-18'
updatedAt: '2022-01-18'
title: 'Improve UX by logging out from other tabs'
featuredImage: ../images/sync.jpg
isFeatured: true
topics: ['UX', 'React']
---

We love the single-page application, It offers a much better user experience
(UX). It also brings some new challenges like when the user opens multiple tabs
and log out from one tab, then another tab should also be logged out. But often
we see other tabs that seem logged in and the user tries to interact with it.
Then when they do any API-related action like save or publish, then the API
return `401` and logged them out. It all leads to a bad user experience.

We can solve this problem using `storage` event.

** This tutorial is written on `React` but the knowledge can be implemented in
other framework too. **

## Set data to `localStorage` when user logout

First we need to push some data to `localStorage` every time user perform
logout. The key can be anything, and the value needs to be updated.

```javascript
window.localStorage.setItem('logout', Date.now().toString());
```

## Attach `storage` event handler

Then we will register a event handler in the root of our app. It can be in
`app.js` or `index.js` depends on your app's architecture.

```javascript
const handleSyncLogout = (event: StorageEvent) => {
  if (event.key === 'logout') {
    // perform logout action
  }
};

useEffect(() => {
  window.addEventListener('storage', handleSyncLogout);

  return () => {
    window.removeEventListener('storage', handleSyncLogout);
  };
}, []);
```

This way we can easily handle multi-tab logout and make our user happy.
