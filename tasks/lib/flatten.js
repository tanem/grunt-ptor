
/**
 * Flatten an object into dot notation.
 *
 * @param {Object} object
 * @param {Object} result
 * @param {String} prefix
 */

module.exports = function flatten(object, result, prefix) {
  result = result || {};
  prefix = prefix || '';
  Object.keys(object).forEach(function(key){
    if (typeof object[key] === 'object') {
      return flatten(object[key], result, prefix + key + '.');
    }
    result[prefix + key] = object[key];
  });
  return result;
};