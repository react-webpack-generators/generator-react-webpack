# generator-react-webpack [![Build Status](https://secure.travis-ci.org/newtriks/generator-react-webpack.png?branch=master)](https://travis-ci.org/newtriks/generator-react-webpack)  [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/newtriks/generator-react-webpack/trend.png)](https://bitdeli.com/free "Bitdeli Badge")


> Yeoman generator for [ReactJS](http://facebook.github.io/react/) - lets you quickly set up a project including karma test runner and [Webpack](http://webpack.github.io/) module system.

## Warning! About this branch, the current state and refactoring
The generator itself is currently in a phase of refactoring. The following steps are currently planned and will get developed against the *v1 branch*.

The current release will stay unaltered by the current refactoring.
If you want to help out, please see https://github.com/newtriks/generator-react-webpack/issues/130 and https://github.com/newtriks/generator-react-webpack/issues/129.

- [x] Strip back the generator to the original bare bones of functionality.
- [x] Update all packages both in templates and generator.
- [ ] Fix existing issues related to core generated project.
- [ ] Optimise for ES2015, etc.
- [ ] Create a new release and merge back into master.
- [ ] Focus on composing with other generators.

## Usage

Install `generator-react-webpack`:
```
npm install -g generator-react-webpack
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo react-webpack`, optionally passing an app name:
```
yo react-webpack [app-name]
```

Run `grunt build` for building and `grunt serve` for preview in the browser at [localhost](http://localhost:8000).

## Generators

Available generators:

* [react-webpack](#app) (aka [react-webpack:app](#app))
* [react-webpack:component](#component)

### App

Sets up a new ReactJS app, generating all the boilerplate you need to get started. The app generator also facilitates the following:

1. Configures a Gruntfile to run the app on a local server.
2. Configures Webpack to modularise the app enabling [loading of various file formats](http://webpack.github.io/docs/loader-list.html) e.g. JSON, CSS, PNG, etc.
3. Configures [Karma](http://karma-runner.github.io) to run all tests.
4. Watches for changes and recompiles JS and refreshes the browser.

Example:
```bash
yo react-webpack
```

### Component

Generates a [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) component in `src/components`, its corresponding test in `test/spec/components` and its style in `src/styles`.

Example:
```bash
yo react-webpack:component foo  //or just: yo react-webpack:c foo
```

Produces `src/components/Foo.js` (*javascript - JSX*):
```js
'use strict';

var React = require('react/addons');

require('styles/componentName.css'); //or .sass,.less etc...

var Foo = React.createClass({
  render: function () {
    return (
        <div>
          <p>Content for Foo</p>
        </div>
      )
  }
});

module.exports = Foo;
```

And `test/spec/components/Foo.js` (*javascript - jasmine, as seen on http://simonsmith.io/unit-testing-react-components-without-a-dom/*):
```js
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import Foo from 'components/Foo.js';

describe('Foo', () => {

    let FooComponent;

    beforeEach(() => {
        FooComponent = createComponent(Foo);
    });

    it('should have its component name as default className', () => {
        expect(FooComponent._store.props.className).toBe('Foo');
    });
});
```

And `src/styles/Foo.css` (or .sass, .less etc...) :
```css
.Foo {
  border: 1px dashed #f00;
}
```

### rich flag

For all you lazy programmers out there, we've added another shortcut - `rich` flag:
```bash
yo react-webpack:c foofoo --rich
```
This will give you all of react component's most common stuff :
 ```js
 var React = require('react/addons');

 require('styles/Foofoo.sass');

 var Foofoo = React.createClass({
   mixins: [],
   getInitialState: function() {
     return {};
   },
   getDefaultProps: function() {},
   componentWillMount: function() {},
   componentDidMount: function() {},
   shouldComponentUpdate: function() {},
   componentDidUpdate: function() {},
   componentWillUnmount: function() {},

   render: function () {
     return (
         <div>
           <p>Content for Foofoo</p>
         </div>
       );
   }
 });

 module.exports = Foofoo;
 ```

Just remove those you don't need, then fill and space out the rest.

## Options
Options are available as additional installs to the initial application generation phase.

### [ReactRouter](https://github.com/rackt/react-router)

A complete routing library for React. This option only adds the basic hooks to get started with [react router](https://github.com/rackt/react-router).

### styles language

css, sass, scss, less or stylus

Sets the style file's template and extension

### component suffix

js or jsx

Sets the file suffix for generated components. Defaults to "js". Please note that you need to require files *including* the file ending when using jsx as suffix. Example:

```js
var MyJSComponent = require('./MyJSComponent');
var MyJSX = require('./MyJSX.jsx');
```

### es6

If you are using `es6`, and want to use its export functionality (and not webpack's), just add `--es6` flag when you create a component, action or store.


## Testing

Running `grunt test` will run the unit tests with karma. Tests are written using [Jasmine](http://jasmine.github.io/) by default.

## Further Information

### Project Structure

The react-webpack generator automates the setup of a [ReactJS](http://facebook.github.io/react/) project using the specific structure detailed below:

```
project
  - src
    -components
      MainApp.js
      Foo.js
      AnotherComponent.js
    - styles
      main.css
    index.html
  - test
    - spec
      - components
         MainApp.js
         Foo.js
         AnotherComponent.js
    - helpers
      - react
        addons.js
      phantomjs-shims.js
  Gruntfile.js
  karma.conf.js
  package.json
  webpack.config.js
  webpack.dist.config.js
```

I have tried to keep the project structure as simple as possible and understand it may not suit everyone.

### Naming Components

I have opted to follow [@floydophone](https://twitter.com/floydophone) convention of uppercase for component file naming e.g. [Component.js](https://github.com/petehunt/ReactHack/tree/master/src/components). I am open to suggestions if there is a general objection to this decision.

### Modules

Each component is a module and can be required using the [Webpack](http://webpack.github.io/) module system. [Webpack](http://webpack.github.io/) uses [Loaders](http://webpack.github.io/docs/loaders.html) which means you can also require CSS and a host of other file types. Read the [Webpack documentation](http://webpack.github.io/docs/home.html) to find out more.

### Grunt

Out the box the [Gruntfile](http://gruntjs.com/api/grunt.file) is configured with the following:

1. **webpack**: uses the [grunt-webpack](https://github.com/webpack/grunt-webpack) plugin to load all required modules and output to a single JS file `src/main.js`. This is included in the `src/index.html` file by default and will reload in the browser as and when it is recompiled.
2. **webpack-dev-server**: uses the [webpack-dev-server](https://github.com/webpack/webpack-dev-server) to watch for file changes and also serve the webpack app in development.
3. **connect**: uses the [grunt-connect](https://github.com/gruntjs/grunt-contrib-connect) plugin to start a webserver at [localhost](http://localhost:8000).
4. **karma**: uses the [grunt-karma](https://github.com/karma-runner/grunt-karma) plugin to load the Karma configuration file `karma.conf.js` located in the project root. This will run all tests using [PhantomJS](http://phantomjs.org/) by default but supports many other browsers. Please note that karma-launchers other than PhantomJS must be installed separately and configured in `karma.conf.js`.

### CSS

Included in the project is the [normalize.css](http://necolas.github.io/normalize.css/) script. There is also a `src/styles/main.css` script that's required by the core `src/components/App.js` component using Webpack.

### Linting

Webpack is automatically configured to run esLint (http://eslint.org) on every file change or build. The configuration can be found in `PROJECTROOT/.eslintrc`. There are plugins for different editors that use this tool directly:
- linter-eslint for Atom
- Sublime-Linter-eslint for Sublime

## Props

Thanks to all who contributed to [generator-angular](https://github.com/yeoman/generator-angular) as the majority of code here has been shamelessy sourced from that repos.

Thanks to [Edd Hannay](https://github.com/eddhannay) for his Webpack optimisations, my local merge and testing meant his additions lost his signature (my fault sorry) so big thanks Edd.

## Contribute

Contributions are welcomed. When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

### Running Tests

`node node_modules/.bin/mocha`

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
