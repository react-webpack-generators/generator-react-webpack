# generator-react-webpack - Changelog

## 2.2.4
___Upgrades:___

1. Added automatic generation of components displayName property. This makes it easier to keep track of components that reside in deep subfolders (like src/components/my/example/components/indexComponent) would become "index" as a displayName, but should instead be MyExampleComponentsIndexComponent instead.

## 2.2.3
___Fixes:___

1. Fixed .gitignore renaming (Patch provided by [VovanR](https://github.com/VovanR))

## 2.2.0:
___Upgrades:___

1. Added new version of react-webpack-template, including support for React 0.14.
