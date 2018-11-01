// Require dependencies
const gulp    = require('gulp');
const through = require('through2');

// Require local dependencies
const parser = require('lib/utilities/parser');

/**
 * Create Controllers Task class
 *
 * @task controllers
 */
class ControllersTask {

  /**
   * Construct Controllers Task class
   *
   * @param {Loader} runner
   */
  constructor (runner) {
    // Set private variables
    this._runner = runner;

    // Bind public methods
    this.run   = this.run.bind(this);
    this.watch = this.watch.bind(this);
  }

  /**
   * Run assets task
   *
   * @return {Promise}
   */
  run () {
    // Set config
    const roots  = [];
    const config = {};

    // Get all routes
    return gulp.src(this._runner.files('controllers/**/*.js'))
      .pipe(through.obj((chunk, enc, cb) => {
        // Run pipe chunk
        this._runner.merge(config, parser.controller(chunk));

        // Get roots
        let bundles = chunk.path.replace(/\\/g, '/').split('/bundles');

        // Pop
        bundles.pop();
        bundles = bundles.join('/bundles');

        // Check roots includes
        if (!roots.includes(bundles)) {
          // Push to roots
          roots.push(bundles + '/bundles');
        }

        // Run callback
        cb(null, chunk);
      }))
      .on('end', () => {
        // Loop types in config
        for (const type in config) {
          // Check config has type
          if (config.hasOwnProperty(type)) {
            // Write config file
            this._runner.write(type, config[type]);
          }
        }

        // Write controller roots
        this._runner.write('controller.roots', roots);

        // Restart server
        this._runner.restart();
      });
  }

  /**
   * Watch task
   *
   * @return {string[]}
   */
  watch () {
    // Return files
    return [
      'controllers/**/*.js',
      'helpers/**/*.js'
    ];
  }

}

/**
 * Export Controllers Task class
 *
 * @type {ControllersTask}
 */
exports = module.exports = ControllersTask;
