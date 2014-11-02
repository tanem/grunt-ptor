'use strict';

var path = require('path');
var spawn = require('child_process').spawn;

process.env.NODE_ENV = 'test';

var spawnOptions = {
  cwd: path.join(__dirname, '..'),
  stdio: ['ipc']
};

exports.ptor = {
  
  configfile_cli_option: function(test) {
    test.expect(1);

    var ptor = spawn(
      'grunt',
      [
        'run_test',
        '--configFile=/cli/config'
      ],
      spawnOptions
    );
    ptor.on('message', function(msg) {
      if (msg.name === 'args') {
        test.deepEqual(
          msg.result.args,
          [
            '/cli/config',
            '--baseUrl=http://localhost:2222',
            '--chromeOnly=false',
            '--params.login.user=test',
            '--params.login.password=me'
          ]
        );
      }
    });
    ptor.on('close', function() {
      test.done();
    });
  },

  configfile_target_option: function(test) {
    test.expect(1);

    var ptor = spawn('grunt', ['run_test'], spawnOptions);
    ptor.on('message', function(msg) {
      if (msg.name === 'args') {
        test.deepEqual(
          msg.result.args,
          [
            '/target/config',
            '--baseUrl=http://localhost:2222',
            '--chromeOnly=false',
            '--params.login.user=test',
            '--params.login.password=me'
          ]
        );
      }
    });
    ptor.on('close', function() {
      test.done();
    });
  },

  cli_options: function(test) {
    test.expect(1);
    
    var ptor = spawn(
      'grunt',
      [
        'run_test',
        '--configFile=/cli/config',
        '--baseUrl=http://localhost:3333',
        '--chromeOnly',
        '--params.login.user=someoneelse'
      ],
      spawnOptions
    );
    ptor.on('message', function(msg) {
      if (msg.name === 'args') {
        test.deepEqual(
          msg.result.args,
          [
            '/cli/config',
            '--baseUrl=http://localhost:3333',
            '--chromeOnly=true',
            '--params.login.user=someoneelse',
            '--params.login.password=me'
            ]
        );
      }
    });
    ptor.on('close', function() {
      test.done();
    });
  }

};