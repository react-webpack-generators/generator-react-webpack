'use strict';
var path = require('path');
var fs = require('fs');
var _ = require('underscore.string');

module.exports = {
  rewrite: rewrite,
  rewriteFile: rewriteFile,
  appName: appName,
  capitalize: capitalize,
  capitalizeClass: capitalizeClass,
  capitalizeFile: capitalizeFile,
  getLayoutFilePath: getLayoutFilePath
};

function rewriteFile (args) {
  args.path = args.path || process.cwd();
  var fullPath = path.join(args.path, args.file);

  args.haystack = fs.readFileSync(fullPath, 'utf8');
  var body = rewrite(args);

  fs.writeFileSync(fullPath, body);
}

function escapeRegExp (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function rewrite (args) {
  // check if splicable is already in the body text
  var re = new RegExp(args.splicable.map(function (line) {
    return '\s*' + escapeRegExp(line);
  }).join('\n'));

  if (re.test(args.haystack)) {
    return args.haystack;
  }

  var lines = args.haystack.split('\n');

  var otherwiseLineIndex = 0;
  lines.forEach(function (line, i) {
    if (line.indexOf(args.needle) !== -1) {
      otherwiseLineIndex = i;
    }
  });

  var spaces = 0;
  while (lines[otherwiseLineIndex].charAt(spaces) === ' ') {
    spaces += 1;
  }

  var spaceStr = '';
  while ((spaces -= 1) >= 0) {
    spaceStr += ' ';
  }

  lines.splice(otherwiseLineIndex, 0, args.splicable.map(function (line) {
    return spaceStr + line;
  }).join('\n'));

  return lines.join('\n');
}

function capitalize(str) {
  str = String(str);
  return str[0].toUpperCase() + str.substr(1, str.length);
}

function capitalizeClass(string) {
  var words =  string.split('/');
  words.push(capitalize(words.pop()));
  return words.pop();
}

function capitalizeFile(string) {
  var words =  string.split('/');
  words.push(capitalize(words.pop()));
  return words.join('/');
}

function appName(self) {
  var counter = 0, suffix = self.options['app-suffix'];
  // Have to check this because of generator bug #386
  process.argv.forEach(function (val) {
    if (val.indexOf('--app-suffix') > -1) {
      counter++;
    }
  });
  if (counter === 0 || (typeof suffix === 'boolean' && suffix)) {
    suffix = 'App';
  }
  return suffix ? _.classify(suffix) : '';
}

/**
 * Get the complete layout file path for the given layout language type
 * @param {String} filename Filename to use
 * @param {String} type Layout language type
 * @return {String|Boolean} The layout language path or false if it cannot be found
 */
function getLayoutFilePath(filename, type) {

  if(!filename || !type) {
    return false;
  }

  var path;
  switch(type) {
    case 'css':
    case 'sass':
    case 'scss':
    case 'less':
      path = type;
      break;
    case 'stylus':
      path = 'styl';
      break;
    default:
      path = false;
  }

  // Add the styles prefix and file type suffix
  // to the filename if we have a valid one.
  if(path) {
    path = 'styles/' + filename + '.' + path;
  }

  return path;
}
