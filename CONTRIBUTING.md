# Hello There!

First off, thank you for considering contributing to the project. It's people like you who make open-source projects great tools that can be enjoyed by everyone!

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

There are many ways to contribute to the project, from improving the documentation, submitting bug reports and feature requests or writing code which can be incorporated into the library.

Please note, currently it is only myself (Daniel Pokladek) working on the project, so I will get back to you as soon as the time allows, thank you for understanding!

## Ground Rules

Responsibilities
- Ensure that code that goes into the library follows the ESLint and Prettier rules.
- Create issues for any major changes or enhancements you wish to make, and discuss things transparently, and get community feedback.
- Keep pull requests as small as possible, preferably one feature per PR, to make it easier to review the changes.
- Be welcoming to newcomers and encourage diverse new contributions from all backgrounds.

## Your First Contribution

Unsure where to begin? You can start by looking through the issues tags:
- `good first issue`: these should only require a few lines of code, and a test or two. 
- `help wanted`: these are a little more involved than beginner issues.
- `documentation`: these are less about coding, and more about code documentation - still a very important aspect of software development, so any help here is appreciated.

Working on your first PR? You can learn how from this *free* series, [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).If you are unsure where to start, feel free to reach out to @danielpokladek via GitHub.

At this point, you're ready to make your changes! Everyone started somewhere, if you have any questions don't be afraid to ask for help.

## Project Structure

This project follows a very specific structure, this allows the interactive editor and library to live alongside each other. It is highly recommended you get familiar with the structure of the project before making any changes.

### Project Root

```
pixi-particle-system/
├── .github                 # GitHub workflows and templates.
├── .husky                  # Husky config used to lint commit messages.
├── .vscode                 # Visual Studio Code (VSCode) specific settings.
├── editor/                 # Source code for the interactive editor (React).
├── library/                # Source code for particle system library (TypeScript).
├── .gitignore              # List of files that are ignored by Git.
├── .prettierignore         # List of files Prettier formatter will ignore.
├── .prettierrc             # Shared Prettier formatter configuration.
├── commitlint.config.js    # Commitlint configuration.
├── CONTRIBUTING.md         # < You are here.
├── eslint.config.js        # Shared ESLint configuration.
├── LICENSE                 # Project license file.
├── package.json            # Root `package.json` with shared dependencies.
├── pnpm-lock.yaml
├── README.md               # Project readme file.
├── release.config.js       # Semantic release configuration.
└── tsconfig.json           # Shared TypeScript configuration.
```
The root of the project contains shared dependencies that are used by the library and the emitter, this makes it easier to manage and update versions of packages from a single place.

Additionally, `package.json` in the root folder provides "shortcut" commands to make it easier to navigate and run the package; for example, running `pnpm dev:editor` from root, will automatically navigate to `editor` folder and start the Vite dev server.

### Editor

```
editor/
├── src/                # Source files for the editor written in React (TSX).
├── eslint.config.js    # Editor specific ESLint overrides.
├── index.html          # Main HTML page for the interactive editor.
├── package.json        # Editor specific dependencies.
├── pnpm-lock.yaml
├── pnpm-workspace.yaml # Local link to the particle library.
├── tsconfig.json       # Editor specific TypeScript overrides.
└── vite.config.js      # Vite configuration for the editor.
```

The interactive editor uses React (with TypeScript) for user interface, and PicoCSS to provide minimalist and lightweight components. Additionally, custom wrappers/components are used, that are specific to the editor, which provide shared functionality - those can be found in `/editor/src/components/`.

### Library

```
library/
├── docs/               # Folder containing documentation configuration (Vitepress).
├── src/                # Source files for the library written in TypeScript(TS).
├── tests/              # Source files for the tests written in TS and Vitest.
├── eslint.config.js    # Library specific ESLint overrides.
├── package.json        # Library specific dependencies and NPM package details.
├── pnpm-lock.yaml
├── tsconfig.json       # Library specific TypeScript configuration.
├── typedoc.json        # Typedoc configuration file used for documentation.
└── vite.config.js      # Vite configuration for the library.
```

Library is written natively in TypeScript, uses ESLint for linting, and Prettier for formatting. Vitepress, in combination with Typedoc, are used to generate the documentation which is then published to GitHub pages.

## Getting Started

### Prerequisites

Before you start, there are a few things you need to properly run the library. You will need a compatible IDE (code editor), this repository is configured with VSCode in mind, but other IDEs should work as long as they have relevant extensions ported.

**Tools:**
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [PNPM](https://pnpm.io/)

You will also need a source control tool, in order to clone the repository and push them after making your changes - personally I use the source control built into VSCode, in combination with the terminal, but if this is your first experience you might want to use something like [GitHub Desktop](https://github.com/apps/desktop).

**VSCode Extensions**
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits)
- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)*

\* Not mandatory, but I personally use them across the project.

### Making Changes

1. Fork the repository
   - GitHub has good guide on how to do this: [Fork a repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).
  
2. Clone newly forked repository
    ```bash
    git clone git@github.com:<your-username>/pixi-particle-system.git
    cd pixi-particle-system
    ```

3. Install dependencies
    ```bash
    pnpm installDep
    ```

You are now ready to start working on your contribution. You can run each part of the particle system from the root of the project, below you can find a list of commands and what they do.

Any commands that start with `action:` or `release:` are reserved for GitHub actions, to help with workflow automation.

| Command       | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| installDep    | Installs dependencies for all sub-packages.                  |
| dev:library   | Starts a Vite server with watch mode for the library.        |
| dev:docs      | Starts a Vitepress server with watch mode for documentation. |
| dev:editor    | Starts a Vite server with watch mode for the web editor.     |
| build:library | Builds the library in production mode.                       |
| build:editor  | Builds the editor in production mode.                        |
| build:docs    | Builds the docs in editor mode.                              |
| test          | Runs the Vitest test suite.                                  |

### Development Workflow

When working on changes it is important to follow the correct workflow, to make sure that no regression has been introduced; this workflow is still being finalized, so it might change from the time of writing the guide.

**Library**

Working on the particle system library is just like working on any other TypeScript library, first you want to start the TypeScript compiler in watch mode; this will automatically re-build the package whenever you make any changes.

If you locally link the package to a project, and the project is also running in watch mode, the project should automatically re-build itself whenever you make changes to the particle system (this is how the editor works). 

```bash
pnpm dev:library
```

Once you are happy with the changes you have made, you can now stop the TypeScript compiler. Before making a pull request, it's important to check that no other part of the library has had a regression introduced.

Let's first run the production build to make sure we don't get any errors:

```bash
pnpm build:library
```

Once we're happy that there are no build errors, we can run the Vitest test suite to make sure they are all passing:

```bash
pnpm test
```

If all tests are passing, well done! If not, don't worry - chances are that the changes you made have introduced a regression, or they changed the original functionality; if it's the former we need to fix the regression, and if it's the latter we need to change the tests to account for the updated functionality.

Now that we are happy that our changes are working, there are no build errors and the tests are passing, we can generate the documentation to check everything is working as expected.

```bash
pnpm build:docs
```

With that said, if your changes only affected the code within methods and not the parameters, you should be good - a good rule of thumb, is to update documentation for methods as you are working on it, otherwise you might end up forgetting about it!

**Editor**

Working on the editor is just as straight forward as working on the library itself. Editor uses React (TSX) as the framework for user interface, and additionally PicoCSS framework is used on top to provide ready to use CSS components.

Library is locally linked to the editor, so any changes you make to the library will be reflected instantly in the editor. You can start a dev server with watch mode by running the following command:

```bash
pnpm dev:editor
```

Once you are happy with the changes you have made, you can now stop the dev server. Just like with the library, we want to run the production build to make sure we're not getting any build errors:

```bash
pnpm build:editor
```

Once we're happy the build is successful, that's it! There are no tests to be ran for the editor, and there is no automated documentation - with that said, it's still a good idea to document the functions as you're working on them.

## Standards

### Code Guidelines

In general, ESLint and Prettier will make sure that the linting and formatting rules are enforced so it is important that you are running them in your IDE. But in general, you should make sure that:

- You use strict typing where it's applicable.
- You use named types/interfaces over inline types.
- You avoid `any`, and use `unknown` where absolutely necessary.
- You keep related files grouped logically in folders.
- You keep emitter-related logic separated from rendering or math helpers.

When working on behaviors, please include:

- A brief description of the behavior purpose (if adding new one).
- A description of the config, and the expected parameters.
- A description on how it interacts with the particle lifecycle.
- A brief description on steps taken to ensure performance optimizations.

### Commit Guidelines

The project is using `semantic-release` package to automate the release workflow for the library, and additionally `commitlint` is used to enforce the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.

It is important when working on changes, your commits cover the full scope of change as this is how they will appear in the release logs, for example:

```
# Commit
feat(library): added scale behavior to built-in behaviors

# Release Log
Features:
- library: added scale behavior to built-in behaviors(commit_sha)
```

Any breaking changes should be marked with either `!` next to the change type, or `BREAKING CHANGE: ` in the footer of the body - it is important to mark breaking changes as so, as this will force the next release to have the major version bumped.

## Reporting Bugs

When filing an issue, make sure you have:

- Checked if it already exists in the [Issues](https://github.com/danielpokladek/pixi-particle-system/issues) tab.
- Included what you saw versus what you expected to see.
- Included reproduction steps (if possible).
- Included the version of PixiJS you are using.
- Included which operating system and browser you are using.
- Included any screenshots or videos showcasing the issue.

## Code Review

I keep an eye on the Pull Request/Issues on a regular basis, but it is only myself working on the system so I will try to get back to you as soon as possible! With that said, you are more than welcome to engage with other users, and suggest your own feedback.

## Community

Please visit the [Discussions](https://github.com/danielpokladek/pixi-particle-system/discussions) tab if you have an idea for future version, you'd like to have some feedback prior to working on a change, or you have a general question.

## Thank You

Your contributions help make this project better, more stable, and more useful for the community.

Whether it’s code, documentation, or suggestions — thank you! ❤️ 