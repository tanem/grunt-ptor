'use strict';

var path = require('path');
var yargs = require('yargs');
var merge = require('lodash.merge');
var flatten = require('./lib/flatten');

module.exports = function(grunt) {

  grunt.registerMultiTask('ptor', 'Run Protractor e2e tests.', function() {

    var done = function() {};

    if (process.env.NODE_ENV !== 'test') {
      done = this.async();
    }

    // Get command line args, parse into object.
    var argv = yargs.argv;

    // Remove unneeded options.
    delete argv._;
    delete argv.$0;

    // Merge command line args over task-specific and/or target-specific options.
    var options = merge(this.options(), argv);

    // Yank out configFile option as this gets treated separately.
    var configFile = options.configFile;
    delete options.configFile;

    // Flatten options so we can pass these along to Protractor. 
    var flattened = flatten(options);

    // Generate the Protractor command line args.
    var args = Object.keys(flattened).map(function(key) {
      return '--' + key + '=' + flattened[key];
    });
    args.unshift(configFile);

    // Locate protractor executable.
    var cmd = path.join(__dirname, '../node_modules/.bin/protractor');

    // Liftoff.
    grunt.util.spawn({
      cmd: cmd,
      args: args,
      opts: { stdio: 'inherit' }
    }, function(error, result, code) {
      if (code) {
        return done(false);
      }
      done();
    });

  });

};