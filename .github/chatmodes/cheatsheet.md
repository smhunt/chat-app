# Code Review & Refactoring Cheat Sheet

This cheat sheet is an at-a-glance guide for performing high-quality merge request / pull request reviews and explaining your reasoning when mentoring others.

## 1. General Review Flow

1. Understand the intent: what feature, bug, or refactor is this for? What are the acceptance criteria?
2. Run the code: validate expected vs. actual; check edge cases and warnings.
3. Read top-down: scan structure before details — look for readability and modularization.
4. Drill into logic: correctness, duplication, nested conditionals.
5. Evaluate design: SOLID-like checks and appropriate abstractions.
6. Evaluate non-functional aspects: performance, security, accessibility, UX.
7. Refactor in small steps: one concept per commit, add/update tests.

## 2. Refactoring Categories

- Naming: ambiguous or inconsistent names → use descriptive, domain-based names (e.g., `getUserProfile`).
- Duplication: repeated logic → extract functions or constants.
- Long functions/components: split into smaller pure functions or child components.
- Deep nesting: use early returns and guard clauses.
- Inconsistent abstractions: separate concerns (move API calls out of UI).
- Data flow confusion: simplify using derived state or custom hooks.
- Performance smells: re-renders, loops in render, redundant fetches → memoize/cache.
- Testing gaps: add tests before refactor.
- Comment overload: prefer expressive code; comment intent, not implementation.

## 3. Code Smell Quick List

- ❌ Long function (Severity: ⚠️) — Violates SRP, hard to test.
- ❌ God object/component (⚠️) — Too many responsibilities.
- ❌ Tight coupling (⚠️) — Breaks easily, hard to reuse.
- ❌ Primitive obsession (⚠️) — Use domain types instead of primitives.
- ❌ Feature envy (⚠️) — Methods depending too much on other classes' internals.
- ✅ Small pure functions (👍) — Easy to reason and test.
- ✅ Cohesive modules (👍) — Clear ownership of responsibility.

## 4. Refactoring Techniques (by impact)

- Extract Function / Component: when logic repeats.
- Rename Variable / Function: when names don't reveal intent.
- Inline Function: when an abstraction adds indirection and is used once.
- Introduce Constant / Enum: replace magic numbers/strings.
- Decompose Conditional: replace nested ifs with lookup or polymorphism.
- Move Function: relocate logic to where data belongs.
- Encapsulate Field / Data: avoid direct mutation; use getters/setters.
- Simplify Expression: extract complex ternaries into named helpers.
- Replace Comment with Function Name: prefer expressive names.

## 5. Design Principle Review (SOLID-lite)

- Single Responsibility: "Can I summarize what this does in one sentence?"
- Open/Closed: can behavior be extended without editing existing code?
- Liskov: do subclasses behave like their parents?
- Interface Segregation: are consumers forced to depend on unused methods?
- Dependency Inversion: do we depend on abstractions rather than concretions?

## 6. Security / Performance / Reliability Spot-Check

- Input Handling: trust boundaries and sanitize inputs.
- Secrets / Keys: no hard-coded values — use env vars.
- Async Calls: ensure `await` and error handling (try/catch) are used.
- Loops / Filters / Maps: avoid inefficient chaining causing O(N^2) patterns.
- Rendering: avoid unnecessary re-renders (use memoization hooks).
- Database/API: check for N+1 queries and missing indexes.
- Error Handling: avoid silent failures; log and surface errors appropriately.

## 7. PR Checklist (Pre-merge)

- [ ] Code compiles and runs locally
- [ ] All tests pass (unit + integration)
- [ ] No TODOs or commented-out code
- [ ] Linting / formatting applied
- [ ] No console logs or debugging traces
- [ ] Code consistent with project conventions
- [ ] Error states handled gracefully
- [ ] Functionality matches ticket / spec
- [ ] Dependencies reviewed
- [ ] Docs / comments updated if needed
- [ ] Tests added or updated
- [ ] Performance sanity check
- [ ] Security review

## 8. Rules of Thumb When Refactoring

- Don’t change behavior: ensure tests pass before & after.
- One smell → one refactor.
- Add tests before refactor if missing.
- Commit often, small steps.
- Document intent, not implementation.

---

If you want, I can also generate a printable PDF, a Notion-friendly Markdown version, or a VS Code snippet JSON for quick insertion during PR reviews. Tell me which one to produce next.
