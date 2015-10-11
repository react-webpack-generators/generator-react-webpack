# generator-react-webpack V2.0 [![Build Status](https://secure.travis-ci.org/newtriks/generator-react-webpack.png?branch=master)](https://travis-ci.org/newtriks/generator-react-webpack)  [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/newtriks/generator-react-webpack/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
> Yeoman generator for [ReactJS](http://facebook.github.io/react/) - lets you quickly set up a project including karma test runner and [Webpack](http://webpack.github.io/) module system.

# About
Generator-React-Webpack will help you build new React projects using modern technologies.

Out of the box it comes with support for:
- Webpack
- ES2015 via Babel-Loader
- Different supported style languages (sass, scss, less, stylus)
- Automatic code linting via esLint
- Ability to unit test components via Karma and Mocha/Chai

## Changes in Version 2.0
The new version of generator-react-webpack does __NOT__ include support for Flux-Frameworks directly. Instead, we will use it as a base for other generators to build upon. This will make the base generator easier to use and update.

If you are interested, feel free to write your own generator and use generator-react-webpack as a base (via composition).

If you have built a generator using generator-react-webpack, tell us and we will add a link to our README.

## Generators that extend generator-react-webpack
- [Generator-React-Webpack-Alt](https://github.com/weblogixx/generator-react-webpack-alt) (Adds ability to create actions, stores and sources for [alt.js](http://alt.js.org))

---

## Installation
```bash
npm install -g yo
npm install generator-react-webpack
```

## Setting up projects
```bash
# Create a new directory, and `cd` into it:
mkdir my-new-project && cd my-new-project

# Run the generator
yo react-webpack
```

Please make sure to edit your newly generated `package.json` file to set description, author information and the like.

## Generating new components
```bash
# After setup of course :)
# cd my-new-project
yo react-webpack:component my/namespaced/components/name
```

The above command will create a new component, as well as its stylesheet and a basic testcase.

## Usage
The following commands are available in your project:
```bash
# Start for development
npm start # or
npm run serve

# Start the dev-server with the dist version
npm run serve:dist

# Just build the dist version and copy static files
npm run dist

# Run unit tests
npm test

# Lint all files in src (also automatically done AFTER tests are run)
npm run lint

# Clean up the dist directory
npm run clean

# Just copy the static assets
npm run copy
```

### Naming Components
We have opted to follow [@floydophone](https://twitter.com/floydophone) convention of uppercase for component file naming e.g. [Component.js](https://github.com/petehunt/ReactHack/tree/master/src/components). I am open to suggestions if there is a general objection to this decision.

### Modules
Each component is a module and can be required using the [Webpack](http://webpack.github.io/) module system. [Webpack](http://webpack.github.io/) uses [Loaders](http://webpack.github.io/docs/loaders.html) which means you can also require CSS and a host of other file types. Read the [Webpack documentation](http://webpack.github.io/docs/home.html) to find out more.

## Props

Thanks to all who contributed to [generator-angular](https://github.com/yeoman/generator-angular) as the majority of code here has been shamelessy sourced from that repo.

Thanks to [Edd Hannay](https://github.com/eddhannay) for his Webpack optimisations, my local merge and testing meant his additions lost his signature (my fault, sorry). So, big thanks Edd.

## Contribute

Contributions are welcomed. When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

### Running Tests
`npm test` or `node node_modules/.bin/mocha`

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
