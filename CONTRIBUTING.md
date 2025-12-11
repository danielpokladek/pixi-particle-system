# Contributing

Thank you for your interest in contributing!

This project is early in development, so contributions of all kinds — bug reports, ideas, improvements, examples, or code — are very welcome.

This document explains how to set up the project, make changes, and submit a pull request.

## Project Structure
```
pixi-particle-system/
├── src/                # Library source code (TypeScript)
├── docs/               # VitePress documentation site
│   ├── api/            # Generated TypeDoc output
│   └── *.md            # Guides, introduction pages, etc.
├── typedoc.json        # API documentation config
├── package.json
└── pnpm-lock.yaml
```

## Requirements

**Tools:**
- [PNPM](https://pnpm.io/)

**Extensions**
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)*

\* Not mandatory, but I personally use them across the project.

## Getting Started

1. Fork & clone the repository
    ```bash
    git clone git@github.com:<your-username>/pixi-particle-system.git
    cd pixi-particle-system
    ```

2. Install dependencies
    ```bash
    pnpm install
    ```

## Development Workflow
- Run the build in watch mode
    ```bash
    pnpm dev
    ```

    This runs the TypeScript compiler in watch mode and rebuilds the library on file changes.

- Build for production
    ```bash
    pnpm build
    ```

    Outputs compiled and minified JS + type declarations in dist/.

- Generate API documentation
    ```bash
    pnpm docs:build
    ```
    This runs typedoc, which generates the API documentation as well as re-builds the Vitepress site.

- Preview the site locally
    ```bash
    pnpm docs:dev
    ```

## Coding Guidelines
**TypeScript**

- Use strict typing everywhere.
- Prefer named types/interfaces over inline types.
- Avoid any unless absolutely necessary.

**Behaviors**

- If you're adding or modifying a behavior, please include:
  - A brief description of the behavior’s purpose
  - Expected parameters
  - How it interacts with the particle’s lifecycle

**File organization**

- Keep related behaviors grouped logically in folders.
- Keep emitter-related logic separated from rendering or math helpers.

**Formatting**

This project uses:

- Prettier
- ESLint

## Commit Messages

Use clear, descriptive commit messages.

If possible, use a conventional style:

- feat: add new MovementBehavior easing mode
- fix: incorrect handling of particle lifetime
- docs: update configuration examples
- refactor: clean up Emitter update logic
- test: add tests for SpawnBehavior

## Reporting Issues

If you encounter a bug:

- Check if it already exists in Issues
- Include a minimal reproduction case if possible
- Include PixiJS version, OS, and browser/platform
- Include screenshots or videos for visual issues

## Opening a Pull Request

1. On your fork, create a branch:
    ```bash
    git checkout -b feature/my-feature
    ```

2. Make your changes

3. Ensure the project builds successfully:
    ```bash
    pnpm build
    ```

4. Ensure the docs build:
    ```bash
    pnpm docs:build
    ```

5. Push your branch and open a Pull Request against main

**Pull Request Checklist**

- Code compiles
- Documentation updated (if applicable)
- Type definitions updated (if needed)
- No breaking changes without discussion
- Behavior is tested or test plan is described

## Discussions & Questions

If you're unsure about an idea or want feedback before implementing something, feel free to open a discussion thread.

This helps avoid duplicated work and ensures contributions fit the project's direction.

## ❤️ Thank You

Your contributions help make this project better, more stable, and more useful for the community.

Whether it’s code, documentation, or suggestions — thank you!