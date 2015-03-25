# finaid-decisions #



This project uses [grunt](http://gruntjs.com/) to automate some various tasks
(code checking, concatenation, minification) and is designed to be used with
the Studio Launch Process.

## Building the project ##

Assuming you have all the requirements installed (see "Requirements" below),
run the `grunt` command from the root of this repository in the terminal
program of your choice.

This will do the following things, in order:

* Check your code for problems using [jshint](http://www.jshint.com/).

* Concatenate your JS and CSS files.

* Minify/compress your concatenated JS file.

* Process your [Less](http://lesscss.org/) files, if any, and
  concatenate/minify them with your CSS.

## Requirements ##

Using [grunt](http://gruntjs.com/) requires the grunt command-line client,
which in turn requires [Node.js](http://nodejs.org/).

If you have installed these things for use with any other Chronicle project,
you don't need to install them again just for this one.

If, when you try to run `grunt`, you get an error message such as
`Fatal error: unable to find local grunt`, you probably need to install this
repository's specific requirements; just run the `npm install` command from the
root of this repository.

## Where files live ##

### Finished production files ###

When you build the project (as described in "Building the project" above),
finished CSS and JS files will be created (or updated) in the `dist` directory
of this repository.

There will be both minified versions (denoted with `.min` in the filenames) and
unminified versions (with the same filenames except without `.min` in them).

By default, the unminified versions will be loaded onto your project's pages
automatically. When you want to switch to the minified files, edit the
`cssPaths` and `jsPaths` variables toward the top of `init.js`.

### JS libraries ###

If there are any JS libraries you want to keep separate from your project
source code (i.e., not have it be part of the same file in production), add it
to the `dist/lib` directory. You will need to list it in the `jsPaths` variable
toward the top of `init.js`.

### Source files ###

Source files (i.e., the ones you actually edit) live in the `src` directory of
this repository.

#### JS ####

JS files live in `src/js`.

Any files ending in `.js` will be concatenated together when the project is
built. They will be concatenated in alphabetical order, except that `_intro.js`
and `_outro.js` always will be at the very beginning and very end,
respectively. (More on that later.)

The primary JS file for this project should be named `src/js/main.js`, but this
is only a convention. (Because all files are being concatenated eventually,
this will end up in the end result somewhere even if it gets renamed.) If you
write only one source file, name it `main.js`; if you have multiple source
files, put the initialization code (such as your `$( document ).ready` call) in
`main.js`.

You can safely ignore `_intro.js` and `_outro.js`; those simply help ensure the
correct jQuery version is being used and keep you from inadvertently setting
global variables that other scripts can access. (Of course, if you want to set
global variables, feel free--just set them as attributes of `window`; for
example, `window.canYouHearMeNow = true;` will work just fine.)

#### CSS ####

CSS files live in `src/css`.

Any files ending in `.css` will be concatenated together when the project is
built. If you have multiple CSS files, they will be concatenated in
alphabetical order, which might have some interesting effects on your cascades.

If you prefer to use [Less](http://lesscss.org/), Less files should live in
`src/css/less`. The primary Less file must be named `src/css/less/main.less`,
and any other Less files you are using should be `@import`ed into that file.

If you want to mix both Less and CSS code, that's fine, too; the CSS source
files will be concatenated (as described before) with the processed Less file
added to the beginning.

### Images, etc. ###

If you have relatively small amounts (no videos, for example) of any other
media that should be included with this project, keep them in `dist/media`.

## Handling old browsers ##

If you need to handle things differently for old browsers (particularly IE 8):

### Conditionally loading libraries ###

If you want to change which libraries or other files are injected into the page
on load, edit the `if ( isModernBrowser() )` block near the middle of
`init.js`.

### Detecting in CSS ###

The `if ( isModernBrowser() )` block mentioned in "Conditionally loading
libraries" above also adds the `old-ie` class to the page's `#article-body`
element for your use.

