var exec = require('child_process').exec
	, GeoJS = require('../index')
  ;

describe('Geoserver Global Settings', function () {
  
  it('GET global settings from Geoserver (CLI)', function (done) {
    var cmd = 'geoserverjs -g -m GET';
    exec(cmd, function (err, stdout, stderr) {
      if (err) throw err;
      if (stderr) throw stderr;
      done();
    })
  });

  it('GET global settings from Geoserver (JS)', function (done) {
    var geoserverjs
      , config
      ;

    config = {
      serviceUrl: 'http://127.0.0.1:8080/geoserver/rest',
      username: 'admin',
      password: 'geoserver',
      method: 'GET',
      format: 'json'
    };

    geoserverjs = new GeoJS(config);
    geoserverjs.Global.settings(function (err, res) {
      if (err) throw err;
      done();
    })
  });

  it('GET global contacts from Geoserver (CLI)', function (done) {
    var cmd = 'geoserverjs -c -m GET';
    exec(cmd, function (err, stdout, stderr) {
      if (err) throw err;
      if (stderr) throw stderr;
      done();
    })
  });

  it('GET global contacts from Geoserver (JS)', function (done) {
    var geoserverjs
      , config
      ;

    config = {
      serviceUrl: 'http://127.0.0.1:8080/geoserver/rest',
      username: 'admin',
      password: 'geoserver',
      method: 'GET',
      format: 'json'
    };

    geoserverjs = new GeoJS(config);
    geoserverjs.Global.contacts(function (err, res) {
      if (err) throw err;
      done();
    })
  });

  it('PUT global settings to Geoserver (CLI)', function (done) {
    var cmd
      , data
      ;
    data = JSON.stringify({"global":{
      "settings":{
        "id":"SettingsInfoImpl--6b7a8a33:142290ee3a6:-8000",
        "contact":{
          "addressCity":"New York City",
          "addressCountry":"Egypt",
          "addressType":"Work",
          "contactEmail":"claudius.ptolomaeus@gmail.com",
          "contactOrganization":"The ancient geographes INC",
          "contactPerson":"Claudius Ptolomaeus",
          "contactPosition":"Chief geographer"
        },
        "charset":"UTF-8",
        "numDecimals":8,
        "onlineResource":"http:\/\/geoserver.org",
        "verbose":false,
        "verboseExceptions":false,
        "localWorkspaceIncludesPrefix":false
      },
      "jai":{
        "allowInterpolation":false,
        "recycling":false,
        "tilePriority":5,
        "tileThreads":7,
        "memoryCapacity":0.5,
        "memoryThreshold":0.75,
        "imageIOCache":false,
        "pngAcceleration":true,
        "jpegAcceleration":true,
        "allowNativeMosaic":false
      },
      "coverageAccess":{
        "maxPoolSize":10,
        "corePoolSize":5,
        "keepAliveTime":30000,
        "queueType":"UNBOUNDED",
        "imageIOCacheThreshold":10240
      },
      "updateSequence":775,
      "featureTypeCacheSize":0,
      "globalServices":true,
      "xmlPostRequestLogBufferSize":1024
    }});
    cmd = 'geoserverjs -g -m PUT -d ' + data;
    exec(cmd, function (err, stdout, stderr) {
      if (err) throw err;
      if (stderr) throw stderr;
      done();
    })
  });

});