# grunt-ptor

[![Build Status](https://travis-ci.org/tanem/grunt-ptor.png?branch=master)](https://travis-ci.org/tanem/grunt-ptor)
[![NPM version](https://badge.fury.io/js/grunt-ptor.svg)](http://badge.fury.io/js/grunt-ptor)

Run Protractor e2e tests.

## Why?

Other plugins exist but they were either too complicated for what I wanted, or were not being maintained frequently and had a number of bugs and pull requests outstanding.

This plugin leaves the Selenium server management up to another tool; I use [grunt-protractor-webdriver](https://www.npmjs.org/package/grunt-protractor-webdriver), which is then set up as a pre-requisite task to grunt-ptor.

## Getting Started

This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```
$ npm install grunt-ptor --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ptor');
```

## The "ptor" task

### Overview

In your project's Gruntfile, add a section named `ptor` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  ptor: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      options: {
        // Target-specific options go here.
      }
    },
  },
});
```

### Options

See the [Protractor reference conf](https://github.com/angular/protractor/blob/master/docs/referenceConf.js) for the options you can use in both the `Gruntfile` and via the command line.

The order of precendence for options is: command line > target level > task level > Protractor conf file.

### Example

```js
grunt.initConfig({
  ptor: {
    options: {
      configFile: 'protractor.conf.js'
    },
    smoke: {
      options: {
        suites: 'smoke'
      }
    }
  }
});
```

```
$ grunt ptor --chromeOnly --params.login.user=Jane --params.login.password=1234
``` 

## Tests

To run:

```
$ grunt test
```

### Test notes

A child process is spawned within each test so we can execute the task from end to end. This makes method stubbing a little tricky since we are executing in a different process, so a couple of helper tasks are also used:

 * `pre` sets up any required stubs
 * `post` sends the required information back to the parent process.

This way we can test our expectations in the parent process.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).