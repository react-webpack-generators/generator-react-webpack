# generator-react-webpack [![Build Status](https://secure.travis-ci.org/newtriks/generator-react-webpack.png?branch=master)](https://travis-ci.org/newtriks/generator-react-webpack)  [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

> Yeoman generator for [ReactJS](http://facebook.github.io/react/) - lets you quickly set up a project including karma test runner and [Webpack](http://webpack.github.io/) module system.


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

Run `grunt` for building and `grunt serve` for preview in the browser at [localhost](http://localhost:8000).

## Generators

Available generators:

* [react-webpack](#app) (aka [react-webpack:app](#app))
* [react-webpack:component](#component)

**Note: Generators are to be run from the root directory of your app.**

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

Generates a [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) component in `src/scripts/components` and it's corresponding test in `src/spec/components`.

Example:
```bash
yo react-webpack:component foo
```

Produces `src/scripts/components/Foo.jsx` (*javascript - JSX*):
```
/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

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

And `test/spec/components/Foo.js` (*javascript - jasmine*):
```

'use strict';

describe('Foo', function () {
  var Foo, component;

  beforeEach(function () {
    Foo = require('../../../src/scripts/components/Foo');
    component = Foo();
  });

  it('should create a new instance of Foo', function () {
    expect(component).toBeDefined();
  });
});
```

And `src/styles/Foo.css`:
```

.Foo{
  border: 1px dashed #f00;
}
```

## Testing

Running `grunt test` will run the unit tests with karma. Tests are written using [Jasmine](http://pivotal.github.io/jasmine/) by default.

## Further Information

### Project Structure

The react-webpack generator automates the setup of a [ReactJS](http://facebook.github.io/react/) project using the specific structure detailed below:

```
project
  - src
    - scripts
      -components
        ComponentOne.js
        ComponentTwo.js
      main.js
    - styles
      main.css
      reset.css
    index.html
  - test
    - spec
      - components
        ComponentOne.js
        ComponentTwo.js
    - helpers
      - react
        addons.js
      phantomjs-shims.js
  Gruntfile.js
  karma.conf.js
```

I have tried to keep the project structure as simple as possible and understand it may not suit everyone. 

### Naming Components

I have opted to follow [@floydophone](https://twitter.com/floydophone) convention of uppercase for component file naming e.g. [Component.js](https://github.com/petehunt/ReactHack/tree/master/src/components). I am open to suggestions if there is a general objection to this decision.

### Modules

Each component is a module and can be required using the [Webpack](http://webpack.github.io/) module system. [Webpack](http://webpack.github.io/) uses [Loaders](http://webpack.github.io/docs/loaders.html) which means you can also require CSS and a host of other file types. Read the [Webpack documentation](http://webpack.github.io/docs/home.html) to find out more.

### Grunt

Out the box the [Gruntfile](http://gruntjs.com/api/grunt.file) is configured with the following:

1. **webpack**: uses the [grunt-webpack](https://github.com/webpack/grunt-webpack) plugin to load all required modules and output to a single JS file `src/scripts/main.js`. This is included in the `src/index.html` file by default and will reload in the browser as and when it is recompiled. 
2. **webpack-dev-server**: uses the [webpack-dev-server](https://github.com/webpack/webpack-dev-server) to watch for file changes and also serve the webpack app in development.
3. **connect**: uses the [grunt-connect](https://github.com/gruntjs/grunt-contrib-connect) plugin to start a webserver at [localhost](http://localhost:8000).
4. **karma**: uses the [grunt-karma](https://github.com/karma-runner/grunt-karma) plugin to load the Karma configuration file `karma.conf.js` located in the project root. This will run all tests using [PhantomJS](http://phantomjs.org/) by default but supports many other browsers. 

### CSS

Included in the project is [Eric Meyer's reset.css](http://meyerweb.com/eric/tools/css/reset/) script. There is also a `src/styles/main.css` script that's required by the core `src/scripts/components/App.js` component using Webpack.

### JSHint

Please use [JSXHint](https://github.com/STRML/JSXHint) for linting JSX and the corresponding Sublime package if using SLT3 [SublimeLinter-jsxhint](https://github.com/SublimeLinter/SublimeLinter-jsxhint). Note this is a global npm install and JSX files will need to be associated with the JSX file type withing SLT3.

## Props

Thanks to all who contributed to [generator-angular](https://github.com/yeoman/generator-angular) as the majority of code here has been shamelessy sourced from that repos.

Thanks to [Edd Hannay](https://github.com/eddhannay) for his Webpack optimisations, my local merge and testing meant his additions lost his signature (my fault sorry) so big thanks Edd.

## Contribute

Contributions are welcomed. When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
