'use strict';
let fs = require('fs');
let esprima = require('esprima');
let walk = require('esprima-walk');
let escodegen = require('escodegen');

module.exports = {
  write: function(path) {
    let baseConfigPath = path;

    let css = '/\\.css$/';
    let cssDialects = ['/\\.sass/', '/\\.scss/', '/\\.less/', '/\\.styl/'];

    let postcss = 'var postcss = { postcss: function() { return []; } }';
    postcss = esprima.parse(postcss);
    postcss = postcss.body[0].declarations[0].init.properties[0];

    let data = fs.readFileSync(baseConfigPath, 'utf8');
    let parsed = esprima.parse(data);

    walk.walkAddParent(parsed, function(node) {
      if(node.type === 'AssignmentExpression' && node.left.object.name === 'module') {
        node.right.properties.push(postcss);
      }

      if(node.type === 'Property' && node.key.name === 'test') {
        if(cssDialects.indexOf(node.value.raw) > -1) {
          let current = node.parent.properties[1].value.value;
          current += '!postcss-loader';

          node.parent.properties[1].value.value = current;
        }

        if(node.value.raw === css) {
          let current = 'style-loader!css-loader!postcss-loader';

          node.parent.properties[1].value.value = current;
        }
      }
    });

    let options = { format: { indent: { style: '  ' } } };
    let code = escodegen.generate(parsed, options);
    fs.writeFileSync(baseConfigPath, code, 'utf8');

  }
}
