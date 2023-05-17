## 1.1.1 (2023-05-17)

### Bug fixes

Make the return type of \`builders\` include properties for schema node/mark names.

Include CommonJS type declarations in the package to please new TypeScript resolution settings.

## 1.1.0 (2022-05-30)

### New features

Include TypeScript type declarations.

## 1.0.6 (2022-03-29)

### Bug fixes

Make it possible to specify multiple marks of the same type for a given piece of content.

## 1.0.5 (2021-10-14)

### Bug fixes

Go back to regular dependencies, so that the package works on NPM <7.

## 1.0.4 (2021-04-27)

### Bug fixes

Treat ProseMirror libraries as peer dependencies, to avoid duplicate libraries when using this.

## 1.0.3 (2020-01-28)

### Bug fixes

Rename ES module files to use a .js extension, since Webpack gets confused by .mjs

## 1.0.2 (2019-11-19)

### Bug fixes

The file referred to in the package's `module` field now is compiled down to ES5.

## 1.0.1 (2018-01-05)

### Bug fixes

Fix overly restrictive depencency version ranges.

## 1.0.0 (2017-10-13)

First stable release.
