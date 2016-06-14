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
    const cssDialects = [
      '/\\.css$/',
      '/\\.sass$/',
      '/\\.scss$/',
      '/\\.less$/',
      '/\\.styl$/'
    ];

    // Prepare postCSS statement for inclusion
    const postcssFunction = 'var postcss = { postcss: function() { return []; } }';
    const postcssAst = esprima.parse(postcssFunction);
    const postcss = postcssAst.body[0].declarations[0].init.properties[0];

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

        // Make sure we only parse style based items!
        if(cssDialects.indexOf(node.value.raw) !== -1) {

          const loaderData = node.parent.properties[1];
          loaderData.value.elements[1].value += '!postcss';
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
