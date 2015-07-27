/**
 * Unit test for utility functions
 *
 * @todo: Add tests for all utility methods here!
 */
var utils = require('../util');
var assert = require('yeoman-generator').assert;

describe('Utilities', function() {

  describe('When using #getLayoutFilePath', function() {

    it('should return false on unknown style language types or invalid values', function() {

      // Method should return false if no arguments are given
      var noArgumentsGiven = utils.getLayoutFilePath();
      assert.ok(!noArgumentsGiven);

      // Should return false when an unknown layout type is given
      var invalidTypeGiven = utils.getLayoutFilePath('className', 'unknownType');
      assert.ok(!invalidTypeGiven);
    });

    it('should return valid paths on all supported style languages', function() {

      var allowedLanguages = ['css', 'sass', 'scss', 'less', 'stylus'];
      allowedLanguages.forEach(function(lang) {
        assert.ok(utils.getLayoutFilePath('validFile', lang));
      });
    });
  });

});
