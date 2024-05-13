---
author: Ben Griffin
pubDatetime: 2024-05-13
modDatetime: 2024-05-13
title: The best interview question ever
slug: the-best-interview-question-ever
featured: true
draft: false
tags:
  - musings
description: Or, are you smarter than a preschooler?
---

<div>
  <img src="/assets/airbag-warning.jpg" class="w-full h-60 object-cover border-radius" alt="Airbag warning label on sun visor">
</div>

## WARNING DEATH OR SERIOUS INJURY CAN OCCUR

I was driving my daughter to preschool the other day when she piped up from the back seat:

> Dada, what does that sign mean?

I glanced back and realized she was pointing at the airbag warning sticker on the sun visor.

> Well honey, that sign is telling us that this car has airbags.

> What are airbags?

Oof, how do I explain airbags to a 3-year-old without scarring her for life? Getting her in the car in the morning is hard enough without the added terror of literal, explosively-powered bags of hot gas bursting out of the walls (we're only just getting over the balloon incident).

I thought about it for a second, before responding:

> An airbag is like a big pillow that pops out to keep us safe during a car crash.

She went quiet with that explanation. Nice job Dada, I think you nailed that one.

> Dada, what's a car crash?

Dammit.

## Communication breakdown

Communication is such an overlooked skill for an engineer, particularly the ability to translate highly-technical or abstract concepts to another audience.

Ask yourself, could you to explain Big O notation to a preschooler right now? How about the virtual DOM?

Are you ready for the inevitable, "Why?" after you stumble through your answer?

Obviously this is an extreme example, you probably don't work with preschoolers (though maybe you know an adult that acts like one). Regardless of the situation, I can't tell you how many times these kinds of scenarios have come up throughout my career.

> Why can't I see the change on my laptop yet?

> You keep saying client-side and server-side, but what does that actually mean?

> How is that 13 points? It's just a date-picker!

Sound familiar?

Tempting as it may be to give a dismissive or quick answer, the mark of a truly great engineer is the one who can bring shared understanding to technical concepts and challenges. I've found that building highly-functioning and highly-collaborative teams is easier when everyone has a solid understanding of the challenges and technology in place. After all, we're all working towards the same goal.

Example A:

> Well, there's an edge-cache in place that needs to be purged before you can see the change. Which basically means we've taken a snapshot of the page to show the user instead of building it from scratch every time. With the cache, the page is much faster ... It's kind of like showing someone a picture of your latest lego set versus building it in front of them. I can purge the cache, which basically is an instruction to go break the lego set and build it again, but it does have a downside of a performance hit. If we leave it alone, the cache should naturally refresh within 12 hours.

I think that's a much better answer than, _"give it a bit then refresh the page a few times"_.

## Wasn't this post about an interview question?

Yes, yes it was.

If you haven't guessed already, ✨the best interview question ever✨ is to take a technical concept and ask the candidate to explain it to me as if I was a child.

> Pretend I'm 5 years old, can you please explain a cache to me?

Feel free to have fun with it, it's a fun question.

> Can you tell me what a promise in JavaScript is? Before you answer, let's say there's a localized time distortion happening right here over my chair and I am now 7 with the brain and world-view to match.

The question has a number of benefits:

- It usually gets a laugh, which is great for helping your candidate relax a bit
- It allows a candidate to express some creativity. I once had an interview where the candidate invoked Peter Pan to explain the Shadow DOM.
- And most importantly, it allows you to evaluate a candidates ability to communicate technical concepts in a non-technical way.

Give it a try in your next interview!
