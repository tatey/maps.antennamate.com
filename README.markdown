# Antenna Mate (AngularJS)

Try it out, [http://maps.antennamate.com](http://maps.antennamate.com).

Find and link to terrestrial television transmitters in your browser.
This is the counterpart project to [Antenna Mate for iOS](http://antennamate.com).

## System Dependencies

* Ruby 2 (Jekyll)
* Node.js 0.10 (Karma)
* PhanthomJS (Karma)

## Setup

Install application dependencies.

    $ bundle
    $ npm install

## Data

Data is not bundled with this project. You can download a sample set and copy
it into `app/data`.

    $ curl -o app/data/sites.json --compressed http://maps.antennamate.com/data/sites.json
    $ mkdir -p app/data/sites/2307
    $ curl -o app/data/sites/2307/transmitters.json --compressed http://maps.antennamate.com/data/sites/2307/transmitters.json

## Development

First, start the local server and rebuild on change.

    $ script/serve

Then, open in your browser.

    $ open http://localhost:4000

The site is built into `tmp/site`.

## Testing

Run the entire test suite.

    $ script/spec

Specs are located in `spec/unit`.

## Deploying

First, configure S3 bucket credentials by editing
`config/s3_credentials.yml`.

    $ cp config/s3_credentials.dist.yml config/s3_credentials.yml.

Then, build and deploy to S3.

    $ script/deploy

The site is built into `tmp/deploy`. The directory is deleted before
building by the deploy script. Assets are minified.

Finally, everything is accelorated through Cloudfront for extra low-latency
goodness. HTTP headers can be configured by editing `config/s3_bucket.yml`.

## Browser Compatibility

This project has been verified to work in the following browsers:

* Chrome
* Safari (OS X and iOS)
* Firefox
* IE9,10,11
