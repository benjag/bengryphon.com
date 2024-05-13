---
author: Ben Griffin
pubDatetime: 2024-02-13
modDatetime: 2024-02-13
title: The atomic advantage
slug: the-atomic-advantage
featured: false
draft: false
tags:
  - atomic design
  - cedar
  - rei
description: Driving efficiency in inefficient systems
---

![A mock up of an hero component across multiple breakpoints](/assets/logo.png)

Knowing what you know about readability and responsive design, you want the text to change style as the screen gets smaller. The image will handle itself because you are using a responsive `CdrImg`, but you choose to be more prescriptive with the text to give the best customer experience.

So in your mock, you:

1. Create four separate versions to showcase the text changes
2. In your handoff asset, you markup each version with the specific text styles you want per breakpoint so that your UX is clear to your engineering partner.

How much time did that take you to handle something as simple as a title? How many times have you gone through a similar exercise? Multiply that by how many designers across the co-op are solving for "title", and you can really start to see the inefficiency that creates.

### Developer experience

So far we've just talked about the design side of things, what happens when a developer needs to translate your design to code?

Here's what that might look like:

For the sake of the exercise, let's just focus on the text.

1. Setting up the template using the existing CdrText component.

```vue
<template>
  <CdrText class="custom-title">
    {{ title }}
  </CdrText>
</template>
```

Not a whole lot going on there, right? That's by design in order to enable the greatest flexibility and performance for applications at REI.

To bring in the styles, we need to access Cedar's [design tokens](https://cedar.rei.com/tokens).

```scss
<style lang="scss">
@import "@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens";

.custom-title {
  @include cdr-text-heading-display-1200;
}

</style>
```

Getting closer!

Now we need to address the responsive requirements of the UX. In order to do that we need to bring more tokens to handle the media queries (to tell the browser when to apply styles) and the additional font styles the design calls for.

```scss
<style lang="scss">
@import "@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens";

.custom-title {
  // lg -
  @include cdr-text-heading-display-1200;

  // med - lg
  @include cdr-lg-mq-down {
    @include cdr-text-heading-serif-800;
  }

  // sm - med
  @include cdr-md-mq-down {
    @include cdr-text-heading-sans-600;
  }

  // xs -sm
  @include cdr-sm-mq-down {
    @include cdr-text-heading-sans-500;
  }

  // 0 -xs
  @include cdr-xs-mq-only {
    @include cdr-text-heading-sans-400;
  }
}

</style>
```

Now we're getting somewhere! If we resize our page, we can see we're matching our design more closely now.

But that took your engineer a lot of time to implement and involved 9 different tokens, just to style a single title!

Further, it's impossible to account for all possible screen sizes within a static figma design. This design might need further refinement now that the designer can see it on a live page. This might lead to further back and forth between the designer and the developer.

**Before you know it, you've now spent multiple days on something as simple as a title.**

## The atomic advantage

With [Cedar 15](https://cedar.rei.com/whats-new/releases/cedar-15), we're introducing an atomic foundation, embracing content-driven and fluid design principles.

Given the same scenario as above, here's all you need to do to achieve a better and more efficient result

![A mock up of an hero component using an atomic title component](/src/assets/images/posts/use-cdr-title.png)

That's it, no duplicative versions to showcase changes across breakpoints, no time-consuming notation necessary in order to communicate how the style should change as the screen does. The fluid and atomic foundation built in to our atomic content components handles those repetitive design decisions for you.

### Developer experience

Let's take a look at the level of effort for an engineer to implement that same design now.

```vue
<template>
  <CdrTitle>
    {{ title }}
  </CdrTitle>
</template>
```

Ta da! That's it. Seriously. When a title is a title no matter it's presentation, we can eliminate thousands of hours of duplicative work across the co-op.

That's the advantage of atomic content.
