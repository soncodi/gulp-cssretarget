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

#### options.suffix
Type: `String`
Default value: `''`

String added before the final extension of each asset URL (useful for proper cache busting). Example with `{ suffix: "-1.2.0" }`:

```text
[retarget] images/some-image.png => images/some-image-1.2.0.png ✔
[retarget] images/some-image.small.png => images/some-image.small-1.2.0.png ✔
[retarget] images/some-image.png?size=small => images/some-image-1.2.0.png?size=small ✔
[retarget] images/some-image.png#size=small => images/some-image-1.2.0.png#size=small ✔
```

#### options.silent
Type: `Boolean`
Default value: `false`

Don't log the rebased URLs.


### Release History
#### 1.2.0
  Add suffix option (@sp00m)
#### 1.1.4
  Add silent option (@monestereo)
#### 1.1.3
  Fix undefined color format. Bump deps.
#### 1.1.2 - 1.1.1
  Update docs, refresh package
#### 1.1.0
  Add prepend option
#### 1.0.0
  Initial release

#### Originally forked from [gulp-css-rebase-urls](https://github.com/kjbekkelund/gulp-css-rebase-urls)
