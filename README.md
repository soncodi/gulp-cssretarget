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
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
...

var userefAssets = useref.assets({
  noconcat: true // preserve paths for gulp-cssretarget
});

// retargets relative URLs when moving from www to dist
return gulp.src('www/index.html')
  .pipe(userefAssets)
  .pipe(gulpif('**/*.css', cssRetarget({ root: 'www' })))
  .pipe(gulpif('**/*.css', concat('style.css')))
  .pipe(gulpif('**/*.js', concat('style.js')))
  .pipe(userefAssets.restore())
  .pipe(gulp.dest('dist'));
```

### Options
#### options.root
Type: `String`
Default value: `''`

The directory relative to which paths are determined.

#### options.prepend
Type: `String`
Default value: `''`

String prepended to each asset URL.

### Release History
#### 1.1.2 - 1.1.1
  Update docs, refresh package
#### 1.1.0
  Add prepend option
#### 1.0.0
  Initial release

#### Originally forked from [gulp-css-rebase-urls](https://github.com/kjbekkelund/gulp-css-rebase-urls)
