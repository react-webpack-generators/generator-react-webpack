import baseConfig from './base';

const config = {
  appEnv: '<%= envName %>',
};

export default Object.freeze(Object.assign({}, baseConfig, config));
