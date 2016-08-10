'use strict';
const Generators = require('yeoman-generator');
const utils = require('../../utils/all');
const C = utils.constants;
const getAllSettingsFromComponentName = utils.yeoman.getAllSettingsFromComponentName;


class ComponentGenerator extends Generators.Base {

  constructor(args, options) {
    super(args, options);

    /**
     * Flag indicating whether the component should be created with associated style files.
     * @type {boolean}
     */
    this.useStyles = false;

    /**
     * Flag indicating whether the component should make use of css modules.
     * @type {boolean}
     */
    this.useCssModules = false;

    /**
     * Flag indicating if stateful components should extends from React.PureComponent
     * @type {boolean}
     */
    this.usePureComponent = false;

    /**
     * Filename of the template that will be used to create the component.
     * @type {?string}
     */
    this.componentTemplateName = null;

    /**
     * Generator and template version to create the component from.
     * @type {?number}
     */
    this.generatorVersion = null;

    this.argument('name', { type: String, required: true });

    this.option('stateless', {
      desc: 'Create a stateless component instead of a full one',
      defaults: false
    });

    this.option('nostyle', {
      desc: 'Create a component without creating an associated style',
      defaults: false
    });

    this.option('pure', {
      desc: 'Create a pure component instead of a "regular" one. Will use React.PureComponent as a base instead of React.Component',
      defaults: false
    });
  }


  configuring() {
    // Read the requested major version or default it to the latest stable
    this.generatorVersion = this.config.get('generatedWithVersion') || 3;

    if (!C.SUPPORTED_GEN_VERSIONS.some(x => x === this.generatorVersion)) {
      this.env.error('Unsupported generator version');
    }

    this.useStyles = !this.options.nostyle;
    this.useCssModules = this.config.get('cssmodules') || false;

    // Make sure we don't try to use template v3 with cssmodules
    if (this.generatorVersion < 4 && this.useStyles && this.useCssModules) {
      this.env.error('Creating components with cssmodules is only supported in generator versions 4+');
    }

    // Get the filename of the component template to be copied during this run
    this.componentTemplateName =
      utils.yeoman.getComponentTemplateName(this.options.stateless, this.useStyles, this.useCssModules);
  }

  writing() {
    const settings =
      getAllSettingsFromComponentName(this.name, this.config.get('style'), this.useCssModules, this.options.pure, this.generatorVersion);

    // Create the style template. Skipped if nostyle is set as command line flag
    if(this.useStyles) {
      this.fs.copyTpl(
        this.templatePath(`${this.generatorVersion}/styles/Component${settings.style.suffix}`),
        this.destinationPath(settings.style.path + settings.style.fileName),
        settings
      );
    }

    // Create the component
    this.fs.copyTpl(
      this.templatePath(`${this.generatorVersion}/components/${this.componentTemplateName}`),
      this.destinationPath(settings.component.path + settings.component.fileName),
      settings
    );

    // Create the unit test
    this.fs.copyTpl(
      this.templatePath(`${this.generatorVersion}/tests/Base.js`),
      this.destinationPath(settings.test.path + settings.test.fileName),
      settings
    );
  }
}

module.exports = ComponentGenerator;
