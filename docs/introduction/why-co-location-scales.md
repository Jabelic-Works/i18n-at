# Why Co-location Scales

Co-location is easy to describe as a developer experience feature. The more important point is that it changes the maintenance cost of a real product codebase.

## The core claim

When messages live near the component or route that owns them, teams spend less time synchronizing separate translation structures and more time reviewing the actual user-facing change.

That matters more as a codebase grows.

## What gets better at scale

### Refactors become more local

If a component moves, its messages move with it. You do not need a second migration in a locale directory just to keep the codebase consistent.

### Dead messages are easier to spot

Unused messages are no longer hidden in large locale files. They stay close enough to the component that normal code review can catch them.

### Review distance gets smaller

A reviewer can inspect the component and its messages in one place. That reduces the chance of approving UI changes without noticing copy changes or parameter mismatches.

### IDE navigation becomes part of the workflow

When message references support code jumping, translation review stops being a search problem.

## Where this fits especially well

`i18n-at` is a strong fit when:

- a product team owns both UI and copy decisions
- a Next.js App Router codebase already favors route-local ownership
- refactors happen often
- the team wants compile-time feedback for message usage
- AI-assisted development is part of the workflow and local context matters

## Where it is not the best fit

Co-location is not a universal answer.

It is a weaker fit when:

- translations are managed primarily by a large external localization team
- a TMS-first workflow is mandatory
- messages are shared globally with little component ownership

In those environments, central locale files may still be the better source of truth.

## Why this matters for AI-assisted development

AI-assisted coding works better when the relevant context is nearby.

If messages and components live together:

- prompts need less repository-wide context
- generated changes are easier to review
- accidental drift between UI and copy is less likely

That does not remove the need for review, but it makes good review cheaper.

## A practical rule

Use co-location by default at the component or route boundary. Extract shared message modules only when the sharing is stable and meaningful.

That keeps the default simple while still allowing intentional reuse.
