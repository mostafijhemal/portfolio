---
title: "AI training preferences are moving into robots.txt"
date: "2026-10-30"
excerpt: "OpenAI says it will honor a shared signal that lets a website state its AI training preferences once, instead of maintaining a separate rule for every provider."
tags: ["AI", "Open Web", "Standards"]
draft: false
---

If you run a website, you have probably noticed that `robots.txt` is doing more work than it used to. What began as a way to guide search crawlers is now also where site owners try to say whether their content may be used to train generative AI models.

The problem is that this has meant writing a separate rule for each provider's crawler, then keeping up as those crawlers change. On **30 October 2026**, OpenAI [announced](https://openai.com/index/helping-websites-express-ai-training-preferences/) that it will honor a common signal in `robots.txt` for exactly this purpose.

## What changed

The signal is a shared way for a site to communicate one preference to multiple participating AI providers at once. Instead of tracking individual crawlers and maintaining a rule for each one, a site operator can express the same choice in a single place.

The work comes out of the IETF's AI Preferences working group. OpenAI points to the group's [training preference signal draft](https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/) and its [vocabulary draft](https://datatracker.ietf.org/doc/draft-ietf-aipref-vocab/), and says it is joining other participants in backing the shared signal.

A few details matter:

- OpenAI says it aims to **implement the signal in the coming months**, and will publish another update when it does.
- The new signal **does not replace** the crawler controls OpenAI already documents. Existing `robots.txt` rules continue to apply.
- It is **voluntary**. OpenAI encourages other AI providers to honor it, but a shared signal is only useful if providers actually adopt it.

## Why it is worth watching

For a personal site or a small publication, the practical benefit is maintenance. A single, standard preference is easier to reason about than a growing list of vendor-specific user agents, and it is easier to review when something changes.

For the open web more broadly, the interesting question is governance. A preference signal is not a license, and it is not a technical enforcement mechanism. It is a declaration that providers may choose to respect. That makes adoption, transparency and clear documentation the things to judge it by, not the announcement alone.

## What to do now

1. **Do not remove your current rules.** The shared signal is additive for now, and existing crawler controls still matter.
2. **Watch the IETF drafts and OpenAI's implementation note.** The syntax and supported values may still change before rollout.
3. **Document your choice.** Whether you allow AI training or not, write down the decision and the date, so future-you knows why the file looks the way it does.
4. **Re-check after implementation.** A preference that providers do not honor is only a statement of intent.

The announcement is a small piece of plumbing, but it is the kind that decides whether publishing on the open web stays legible to the people who own the content.

## Sources

- [OpenAI — Making it easier for websites to express AI training preferences](https://openai.com/index/helping-websites-express-ai-training-preferences/) (30 October 2026)
- [IETF — AI training preference signal draft](https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/)
- [IETF — AI Preferences vocabulary draft](https://datatracker.ietf.org/doc/draft-ietf-aipref-vocab/)
