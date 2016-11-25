'use strict';
const fs = require('fs');
const esprima = require('esprima');
const walk = require('esprima-walk');
const escodegen = require('escodegen');

module.exports = {

  /**
   * Add postcss support to the given webpack base configuration object
   * @param {String} path The config file name
   */
  write: function(path) {

    const data = fs.readFileSync(path, 'utf8');
    const ast = esprima.parse(data);

    // List of css dialects we want to add postCSS for
    // On regular css, we can add the loader to the end
    // of the chain. If we have a preprocessor, we will add
    // it before the initial loader
    const cssDialects = [
      '^.((?!cssmodule).)*\\.css$'
    ];

    const cssModuleDialects = [
      '\\.cssmodule\\.css$'
    ];

    const preprocessorDialects = [
      '^.((?!cssmodule).)*\\.(sass|scss)$',
      '^.((?!cssmodule).)*\\.less$',
      '^.((?!cssmodule).)*\\.styl$'
    ];

    const preprocessorModuleDialects = [
      '\\.cssmodule\\.(sass|scss)$',
      '\\.cssmodule\\.less$',
      '\\.cssmodule\\.styl$'
    ];

    const postcssConfig = 'const postcssQuery = { query: { importLoaders: 1 } };';
    const postcssAst = esprima.parse(postcssConfig);
    const postcss = postcssAst.body[0].declarations[0].init.properties[0];

    // The postcss loader item to add
    const postcssLoaderObject = 'var postcss = [{ loader: \'postcss-loader\' }];';
    const postcssLoaderAst = esprima.parse(postcssLoaderObject);
    const postcssLoader = postcssLoaderAst.body[0].declarations[0].init.elements[0];

    // Add postcss to the loaders array
    walk.walkAddParent(ast, (node) => {

      // Parse all property nodes that use a regex.
      // This should only be available under module.(pre)loaders
      if(
        node.type === 'Property' &&
        node.key.type === 'Identifier' &&
        node.key.name === 'test' &&
        typeof node.value.regex !== 'undefined'
      ) {

        // Enable importLoaders on non cssmodule dialacts
        if(
          cssDialects.indexOf(node.value.regex.pattern) !== -1 ||
          preprocessorDialects.indexOf(node.value.regex.pattern) !== -1
        ) {
          node.parent.properties[1].value.elements[1].properties.push(postcss);
        }

        // Regular css usage
        if(
          cssDialects.indexOf(node.value.regex.pattern) !== -1 ||
          cssModuleDialects.indexOf(node.value.regex.pattern) !== -1
        ) {
          const loaderData = node.parent.properties[1];
          loaderData.value.elements.push(postcssLoader);
        }

        // CSS preprocessors
        if(
          preprocessorDialects.indexOf(node.value.regex.pattern) !== -1 ||
          preprocessorModuleDialects.indexOf(node.value.regex.pattern) !== -1
        ) {
          const loaderData = node.parent.properties[1];
          const lastElm = loaderData.value.elements.pop();
          loaderData.value.elements.push(postcssLoader);
          loaderData.value.elements.push(lastElm);
        }
      }
    });

    // Prepare the final code and write it back
    const finalCode = escodegen.generate(ast, {
      format: {
        indent: {
          adjustMultilineComment: true,
          style: '  '
        }
      },
      comment: true
    });

    fs.writeFileSync(path, finalCode, 'utf8');
  }
}
