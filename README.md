gulp-cssretarget
================

Retarget relative CSS URLs during asset rebasing.

### Install
```shell
npm install gulp-cssretarget --save
```

### Example usage
```js
var cssRetarget = require('gulp-cssretarget');
var useref = require('gulp-useref');
...

var userefAssets = useref.assets({
  noconcat: true // preserve paths for gulp-cssretarget
});

// retargets relative URLs from www to dist
return gulp.src('www/index.html')
  .pipe(userefAssets)
  .pipe(gulpif('**/*.css', cssRetarget({
    root: 'dist'
  })))
  .pipe(userefAssets.restore())
  .pipe(gulp.dest('dist'));
```

### Options
#### options.root
Type: `String`
Default value: `''`

The new directory root relative to which your assets will live.

#### options.prepend
Type: `String`
Default value: `''`

String prepended to each asset URL.

### Release History
#### 1.1.0
  Add prepend option
#### 1.0.0
  Initial release

#### Originally forked from [gulp-css-rebase-urls](https://github.com/kjbekkelund/gulp-css-rebase-urls)
