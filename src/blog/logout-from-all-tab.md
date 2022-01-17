---
path: 'get-logout-from-all-tab'
date: '2022-01-16'
title: 'Get logout from all tab!'
featuredImage: sync.jpg
isFeatured: true
---

It's great to have a comment section on any blog site. People can easily express
their opinion regarding a blog post. It creates an opportunity for knowledge
sharing. In this tiny post, I'll try to go through the easiest steps of adding
`Disqus` commenting on any `Gatsby` site. So, let's start...

### Step 1: Install gatsby-plugin-disqus

Instead of configuring everything by ourselves manually, we'll use a plugin
called [gatsby-plugin-disqus](https://github.com/tterb/gatsby-plugin-disqus).
Now, install the plugin by running the following command:

### Step 2: Configure plugin

Add this code to your `gatsby-config.js` file's plugins section:

### Step 3: Use Disqus component in your blog-post template file

Import the `Disqus` component from the library:

```javascript
import { Disqus } from 'gatsby-plugin-disqus';
```

Create configuration for each post in the `render` method:

```javascript
//change according to your data
const disqusConfig = {
  url: `${siteUrl}/${post.fields.slug}`,
  identifier: post.fields.slug,
  title: post.frontmatter.title,
};
```

Finally add the `Disqus` component where ever you want:

**N.B. You can get the shortname of your site on Disqus's general settings
page.**

That's it! If you follow the steps correctly your site will have a comment
section just like below. Let me know if the tutorial works or not, or any other
queries you like to know.
