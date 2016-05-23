/**
 * Swig Template Rendering Engine.
 */
var extras = require('swig-extras');
module.exports = {
  /* Template File Extension */
  ext: 'swig',

  /* Function to handle render request */
  fn: function (path, data, cb) {
    /* Swig Renderer */
    var swig = require('swig');
    /* Ensure we not need to restart the sails server if something page has modified */
    if (data.settings.env === 'development') {
      swig.setDefaults({cache: false});
    }
    /*
     * 绑定一些常用路径
     * Thanks to: https://github.com/mahdaen/sails-views-swig
     * */
    var paths = {
      script: '/js',
      style: '/styles/default',
      image: '/images',
      font: '/fonts',
      icon: '/icons',
      bower: '/bower_components'
    };

    if (!data.path) {
      data.path = paths;
    }
    else {
      for (var key in paths) {
        if (!key in data.path) {
          data.path[key] = paths[key];
        }
      }
    }
    // 补充extra
    extras.useFilter(swig, 'split');
    /* Render Templates */
    return swig.renderFile(path, data, cb);
  }
}
