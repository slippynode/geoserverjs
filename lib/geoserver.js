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

  self.config = {
    url: link,
    method: method,
    format: format,
    username: username,
    password: password
  }
}

GeoserverJS.prototype.globalSettings = function (callback) {
  var self
    , cmd
    , link
    , reqMethod
    , options
    ;

  self = this;
  cmd = '/settings' + self.config.format;

  link = self.config.url + cmd;

  options = {
    url: link,
    method: self.config.method,
    username: self.config.username,
    password: self.config.password
  };

  reqMethod = self._methodizer(options.method);

  reqMethod(options, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  })
}


GeoserverJS.prototype.globalContacts = function (callback) {
  var self
    , cmd
    , link
    , reqMethod
    , options
    ;

  self = this;
  cmd = '/settings/contact' + self.config.format;

  link = self.config.url + cmd;

  options = {
    url: link,
    method: self.config.method,
    username: self.config.username,
    password: self.config.password
  };

  reqMethod = self._methodizer(options.method);

  reqMethod(options, function (err, res) {
    if (err) callback(err);
    else callback(null, res);
  })
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
    case 'DEL':
      return self._requestDel;
      break;
  }
}

GeoserverJS.prototype._requestGet = function (options, callback) {
  request.get(options.url, {
    'auth': {
      'user': options.username,
      'pass': options.password
    }
  },
  function (err, response, body) {
    if (err) callback(err);
    else callback(null, body);
  })
}

GeoserverJS.prototype._requestPost = function (options, callback) {

}

GeoserverJS.prototype._requestPut = function (options, data, callback) {
  request.put(options.url, {
    'auth': {
      'user': options.username,
      'pass': options.password
    },
    'form': {
      
    }
  })
}

GeoserverJS.prototype._requestDel = function (options, callback) {

}

module.exports = GeoserverJS;