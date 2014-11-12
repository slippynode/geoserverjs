var exec = require('child_process').exec
	, GeoJS = require('../index')
  ;

describe('Geoserver Global Settings', function () {

  var putGlobalData = {"global":{
    "settings":{
      "contact":{
        "addressCity":"New York City",
        "addressCountry":"United States",
        "addressType":"Work",
        "contactEmail":"test@gmail.com",
        "contactOrganization":"SlippyNode",
        "contactPerson":"Huckleberry Finn",
        "contactPosition":"Canine CTO"
      }
    }
  }};

  var putGlobalContactData = {
    "contact":{
      "addressCity":"New York City",
      "addressCountry":"United States",
      "addressType":"Work",
      "contactEmail":"test@gmail.com",
      "contactOrganization":"SlippyNode",
      "contactPerson":"Huckleberry Finn",
      "contactPosition":"Canine CTO"
    }
  };

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
    geoserverjs.globalSettings(function (err, res) {
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
    geoserverjs.globalContacts(function (err, res) {
      if (err) throw err;
      done();
    })
  });

  it('PUT global settings to Geoserver (CLI)', function (done) {
    var cmd = 'geoserverjs -g -m PUT -d ' + putGlobalData;
    exec(cmd, function (err, stdout, stderr) {
      if (err) throw err;
      if (stderr) throw stderr;
      done();
    })
  });

  it('PUT global settings to Geoserver (JS)', function (done) {
    var cmd
      , geoserverjs
      , config
      ;

    config = {
      serviceUrl: 'http://127.0.0.1:8080/geoserver/rest',
      username: 'admin',
      password: 'geoserver',
      method: 'PUT',
      format: 'json'
    };

    geoserverjs = new GeoJS(config);
    geoserverjs.globalSettings(function (err, res) {
      if (err) throw err;
      done();
    }, putGlobalData)
  });

  it('PUT global contact settings to Geoserver (CLI)', function (done) {
    var cmd = 'geoserverjs -c -m PUT -d ' + putGlobalContactData;
    exec(cmd, function (err, stdout, stderr) {
      if (err) throw err;
      if (stderr) throw stderr;
      done();
    })
  });

  it('PUT global contact settings to Geoserver (JS)', function (done) {
    var cmd
      , geoserverjs
      , config
      ;

    config = {
      serviceUrl: 'http://127.0.0.1:8080/geoserver/rest',
      username: 'admin',
      password: 'geoserver',
      method: 'PUT',
      format: 'json'
    };

    geoserverjs = new GeoJS(config);
    geoserverjs.globalContacts(function (err, res) {
      if (err) throw err;
      done();
    }, putGlobalContactData)
  });

});