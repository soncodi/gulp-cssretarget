var rework = require('rework');
var path = require('path');
var through = require('through2');
var util = require('gulp-util');
var colors = util.colors;

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

    if (options.prepend) {
      rebased = options.prepend + rebased;
    }

    if (options.suffix) {
      rebased = rebased.replace(/(?=\.[^.]+(?:[#?].*)?$)/, options.suffix);
    }

    if (!options.silent) {
      util.log(
        colors.magenta('[retarget]'),
        colors.bold(url),
        '=>',
        colors.green(rebased + ' ✔')
      );
    }

    return rebased;
  })).toString();
}

module.exports = function(opts) {
  opts = opts || {};

  var root = opts.root || '.';

  return through.obj(function(file, enc, cb) {
    file.contents = new Buffer(rebaseFile({
      orig: file.contents.toString(),
      prepend: opts.prepend || '',
      suffix: opts.suffix || '',
      silent: opts.silent || false,
      cwd: path.dirname(file.path),
      root: path.join(file.cwd, root)
    }));

    this.push(file);

    cb();
  });
};
