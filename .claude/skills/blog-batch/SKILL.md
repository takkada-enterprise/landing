---
name: blog-batch
description: Write 10 AEO+SEO optimised blog articles for Takkada, generate brand-color header images, and push to main. Use when the user says "write 10 blogs", "blog batch", "ship a blog batch", "run blog-batch", or asks for another round of competitive content targeting Biz Analyst, Khatabook, CredFlow, Vyapar, or Tally Prime gaps.
---

# blog-batch

Skill mirror of the `/blog-batch` slash command (defined at `.claude/commands/blog-batch.md`). When invoked via the Skill tool, read and follow that file exactly. It is the source of truth for:

- The 9-step production pipeline (lock topics → confirm 0% MDR → tasks → write 10 → images → lint → build → commit → push)
- Article frontmatter and structure
- Brand voice rules (`CLAUDE.md` §5 / §11)
- Keyword and AEO optimisation rules
- The banned tokens lint regex
- Commit and push convention

This SKILL.md exists only as a discovery hook so the user can invoke either `/blog-batch` directly or have Claude route here from a natural-language prompt like "ship another blog batch."

Always read `.claude/commands/blog-batch.md` before starting the run, then follow it step-by-step. Do not paraphrase or summarize the instructions in that file; execute them.
