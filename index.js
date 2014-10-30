var program = require('commander')
  , async = require('async')
  ;

program
	.version('0.0.1a')
  .option('-h, --host [value]', 'Geoserver host URL')
  .option('-p, --port [value]', 'Port Geoserver is listening on')
;

program.on('--help', function () {
  console.log('  Examples:');
  console.log('');
});

program.parse(process.argv);

var queue = [];
async.series(queue);