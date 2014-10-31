#!/usr/bin/env node

var program = require('commander')
  , async = require('async')
  , GeoJS = require('./lib/geoserver')
  ;

program
	.version('0.0.1a')
  .option('-s, --serviceurl [value]', 'Geoserver host service URL')
  .option('-u, --username [value]', 'Account username')
  .option('-p, --password [value]', 'Account password')
  .option('-m, --method [value]', 'HTTP request method')
  .option('-f, --format [value]', 'Content type for a resource')
  .option('-d, --data [value]', 'Data for a POST or PUT request')

  .option('-g, --globals', 'Access Geoserver global settings')
  .option('-c, --contact', 'Access Geoserver global contact information')
;

program.on('--help', function () {
  console.log('  Examples:');
  console.log('');
});

program.parse(process.argv);

var queue = [];

try {
  var config = {
    serviceUrl: program.serviceurl || 'http://127.0.0.1:8080/geoserver/rest',
    username: program.username || 'admin',
    password: program.password || 'geoserver',
    method: program.method || 'GET',
    format: program.format || 'json'
  }
  if (program.data) config.data = JSON.stringify(program.data);
} 
catch (err) {
  throw new Error(err);
}

if (config && program.globals) queue.push(globalSettings);
if (config && program.contact) queue.push(globalContacts);
async.series(queue);

function globalSettings () {
  var geoserverjs = new GeoJS(config);
  geoserverjs.Global.settings(function (err, res) {
    if (err) throw err;
    else console.log(res);
  })
}

function globalContacts () {
  var geoserverjs = new GeoJS(config);
  geoserverjs.Global.contacts(function (err, res) {
    if (err) throw err;
    else console.log(res);
  })
}

module.exports = GeoJS;