# Contributing to Ascension Codex

Thank you for your interest in contributing. This project is a spiritual development platform built with care for the lightworker community — your contributions help advance that mission.

## Before You Start

- **Open an issue first** for new features or significant changes. This avoids duplicate work and ensures alignment with the project's direction.
- Read [`PRODUCT.md`](PRODUCT.md) and [`DESIGN.md`](DESIGN.md) to understand the product truth and design system before proposing changes.

## Development Setup

```bash
git clone https://github.com/sellomakgatho121/Ascension-Codex-app.git
cd Ascension-Codex-app
npm install
cp .env.example .env   # fill in any keys you need
npm run dev
```

## Contribution Workflow

1. **Fork** the repository and create your branch:
   ```bash
   git checkout -b feat/your-feature
   ```
2. **Make focused commits** — one logical change per commit.
3. **Follow Conventional Commits** for messages:
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation only
   - `refactor:` code change that neither fixes a bug nor adds a feature
   - `chore:` build/tooling changes
4. **Run checks before pushing**:
   ```bash
   npm run check    # TypeScript type-check must pass
   npm run build    # Production build must succeed
   ```
5. **Open a pull request** against `main` with a clear description of what changed and why.

## Code Standards

- **TypeScript** is used end-to-end. Avoid `any` where possible; prefer branded types for domain safety.
- **No new dependencies** without justification. If a feature can be built with existing tooling, do that.
- **CSS-only animations** — do not add framer-motion or animation libraries. The design system uses GPU-composited `@keyframes`.
- **Accessibility** — every interactive element must be keyboard-navigable with visible focus. Color is never the sole differentiator.
- **Touch targets** — ≥44px on mobile (Capacitor target).

## Design Conventions

The platform has two visual worlds (documented in [DESIGN.md](DESIGN.md)):

- **Anti-design** (void black, acid green, Bebas Neue) — hero and tool pages.
- **Cosmic glassmorphism** (deep indigo, sacred gold, Cinzel) — practice and content zones.

When adding UI, choose the appropriate world for the context. Do not mix palettes arbitrarily.

## Commit Message Format

```
<type>(<scope>): <subject>

<body — optional, explain why>
```

Example:
```
feat(home): add VERS AI quick-prompt dock

Quick prompts let returning users jump straight into a guided conversation
without typing. Localizes the VERS context to the home page.
```

## Reporting Issues

When filing a bug report, include:
- Steps to reproduce
- Expected vs. actual behavior
- Browser/device + OS version
- Screenshots if visual

## Security

If you discover a security vulnerability, **do not open a public issue**. Email the maintainer directly or use GitHub's private vulnerability reporting.

## Code of Conduct

Be respectful. This is a community space for spiritual development — disagreements should be handled with the same sovereignty and discernment the platform teaches. Harassment, discrimination, or unconstructive behavior will not be tolerated.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
