# generator-react-webpack - Changelog

## 3.2.3

1. Adjusted postcss to work with react-webpack-template 1.4 upwards
2. Improved styling output (provided by [thewtex](https://github.com/thewtex))

## 3.2.2

1. Cleaned up formatting of unit tests

## 3.2.1

1. Updated tests for new version of react-webpack-template

## 3.2.0

1. Updated yeoman-generator package to new version 0.22.1 (some methods like generator.NamedBase are now deprecated!)

## 3.1.1

1. Added bugfix for https://github.com/newtriks/generator-react-webpack/issues/170

## 3.1.0

1. Added support for postcss (Patch provided by [stylesuxx](https://github.com/stylesuxx))

## 3.0.1

1. Unneeded files (License, .npmignore) are not copied anymore
2. Existence of .babelrc is now checked in unit tests

## 3.0.0

1. Updated react-webpack-template to 1.0.0 to include support for babel 6.

## 2.2.7

1. Updated yeoman to 0.21
2. Added some badges for the readme

## 2.2.6

1. Added new version of ```react-webpack-template``` (provides new features for continuous testing and better dist build support)

## 2.2.5

1. Added ability to create stateless components
2. Updated README with new installation instructions (need to install globally)
3. Added new tests for components (should be easier to handle in the future)

## 2.2.4

1. Added automatic generation of components displayName property. This makes it easier to keep track of components that reside in deep subfolders (like src/components/my/example/components/indexComponent) would become "index" as a displayName, but should instead be MyExampleComponentsIndexComponent instead.

## 2.2.3

1. Fixed .gitignore renaming (Patch provided by [VovanR](https://github.com/VovanR))

## 2.2.0:

1. Added new version of react-webpack-template, including support for React 0.14.
