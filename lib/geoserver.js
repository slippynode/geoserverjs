/*********************************************
 * geoserverjs                               *
 * https://github.com/slippynode/geoserverjs *
 *                                           *
 * Copyright 2014 Adrian Sonnenschein        *
 * Released under the MIT license            *
 *********************************************/

(function () {
  var http = require('http')
    , url = require('url')
    , path = require('path')
    , domain = require('domain')
    , GeoJS
    , _request
    ;

  _request = function (options, callback) {
    var server
      , request
      ;

    server = domain.create();

    server.on('error', function (err) {
      callback(new Error(err));
    });

    server.run(function () {

      httpCallback = function (response) {
        var data = '';
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          data += chunk;
        });

        response.on('error', function (err) {
          callback(new Error(err));
        });

        response.on('end', function () {
          callback(null, data);
        });
      }

      request = http.request(options, httpCallback);
      request.end();
    
    })
  };

  GeoJS = function () {
    var args
      , root
      ;

    args = arguments['0'];
    root = this;

    this.options = {
      hostname: url.parse(args.serviceUrl).hostname,
      port: url.parse(args.serviceUrl).port,
      path: url.parse(args.serviceUrl).path,
      query: url.parse(args.serviceUrl).query,
      method: args.method.toUpperCase(),
      format: args.format.toLowerCase(),
      auth: [args.username, args.password].join(':')
    };

    this.Global = {
      settings: function (callback) {
        var cmd
          , options
          ;

        cmd = 'settings';

        options = {
          hostname: root.options.hostname,
          port: root.options.port,
          path: path.join(root.options.path, 
            [cmd, root.options.format].join('.')),
          method: root.options.method,
          auth: root.options.auth
        };

        _request(options, function (err, res) {
          if (err) callback(err);
          else callback(null, res);
        });
      },

      contacts: function (callback) {
        var cmd
          , options
          ;

        cmd = 'settings/contact';

        options = {
          hostname: root.options.hostname,
          port: root.options.port,
          path: path.join(root.options.path, 
            [cmd, root.options.format].join('.')),
          method: root.options.method,
          auth: root.options.auth
        };

        _request(options, function (err, res) {
          if (err) callback(err);
          else callback(null, res);
        });
      }
    };

    this.Workspaces = {

    }

  };

  module.exports = GeoJS;

}());