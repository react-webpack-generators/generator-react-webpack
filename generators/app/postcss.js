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
      '\\.cssmodule\\.css$',
      '^.((?!cssmodule).)*\\.css$'
    ];

    const preprocessorDialects = [
      '\\.cssmodule\\.(sass|scss)$',
      '^.((?!cssmodule).)*\\.(sass|scss)$',
      '\\.cssmodule\\.less$',
      '^.((?!cssmodule).)*\\.less$',
      '\\.cssmodule\\.styl$',
      '^.((?!cssmodule).)*\\.styl$'
    ];

    // Prepare postCSS statement for inclusion
    const postcssFunction = 'var postcss = { postcss: function() { return []; } }';
    const postcssAst = esprima.parse(postcssFunction);
    const postcss = postcssAst.body[0].declarations[0].init.properties[0];

    // The postcss loader item to add
    const postcssLoader = { type: 'Literal', value: 'postcss', raw: '\'postcss\'' };

    // Add postcss to the loaders array
    walk.walkAddParent(ast, (node) => {

      // Add the postcss key to the global configuration
      if(
        node.type === 'MethodDefinition' &&
        node.key.name === 'defaultSettings'
      ) {
        const returnStatement = node.value.body.body[0];
        returnStatement.argument.properties.push(postcss);
      }

      // Parse all property nodes that use a regex.
      // This should only be available under module.(pre)loaders
      if(
        node.type === 'Property' &&
        node.key.type === 'Identifier' &&
        node.key.name === 'test' &&
        typeof node.value.regex !== 'undefined'
      ) {

        // Regular css usage
        if(cssDialects.indexOf(node.value.regex.pattern) !== -1) {

          const loaderData = node.parent.properties[1];
          loaderData.value.elements.push(postcssLoader);
        }

        if(preprocessorDialects.indexOf(node.value.regex.pattern) !== -1) {

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
