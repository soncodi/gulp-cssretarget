var rework = require('rework');
var path = require('path');
var through = require('through2');
var util = require('gulp-util');

function rebaseFile(options) {
  return rework(options.orig).use(rework.url(function(url) {
    var skip = (
      /^\s*\//.test(url) ||    // absolute url
      /^\s*http/i.test(url) || // http/https
      /^\s*data:/i.test(url)   // data url
    );

    if (skip) {
      return url;
    }

    var rebased = path.relative(
      options.root,
      path.join(options.cwd, url)
    );

    if (process.platform === 'win32') {
      rebased = rebased.replace(/\\/g, '/');
    }

    util.log('[retarget]'.magenta, url.bold, '=>', rebased.green, '✔'.green);

    return rebased;
  })).toString();
}

module.exports = function(opts) {
  opts = opts || {};

  var root = opts.root || '.';

  return through.obj(function(file, enc, cb) {
    file.contents = new Buffer(rebaseFile({
      orig: file.contents.toString(),
      cwd: path.dirname(file.path),
      root: path.join(file.cwd, root)
    }));

    this.push(file);

    cb();
  });
};
