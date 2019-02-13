
// Require helper
const helper = require('helper');

/**
 * Create model helper
 *
 * @extends helper
 */
class ModelHelper extends helper {
  /**
   * Construct model helper
   */
  constructor() {
    // Run super
    super();

    // Bind methods
    this.deafen = this.deafen.bind(this);
    this.listen = this.listen.bind(this);
  }

  /**
   * Live listens to model
   *
   * @param  {String}  sessionID
   * @param  {*}       Model
   * @param  {String}  listenID
   *
   * @returns {Promise}
   */
  deafen(sessionID, Model, listenID) {
    // Call local
    return this.eden.thread('compute', 0).call('model.deafen', sessionID, Model.constructor.name.toLowerCase(), Model.get('_id').toString(), listenID, atomic);
  }

  /**
   * Live listens to model
   *
   * @param  {String}  sessionID
   * @param  {*}       Model
   * @param  {String}  listenID
   * @param  {Boolean} atomic
   *
   * @returns {Promise}
   */
  listen(sessionID, Model, listenID, atomic = false) {
    // Call local
    return this.eden.thread('compute', 0).call('model.listen', sessionID, Model.constructor.name.toLowerCase(), Model.get('_id').toString(), listenID, atomic);
  }
}

/**
 * Export model helper
 *
 * @type {ModelHelper}
 */
module.exports = new ModelHelper();
