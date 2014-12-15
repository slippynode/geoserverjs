/*********************************************
 * geoserverjs                               *
 * https://github.com/slippynode/geoserverjs *
 *                                           *
 * Copyright 2014 Adrian Sonnenschein        *
 * Released under the MIT license            *
 *********************************************/

var request = require('request')
  , url = require('url')
  , path = require('path')
  ;

function GeoserverJS () {
  var self = this;
  self.init(arguments['0']);
}

GeoserverJS.prototype.init = function (options) {
  var self
    , protocol
    , slashes
    , hostname
    , port
    , path
    , query
    , format
    , link
    , method
    , username
    , password
    , auth
    ;

  self = this;

  if (!options) {
    self.config = {};
  }

  protocol = url.parse(options.serviceUrl).protocol;
  hostname = url.parse(options.serviceUrl).hostname;
  port = url.parse(options.serviceUrl).port;
  path = url.parse(options.serviceUrl).path;
  query = url.parse(options.serviceUrl).query;
  format = '.' + options.format.toLowerCase();

  link = url.format({
    protocol: protocol,
    hostname: hostname,
    port: port,
    pathname: path,
    query: query
  });

  method = options.method.toUpperCase();
  username = options.username;
  password = options.password;

  auth = "Basic " + new Buffer(options.username + ":"
    + options.password).toString("base64")
  ;

  self.config = {
    url: link,
    method: method,
    format: format,
    auth: auth
  }
}
// Global settings -------------------------------------------------------------
GeoserverJS.prototype.globalSettings = function (callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/settings' + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data)
}


GeoserverJS.prototype.globalContacts = function (callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/settings/contact' + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data)
}

// Workspaces ------------------------------------------------------------------
GeoserverJS.prototype.workspace = function (callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/workspaces' + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data)
}

GeoserverJS.prototype.workspaces = function (workspace, callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/workspaces/' + workspace + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data)
}

GeoserverJS.prototype.defaultWorkspace = function (callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/workspaces/default' + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data)
}

GeoserverJS.prototype.workspaceSettings = function (workspace, callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/workspaces/' + workspace + '/settings' + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data)
}

// Namespaces ------------------------------------------------------------------
GeoserverJS.prototype.namespaces = function (callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/namespaces' + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data)
}

GeoserverJS.prototype.namespace = function (namespace, callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/namespaces/' + namespace + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data);
}

GeoserverJS.prototype.defaultNamespace = function (callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/namespaces/default/' + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data);
}

// Data stores -----------------------------------------------------------------
GeoserverJS.prototype.datastores = function (ws, callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/workspaces/' + ws + '/datastores' + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data);
}

GeoserverJS.prototype.datastore = function (ws, ds, callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/workspaces/' + ws + '/datastores/' + ds + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data);
}

GeoserverJS.prototype.datastoreFile = function (ws, ds, f, callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/workspaces/' + ws + '/datastores/' + ds +
    '/' + f + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data);

}

// Feature types ---------------------------------------------------------------
GeoserverJS.prototype.featureTypes = function (ws, ds, callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/workspaces/' + ws + '/datastores/' + ds + '/featuretypes'
    + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data);
}

GeoserverJS.prototype.featureType = function (ws, ds, ft, callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/workspaces/' + ws + '/datastores/' + ds + '/featuretypes'
    + ft + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data);
}

// Coverage stores -------------------------------------------------------------
GeoserverJS.prototype.coverageStores = function (ws, callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/workspaces/' + ws + '/coveragestores' + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data);
}

GeoserverJS.prototype.coverageStore = function (ws, cs, callback, data) {
  var self
    , cmd
    ;

  self = this;
  cmd = '/workspaces/' + ws + '/coveragestores/' + cs + self.config.format;
  self._requester(cmd, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data);
}

GeoserverJS.prototype.coverageStoreFile = function (callback, data) {

}

// Coverages -------------------------------------------------------------------
GeoserverJS.prototype.coverages = function (callback, data) {

}

GeoserverJS.prototype.coverage = function (callback, data) {

}

// Structured coverages --------------------------------------------------------
GeoserverJS.prototype.structuredCoverage = function (callback, data) {

}

// Styles ----------------------------------------------------------------------
GeoserverJS.prototype.styles = function (callback, data) {

}

GeoserverJS.prototype.style = function (callback, data) {

}

// Layers ----------------------------------------------------------------------
GeoserverJS.prototype.layers = function (callback, data) {

}

GeoserverJS.prototype.layer = function (callback, data) {

}

// Layer groups ----------------------------------------------------------------
GeoserverJS.prototype.layerGroups = function (callback, data) {

}

GeoserverJS.prototype.layerGroup = function (callback, data) {

}

// Fonts -----------------------------------------------------------------------
GeoserverJS.prototype.fonts = function (callback, data) {

}

// Freemarker templates --------------------------------------------------------
GeoserverJS.prototype.templates = function (callback, data) {

}

GeoserverJS.prototype.template = function (callback, data) {

}

// OWS Services ----------------------------------------------------------------
GeoserverJS.prototype.globalSettingsWCS = function (callback, data) {

}

GeoserverJS.prototype.workspaceSettingsWCS = function (callback, data) {

}

GeoserverJS.prototype.globalSettingsWFS = function (callback, data) {

}

GeoserverJS.prototype.workspaceSettingsWFS = function (callback, data) {

}

GeoserverJS.prototype.globalSettingsWMS = function (callback, data) {

}

GeoserverJS.prototype.workspaceSettingsWMS = function (callback, data) {

}

// Reloading configuration -----------------------------------------------------
GeoserverJS.prototype.reload = function (callback, data) {

}

// Resource reset --------------------------------------------------------------
GeoserverJS.prototype.reset = function (callback, data) {

}

// Manifests -------------------------------------------------------------------
GeoserverJS.prototype.manifest = function (callback, data) {

}

GeoserverJS.prototype.version = function (callback, data) {

}

// Helper functions ------------------------------------------------------------
GeoserverJS.prototype._requester = function (cmd, callback, data) {
  var self
    , link
    , reqMethod
    , options
    ;

  self = this;

  link = self.config.url + cmd;

  options = {
    url: link,
    method: self.config.method,
    auth: self.config.auth
  };

  reqMethod = self._methodizer(options.method);

  reqMethod(options, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  }, data)
}

GeoserverJS.prototype._methodizer = function (method) {
  var self = this;

  switch (method) {
    case 'GET':
      return self._requestGet;
      break;
    case 'POST':
      return self._requestPost;
      break;
    case 'PUT':
      return self._requestPut;
      break;
    case 'DELETE':
      return self._requestDel;
      break;
  }
}

GeoserverJS.prototype._requestGet = function (options, callback) {
  request.get(options.url, {
    method: "GET",
    uri: options.url,
    headers: { "Authorization": options.auth }
  },
  function (err, response, body) {
    if (err) callback(err);
    else callback(null, body);
  })
}

GeoserverJS.prototype._requestPost = function (options, callback, data) {
  request({
    method: "POST",
    uri: options.url,
    headers: {
      "content-type": "application/json",
      "Authorization": options.auth
    },
    body: JSON.stringify(data)
  },
  function (err, response, body) {
    if (err) callback(err);
    else callback(null, body);
  })
}

GeoserverJS.prototype._requestPut = function (options, callback, data) {
  request({
    method: "PUT",
    uri: options.url,
    headers: {
      "content-type": "application/json",
      "Authorization": options.auth
    },
    body: JSON.stringify(data)
  },
  function (err, response, body) {
    if (err) callback(err);
    else callback(null, body);
  })
}

GeoserverJS.prototype._requestDel = function (options, callback, data) {
  var parameters
    , key
    , value
    ;

  parameters = {
    method: "DELETE",
    uri: options.url,
    headers: {
      "content-type": "application/json",
      "Authorization": options.auth
    },
  };

  if (data) {
    for (key in data) {
      if (data.hasOwnProperty(key)) {
        value = data[key];
        parameters[key] = value;
      }
    }
  }

  request(parameters, function (err, response, body) {
    if (err) callback(err);
    else callback(null, body);
  })
}

module.exports = GeoserverJS;