'use strict';
let expect = require('chai').expect;

let utils = require('../../utils/config');
let originalSettings = require('../../utils/configopts.json');

describe('Utilities:Config', () => {

  describe('#getSetting', () => {

    it('should return "null" if the key could not be found', () => {
      expect(utils.getSetting('bogus')).to.be.null;
    });

    it('should return a settings object if it exists', () => {

      let result = utils.getSetting('style');
      expect(result).to.be.an.object;
      expect(result).to.deep.equal(originalSettings.style);
    });
  });

  describe('#getChoices', () => {

    it('should return "null" if the key could not be found', () => {
      expect(utils.getChoices('bogus')).to.be.null;
    });

    it('should return an array of choices when queried correctly', () => {

      let result = utils.getChoices('style');
      expect(result).to.be.an.array;
      expect(result).to.deep.equal(originalSettings.style.options);
    });
  });

  describe('#getChoiceByKey', () => {

    it('should return "null" if the key or the setting could not be found', () => {

      expect(utils.getChoiceByKey('bogus', 'unknown')).to.be.null;
      expect(utils.getChoiceByKey('style', 'unknown')).to.be.null;
    });

    it('should return the configured object when it can be found', () => {

      expect(utils.getChoiceByKey('style', 'css')).to.equal(originalSettings.style.options[0]);
      expect(utils.getChoiceByKey('style', 'less')).to.equal(originalSettings.style.options[3]);
    });
  });

  describe('#getDefaultChoice', () => {

    it('should return "null" if the key could not be found', () => {
      expect(utils.getDefaultChoice('bogus')).to.be.null;
    });

    it('should return the default choice when queried correctly', () => {

      let result = utils.getDefaultChoice('style');
      expect(result).to.equal(originalSettings.style.default);
    });
  });

});
