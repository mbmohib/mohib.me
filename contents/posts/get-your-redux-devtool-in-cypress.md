---
path: 'get-your-redux-devtool-in-cypress'
createdAt: '2022-01-27'
updatedAt: '2022-01-28'
title: 'Get your Redux devtool in Cypress'
featuredImage: ../images/get-your-redux-devtool-in-cypress.jpeg
isFeatured: false
status: 'published'
topics: ['React', 'Testing']
---

## Introduction

Cypress is a wonderful tool for front-end testing and with
[Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro/)
from [Kent C. Dodds](https://kentcdodds.com/) it makes so much fun and easy to
write end-to-end testing. We can also use Cypress to automate some stuff like,
when we are building a long multi-page form, and every time we need to fill up
the first or second page to get working on the third page, we can easily
automate this with Cypress, in that way we also get our confidence by writing
test.

Now in this kind of scenario, we might need `Redux Dev Tool`. But you see, in
our Cypress window we will not be able to access our favorite `Redux Dev Tool`

## Install `Redux Dev Tool` from Chrome Store

First, we need to install `Redux Dev Tool` in our cypress browser, let's install
it from here
[Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

## Integrate to your App

Now we need to insert this small code to our `index.html` in our `public`
folder.

```html
<script>
  if (window.Cypress) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ =
      window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  }
</script>
```

Voila! Now you can easily access your `Redux Dev Tool` in your `React App`
