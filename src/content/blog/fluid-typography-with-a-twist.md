---
author: Ben Griffin
pubDatetime: 2024-01-29
modDatetime: 2024-01-29
title: Fluid typography with a twist
slug: fluid-typography-with-a-twist
featured: true
draft: false
tags:
  - css
description: Shaken, not stirred
---

_Shaken, not stirred_

Fluid typography is not a new concept, but it's only recently the browser support has gotten to a place where the implementation is pretty seamless. At its core, it's simple math, but it's incredibly powerful in what it unlocks.

Fluid typography is based on the slope of a line between two points (remember your `y = mx + b` from geometry?). In this case, our points are the minimum and maximum font-size of our type. Calculating the slope of the line when accounting for screen sizes is a little tricky, but here's a [great article from Smashing Magazine](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/) that goes through the math.

Using the [CSS clamp() function](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp), we pass the minimum font-size, preferred font-size (the slope), and maximum font-size and the function handles the rest.

```css
font-size: clamp(
  [minimum-font-size],
  [preferred-font-size],
  [maximum-font-size]
);
```

We can then assemble a set of scales to cover the various font "sizes" we need to support.

```css
--type-scale--1: clamp(1.33rem, 0.29vw + 1.24rem, 1.6rem);
--type-scale-0: clamp(1.6rem, 0.44vw + 1.46rem, 2rem);
--type-scale-1: clamp(1.92rem, 0.64vw + 1.72rem, 2.5rem);
--type-scale-2: clamp(2.3rem, 0.9vw + 2.02rem, 3.13rem);
--type-scale-3: clamp(2.76rem, 1.25vw + 2.36rem, 3.91rem);
--type-scale-4: clamp(3.32rem, 1.72vw + 2.77rem, 4.88rem);
--type-scale-5: clamp(3.98rem, 2.33vw + 3.24rem, 6.1rem);
--type-scale-6: clamp(4.78rem, 3.13vw + 3.78rem, 7.63rem);
--type-scale-7: clamp(5.73rem, 4.17vw + 4.4rem, 9.54rem);
```

Where `scale-0` is the baseline (think body copy) all the way up to `scale-7` (think giant display headings). You can also add a negative scale for text treatments that might be intentionally smaller than body copy (eyebrows, kickers, etc). This scale is centralized and can be adjusted as needed to ensure it's meeting the needs of your consumers ... in other words, your fluid scale, will be fluid.

Note I wrapped "sizes" in quotation marks up above. That's because this technique represents a departure in how we think about font-sizes across screens. There is no longer an explicit size for anything between desktop and mobile, the type will fluidly scale between its upper and lower bound without any media queries. That's right, I'll say that again, using this technique **it's not necessary to write media queries to handle scaling your type across breakpoints**. Your body copy is your body copy and the fluid scale will handle how it responds to different devices and screen sizes.

## The twist

That's right, this is fluid typography ✨ _with a twist_ ✨.

Traditionally, the fluid slope is created using `vw` units in order to respond across screen sizes, but we've taken this a step further with [container query units](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries#container_query_length_units). Specifically, we're using the `cqw` unit in place of `vw` so that if your fluid type is within a container, it will respond to the container's width instead. If no container is present, `cqw` becomes the equivalent of `vw`.

Let's apply this twist to our scale:

```css
--type-scale--1: clamp(1.33rem, 0.29cqw + 1.24rem, 1.6rem);
--type-scale-0: clamp(1.6rem, 0.44cqw + 1.46rem, 2rem);
--type-scale-1: clamp(1.92rem, 0.64cqw + 1.72rem, 2.5rem);
--type-scale-2: clamp(2.3rem, 0.9cqw + 2.02rem, 3.13rem);
--type-scale-3: clamp(2.76rem, 1.25cqw + 2.36rem, 3.91rem);
--type-scale-4: clamp(3.32rem, 1.72cqw + 2.77rem, 4.88rem);
--type-scale-5: clamp(3.98rem, 2.33cqw + 3.24rem, 6.1rem);
--type-scale-6: clamp(4.78rem, 3.13cqw + 3.78rem, 7.63rem);
--type-scale-7: clamp(5.73rem, 4.17cqw + 4.4rem, 9.54rem);
```

This unlocks some really amazing patterns, imagine a scenario where you have auto-flowing horizontal grid of `1..n` cards.

With some simple CSS, we can have the cards automagically resize based on the count.

```css
.grid {
  display: grid;
  gap: 3.2rem
  grid-auto-flow: column;
}

.grid__card {
  container-type: inline-size;
}

.grid__card > h2 {
  font-size: var(--type-scale-1);
}
```

Because our card is defined as a CSS `container`, our font-size will scale based on the width of the container, which in turn is dynamic based on the number of cards. This allows our font-size to dynamically (and fluidly!) scale no matter the number of cards in our grid.

Pretty neat, right?
