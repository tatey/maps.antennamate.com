# Antenna Mate (AngularJS)

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

Data is not bundled with this project.

Sample `app/data/sites.json`.

    [{
      "id":2307,
      "name": "Artarmon",
      "latitude":-33.80694444444444,
      "longitude":151.17944444444444,
      "area_served":"Sydney",
      "callsign":"SBS34",
      "frequency":571.5,
      "polarisation":"horizontal",
      "antenna_height":210,
      "channel":"34",
      "maximum_erp":200000.0,
      "signal_type":"digital",
      "country_code":"au"
    }]

Sample `app/data/sites/2307/transmitters.json`.

    [{
      "id":2298,
      "name":"Artarmon",
      "latitude":-33.80694444444444,
      "longitude":151.17944444444444,
      "area_served":"Sydney",
      "callsign":"ATN6","frequency":177.5,
      "polarisation":"horizontal",
      "antenna_height":194,
      "channel":"6",
      "maximum_erp":50000.0,
      "signal_type":"digital",
      "country_code":"au"
    }]

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
