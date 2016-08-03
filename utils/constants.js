'use strict';

/**
 * List of supported generator versions.
 * @type {number[]}
 */
const SUPPORTED_GEN_VERSIONS = [3, 4];


/**
 * ENUM of supported component types.
 * @type {{STATEFUL: string, STATELESS: string}}
 */
const COMP_TYPES = {
  STATEFUL: 'Stateful',
  STATELESS: 'Stateless'
};


/**
 * ENUM of supported style types.
 * @type {{WITH_STYLES: string, WITH_CSSMODULES: string, NO_STYLES: string}}
 */
const STYLE_TYPES = {
  WITH_STYLES: 'WithStyles',
  WITH_CSSMODULES: 'CssModules',
  NO_STYLES: 'NoStyles'
};


module.exports = {
  SUPPORTED_GEN_VERSIONS,
  COMP_TYPES,
  STYLE_TYPES
};
