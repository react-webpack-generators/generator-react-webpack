# generator-react-webpack - Changelog

## 3.0.0
___Upgrades___:

1. Updated react-webpack-template to 1.0.0 to include support for babel 6.

## 2.2.7
___Upgrades___:

1. Updated yeoman to 0.21
2. Added some badges for the readme

## 2.2.6
___Upgrades___:

1. Added new version of ```react-webpack-template``` (provides new features for continuous testing and better dist build support)

## 2.2.5
___Upgrades:___

1. Added ability to create stateless components
2. Updated README with new installation instructions (need to install globally)
3. Added new tests for components (should be easier to handle in the future)

## 2.2.4
___Upgrades:___

1. Added automatic generation of components displayName property. This makes it easier to keep track of components that reside in deep subfolders (like src/components/my/example/components/indexComponent) would become "index" as a displayName, but should instead be MyExampleComponentsIndexComponent instead.

## 2.2.3
___Fixes:___

1. Fixed .gitignore renaming (Patch provided by [VovanR](https://github.com/VovanR))

## 2.2.0:
___Upgrades:___

1. Added new version of react-webpack-template, including support for React 0.14.
