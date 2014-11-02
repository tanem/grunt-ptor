var sinon = require('sinon');

module.exports = function(grunt) {
  
  var spawnStub = sinon.stub();
  
  grunt.registerTask('pre', function() {
    grunt.util.spawn = spawnStub;
  });

  grunt.registerTask('post', function() {
    process.send({ name: 'args', result: spawnStub.args[0][0] });
    grunt.util.spawn.restore();
  });

  grunt.registerTask('run_test', ['pre', 'ptor', 'post']);

};