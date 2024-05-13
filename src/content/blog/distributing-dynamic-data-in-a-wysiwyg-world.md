---
author: Ben Griffin
pubDatetime: 2021-07-22
modDatetime: 2021-07-22
title: Distributing dynamic data in a WYSIWYG world
slug: distributing-dynamic-data-in-a-wysiwyg-world
featured: true
draft: false
tags:
  - vue
  - java
  - content
  - rei
description: This is not a story about pooping in the woods.
---

> This post was originally published on [REI's engineering blog](https://engineering.rei.com/content-management/distributing-dynamic-data-in-a-wysiwyg-world.html)

_This is not a story about pooping in the woods._

At REI, we’re renowned for providing the “green vest experience” to our customers. For those unfamiliar with our in-store offerings (gasp!), our employees go above and beyond to help customers dream, discover and plan their next outdoor adventure through a passionate combination of expert advice and product recommendations.

We’ve captured this “expert advice” digitally via a curated collection of content available in our (aptly named) [Expert Advice site](https://www.rei.com/learn/expert-advice). Our authors have done a fantastic job crafting articles on everything from [“How to build a campfire”](https://www.rei.com/learn/expert-advice/campfire-basics.html) to [“Crevasse rescue”](https://www.rei.com/learn/expert-advice/crevasse-rescue-skills.html) and yes, even [“How to poop in the woods”](https://www.rei.com/learn/expert-advice/hygiene-sanitation.html).

Customers love this content but we’ve struggled to capture the magic that comes from having a green vest give recommendations for “I want to climb Mt. Rainier, what gear do I need?” or “I need to poop in the woods, what shovel do you recommend?”.

This is mainly due to the fact that our authors had no way to dynamically fetch data from our product catalog. While they’ve found ways around this limitation via manual integration (e.g. hand-authoring product specifications and prices), there have been some drawbacks:

- What happens if there’s a pricing change?
- What happens if the product goes out of stock?

That’s a poor customer experience and a nightmare to maintain for our publishing team.

**Bottom line: Our customers want to know what products our experts recommend and we want a better way to meet that need.**

## Technical challenges

Our Expert Advice (EA) articles are authored within our headless content management system and delivered to the microsite by way of a high-availability content-service that serves as an abstraction layer between our content and its consumers.

The real challenge lies in how they are authored A.K.A The WYSIWYG conundrum.

WYSIWYG stands for “What You See Is What You Get” and describes editing software that allows for content representation with high-fidelity to the final product. Our CMS utilizes one such tool called CKEditor to handle the creation and formatting of content (e.g. links, headings, images, etc). While this is incredibly powerful and gives the author the ability to create rich content, it’s only capable of outputting that content as a string of raw HTML.

Starting to see where this is going?

Our front end framework of choice at REI is [Vue.js](https://vuejs.org/). While it is technically possible to mount and render a Vue component out of a string of HTML, it would require the full build of Vue at runtime and brings a whole host of security and performance concerns if we expose that compiler to the CMS.

So:

- How might we enable the capability to serve dynamic product data?

- While knowing that our EA publishing team is largely non-technical (i.e. no HTML experience)

- And keeping in mind that we don’t want to expose our site to unnecessary performance and security risks?

## The solve

What if we introduced some post-processing in the EA microsite’s controller to handle a custom HTML element? That would address our performance and security concerns and certainly help our engineers build the component; but what about the authors?

The magic actually lies in a partnership between a custom plugin for CKEditor, the EA microsite controller, the product-catalog service and the Vue application responsible for rendering the article.

### CKEditor

There’s nothing particularly revolutionary about the idea of using shortcode or custom HTML elements inside WYSIWYG editors. But things start to get a little messy when you need to introduce a strict data contract. Knowing that our end-users aren’t necessarily technical (and, more importantly, that they are human), how can we enforce the contract while reducing the risk of error and shoring up some of the potential brittleness?

The solution is surprisingly simple. CKEditor is open source and based on a plugin architecture. Essentially, the editor is just an empty box that gets filled with plugins to add features. Many are default, but CKEditor also provides a robust plugin SDK for creating custom functionality.

We created a simple form plugin that binds user-entered data to data-attributes on a custom HTML element. To the author, it’s only injecting a simple shortcode placeholder but it gives our controller everything it needs to fetch and process the data.

![CKEditor plugin showing some of the form fields](/assets/wysiwyg-plugin.jpg)

### The microsite and the product catalog

Our EA microsite consumes the HTML generated by the CKEditor from a highly available, highly-cached content delivery service. That HTML is then “chunked” into several blocks if one or more custom HTML elements are found in the payload. These blocks are then pushed to an array in the order they appear in the article.

Here are some examples of how a document is broken into an array of HTML elements and product elements that can be subject to post-processing.

![Diagram showing examples of chunked blocks](/assets/wysiwyg-postprocessing.png)

Each element of product data is interrogated for the attributes supplied by our authors and used to query our product service for information about the given product. The returned data is then injected as a JSON object to its associated block and sent to the model for consumption.

### The Vue application

As I mentioned before, the EA microsite is rendered using a component-based javascript framework called Vue. Vue loves structured data and now that we have these nicely structured blocks of content, it’s a simple matter to create an application render the article.

Vue comes packaged with a handy dynamic component directive that makes all this possible in just a few lines of template code. Using the `<component>` element paired with `:is` directive we can iterate through our content block array and dynamically render the appropriate component for the job.

```vue
<script setup>
import ProductTile from "@rei/product-tile";
import LongFormContent from "@rei/long-form-content";

defineProps({
  contentBlocks: { type: Array, default: () => [] },
});

const components = {
  ProductTile,
  LongFormContent,
};
</script>

<template>
  <article>
    <component
      v-for="block in contentBlocks"
      :key="block.id"
      :is="components[block.component]"
      :data="block.data"
    />
  </article>
</template>
```

Clean, right? In our scenario, all it took to achieve our desired view was a child component responsible for rendering the normal long-form content, and another to handle the new product tile.

## The result

Here you can see our new product tile flowing nicely within the body of the article, providing a consistent look and presentation of the product’s information.

![Product tile component](/assets/wysiwyg-product-tile.png)

But the best part? You guessed it, dynamic data.

Price change? No problem, our component will reflect that. New image? Piece of cake, our integration with the product catalog will fetch the new one. It’s amazing what you can unlock when you combine this data with our editorial content.

This wasn’t a one-off solve, this pattern of a combining a plugin with our content block strategy is already being extended to support additional dynamic data components in our articles. We’re excited by the potential and we hope it serves our users well, whether they’re reading an article or writing it.

After all, everyone needs to poop in the woods sometimes, don’t you want the best gear for the job?

![A roll of toilet paper on a tree branch](/assets/wysiwyg-tp.png)
