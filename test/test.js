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

describe('Geoserver Workspace Settings', function () {

  it('GET all workspaces from Geoserver (JS)', function (done) {
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
    geoserverjs.workspace(function (err, res) {
      if (err) throw err;
      done();
    })
  });

  it('POST a new workspace to Geoserver (JS)', function (done) {
    var geoserverjs
      , postData
      , config
      ;

    postData = {
      "workspace": {
        "name":"testPostWorkspace"
      }
    };

    config = {
      serviceUrl: 'http://127.0.0.1:8080/geoserver/rest',
      username: 'admin',
      password: 'geoserver',
      method: 'POST',
      format: 'json'
    };

    geoserverjs = new GeoJS(config);
    geoserverjs.workspace(function (err, res) {
      if (err) throw err;
      done();
    }, postData);
  });

  it('GET a specific workspace from Geoserver (JS)', function (done) {
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
    geoserverjs.workspaces('testPostWorkspace', function (err, res) {
      if (err) throw err;
      done();
    });
  });

  it('PUT modify specific workspace in Geoserver (JS)', function (done) {
    var geoserverjs
      , data
      , config
      ;

    data = {};

    config = {
      serviceUrl: 'http://127.0.0.1:8080/geoserver/rest',
      username: 'admin',
      password: 'geoserver',
      method: 'PUT',
      format: 'json'
    };

    geoserverjs = new GeoJS(config);
    geoserverjs.workspaces('testPostWorkspace', function (err, res) {
      if (err) throw err;
      done();
    }, data);
  });

  it('DELETE a specific workspace in Geoserver (JS)', function (done) {
    var geoserverjs
      , data
      , config
      ;

    data = {
      "recurse": true
    };

    config = {
      serviceUrl: 'http://127.0.0.1:8080/geoserver/rest',
      username: 'admin',
      password: 'geoserver',
      method: 'DELETE',
      format: 'json'
    };

    geoserverjs = new GeoJS(config);
    geoserverjs.workspaces('testPostWorkspace', function (err, res) {
      if (err) throw err;
      done();
    }, data);
  });

  it('GET default workspace from Geoserver (JS)', function (done) {
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
    geoserverjs.defaultWorkspace(function (err, res) {
      if (err) throw err;
      done();
    });
  });

  it('PUT default workspace in Geoserver (JS)', function (done) {
    var geoserverjs
      , data
      , config
      ;

    data = {
      "workspace": {
        "name": "it.geosolutions"
      }
    };

    config = {
      serviceUrl: 'http://127.0.0.1:8080/geoserver/rest',
      username: 'admin',
      password: 'geoserver',
      method: 'PUT',
      format: 'json'
    };

    geoserverjs = new GeoJS(config);
    geoserverjs.defaultWorkspace(function (err, res) {
      if (err) throw err;
      done();
    }, data);
  });

  it('GET specific workspace settings in Geoserver (JS)', function (done) {
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
    geoserverjs.workspaceSettings('it.geosolutions', function (err, res) {
      if (err) throw err;
      done();
    });
  });

  it('PUT modify workspace settings in Geoserver (JS)', function (done) {
    var geoserverjs
      , data
      , config
      ;

    data = {
      "settings": {
        "enabled": true,
        "contact": {
          "contactPerson": "Tom Sawyer"
        }
      }
    };

    config = {
      serviceUrl: 'http://127.0.0.1:8080/geoserver/rest',
      username: 'admin',
      password: 'geoserver',
      method: 'PUT',
      format: 'json'
    };

    geoserverjs = new GeoJS(config);
    geoserverjs.workspaceSettings('it.geosolutions', function (err, res) {
      if (err) throw err;
      done();
    }, data);
  });

  it('DELETE workspace settings in Geoserver (JS)', function (done) {
    var geoserverjs
      , data
      , config
      ;

    data = {
      "settings": {
        "contact": {
          "contactPerson": "Tom Sawyer"
        }
      }
    };

    config = {
      serviceUrl: 'http://127.0.0.1:8080/geoserver/rest',
      username: 'admin',
      password: 'geoserver',
      method: 'DELETE',
      format: 'json'
    };

    geoserverjs = new GeoJS(config);
    geoserverjs.workspaceSettings('it.geosolutions', function (err, res) {
      if (err) throw err;
      done();
    }, data);
  });

});

describe('Geoserver Namespace Settings', function () {
  it('GET a list of namespaces from Geoserver', function (done) {
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
    geoserverjs.namespaces(function (err, res) {
      if (err) throw err;
      done();
    })
  });

  it('POST create a new namespace in Geoserver', function (done) {
    var geoserverjs
      , data
      , config
      ;

    data = {
      "namespace": {
        "prefix": "test"
      }
    };

    config = {
      serviceUrl: 'http://127.0.0.1:8080/geoserver/rest',
      username: 'admin',
      password: 'geoserver',
      method: 'POST',
      format: 'json'
    };

    geoserverjs = new GeoJS(config);
    geoserverjs.namespaces(function (err, res) {
      if (err) throw err;
      done();
    }, data)
  });

  it('GET a single namespace from Geoserver', function (done) {
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
    geoserverjs.namespace('it.geosolutions', function (err, res) {
      if (err) throw err;
      done();
    })
  });

  it('GET default namespace from Geoserver', function (done) {
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
    geoserverjs.defaultNamespace(function (err, res) {
      if (err) throw err;
      done();
    })
  });
});

describe('Geoserver Data Store Settings', function () {

  it('GET a list of data stores in a workspace', function (done) {
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
    geoserverjs.datastores('it.geosolutions', function (err, res) {
      if (err) throw err;
      done();
    })
  });

  it('POST create a new data store in a workspace', function (done) {
    var geoserverjs
      , data
      , config
      ;

    data = {
      "dataStores": {
        "dataStore": [{"name": "test"}]
      }
    };

    config = {
      serviceUrl: 'http://127.0.0.1:8080/geoserver/rest',
      username: 'admin',
      password: 'geoserver',
      method: 'POST',
      format: 'json'
    };

    geoserverjs = new GeoJS(config);
    geoserverjs.datastores('sf', function (err, res) {
      if (err) throw err;
      done();
    }, data)
  });

});

describe('Geoserver Feature Type Settings', function () {

  it('GET a list of feature types from a datastore', function (done) {
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
    geoserverjs.featureTypes('tiger', 'nyc', function (err, res) {
      if (err) throw err;
      done();
    })
  });

  it('GET a single feature type from a datastore', function (done) {
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
    geoserverjs.featureType('tiger', 'nyc', 'poi', function (err, res) {
      if (err) throw err;
      done();
    })
  });

});

describe('Geoserver Coverage Store Settings', function () {

  it('GET a list of coverage stores in a workspace', function (done) {
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
    geoserverjs.coverageStores('sf', function (err, res) {
      if (err) throw err;
      done();
    })
  });

  it('GET a single coverage store in a workspace', function (done) {
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
    geoserverjs.coverageStore('sf', 'sfdem', function (err, res) {
      if (err) throw err;
      done();
    })
  });

});