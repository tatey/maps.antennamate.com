# Antenna Mate (AngularJS + Lineman)

[![Build Status](https://travis-ci.org/tatey/maps.antennamate.com.png?branch=master)](https://travis-ci.org/tatey/maps.antennamate.com)

Try it out, [http://maps.antennamate.com](http://maps.antennamate.com).

Find and link to terrestrial television transmitters in your browser.
This is the counterpart project to [Antenna Mate for iOS](http://antennamate.com).

## System Dependencies

* Node.js 0.10
* Chrome (Specs)

## Setup

First, install [Lineman](http://www.linemanjs.com/).

    $ npm install -g lineman

Then, install the application's dependencies.

    $ npm install

Lineman is a command-line utility that is hyper-focused on helping web
developers build first-class JavaScript web applications.

## Development

First, start the local server and file watcher.

    $ lineman run

Then, open in your browser.

    $ open http://localhost:8000

## Testing

Run the entire test suite.

    $ lineman spec

## Deploying

First, configure AWS S3 credentials by copying the distribution file and
editing the the contents.

    $ cp config/credentials.dist.json config/credentials.json

Then, build and deploy to AWS S3.

    $ lineman grunt deploy

Finally, everything is accelerated through AWS Cloudfront for extra low-latency
goodness. HTTP headers are configured by editing `tasks/deploy.js`.

## Browser Compatibility

This project has been verified to work in the following browsers:

* Chrome
* Safari (OS X and iOS)
* Firefox
* IE9,10,11

## Copyright

Copyright (c) 2014 Tate Johnson. Distributed under the MIT License. See LICENSE.
