'use strict';

/**
 * Default dev server configuration.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');

class WebpackDevConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      // Update your env-specific configuration here!
      // To start, look at ./Dev.js or ./Dist.js for two example configurations
      // targeted at production or development builds.
    };
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return '<%= envName %>';
  }
}

module.exports = WebpackDevConfig;
