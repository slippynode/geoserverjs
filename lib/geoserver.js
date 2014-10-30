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
    , GeoJS
    ;

  GeoJS = function (args) {
    if (this.initialize) {
      this.initialize.apply(this, arguments);
    }
    return this;
  }

  GeoJS.Catalog = function (args, callback) {
    var root
      , link
      ;

    root = this
    link = url.parse(args.url);

    root.host = link.host;
    root.path = link.pathname
    root
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = GeoJS;
  }
  else {
    root.geoserverjs = GeoJS;
  }

}());