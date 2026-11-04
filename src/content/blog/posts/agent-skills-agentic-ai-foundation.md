---
title: "Agent Skills is now a vendor-neutral standard"
date: "2026-10-22"
excerpt: "Anthropic has donated Agent Skills to the Agentic AI Foundation, the same home as MCP. The format is simple: a folder, a SKILL.md file, and whatever the agent needs to do the job."
tags: ["AI", "Agents", "Open Source"]
draft: false
---

One of the quieter problems with AI agents is that they are good at general reasoning but weak on the specific procedures a real job requires. Agent Skills is an attempt to fix that with something almost aggressively simple: a folder containing a `SKILL.md` file, plus any scripts or reference material the task needs.

On **22 October 2026**, Anthropic [announced](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation) that it is donating the Agent Skills standard to the **Agentic AI Foundation (AAIF)**, under the Linux Foundation. The AAIF is the same neutral home that already holds the Model Context Protocol (MCP), which Anthropic co-founded with Block and OpenAI.

## How it got here

Anthropic developed skills while working on Claude Code. General knowledge work was handled well, but the model often lacked the procedural knowledge that business tasks depend on.

The format was published as an open standard in **December 2025**. Since then, according to Anthropic:

- More than **70 agent platforms** have integrated Agent Skills, including ChatGPT, Cursor, GitHub Copilot and VS Code.
- Around **1 million skills** have been published.
- Those skills have been installed nearly **280 million times**.

That is a lot of adoption for a format that is essentially a folder with a Markdown file in it.

## What the donation actually transfers

Anthropic is handing over the name, the logo, the GitHub organization and the `agentskills.io` domain. The standard stays usable without joining the AAIF, and contributions remain open.

Engineers from Anthropic, Google, OpenAI and other companies will maintain it as individuals. David Soria Parra and Mahesh Murag are named as lead maintainers.

The proposed roadmap includes:

- versioned releases
- a formal proposal process
- security guidance for people who write and install skills

That last item is the one to watch. A skill can include scripts and reference material, which means installing one is closer to installing a small package than to reading a prompt. Clear guidance on what a skill may execute, and how to review it, will matter as the ecosystem grows.

## Why the format is interesting

Agent Skills is a good example of solving an integration problem with a file convention instead of an API. There is no runtime to adopt and no vendor SDK in the critical path. An agent that understands the convention can load a skill; a person can read it in a text editor and see exactly what it claims to do.

The trade-off is that conventions need stewardship. Moving the standard to a foundation is a signal that the format is not meant to be owned by one model provider — which is probably the condition for the kind of adoption it has already seen.

If you want to look at the specification, it lives at [agentskills.io](https://agentskills.io), and the project is on [GitHub](https://github.com/agentskills/agentskills).

## Sources

- [Anthropic — Donating Agent Skills to the Agentic AI Foundation](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation) (22 October 2026)
- [Agent Skills specification](https://agentskills.io)
