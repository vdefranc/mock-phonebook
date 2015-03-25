(function( window ) {
'use strict';

var $ = window.$,
  cssPaths = [
    // Add any other library-related CSS here.
    'dist/finaid-decisions.css'  // Concatenated project CSS/processed Less
  ],
  currentProtocol = window.location.protocol,
  document = window.document,
  fullHostname = window.location.hostname,
  head = document.getElementsByTagName( 'head' )[ 0 ],
  jsPaths = [
    '//chronicle.com/assets/js/jquery/jquery-1.10.0.min.js',
    'dist/lib/js/underscore-min.js',
    'dist/lib/js/backbone-min.js',
    'dist/lib/js/scroll-up-bar.min.js',
    // Add any other external libraries (saved under dist/lib/) here.
    'dist/finaid-decisions.js'  // Concatenated project JS
  ],
  rootPath;

window.oldJQueryVersion = $.fn.jquery;

function endsWith( fullString, searchString, position ) {
  // Thanks: http://mzl.la/19O7aQ0
  var lastIndex;

  position = position || fullString.length;
  position = position - searchString.length;

  lastIndex = fullString.lastIndexOf( searchString );

  return lastIndex !== -1 && lastIndex === position;
}

function isModernBrowser() {
  // Thanks: http://decadecity.net/blog/2013/02/06/feature-detection-for-jquery-2
  return (typeof JSON !== 'undefined' &&
    'querySelector' in document &&
    'addEventListener' in window);
}

function isAbsolute( path ) {
  return path.substring( 0, 2 ) === '//' || path.indexOf( '://' ) !== -1;
}

// Figure out which root path contains the things we want to load.
rootPath = (function( rootPaths ) {
  var i,
    len;

  for ( i = 0, len = rootPaths.length; i < len; i++ ) {
    if ( endsWith( fullHostname, rootPaths[ i ][ 0 ]) ) {
      return rootPaths[ i ][ 1 ];
    }
  }

  return rootPaths.slice( -1 )[ 0 ][ 1 ];
}([
  [
    'cloud.chronicle.com',
    '//s3.amazonaws.com/chronicle-studio-dev/finaid-decisions/'
  ],
  [
    'cloud.philanthropy.com',
    '//s3.amazonaws.com/chronicle-studio-dev/finaid-decisions/'
  ],
  [
    'chronicle.com',
    '//s3.amazonaws.com/chronicle-studio/finaid-decisions/'
  ],
  [
    'philanthropy.com',
    '//s3.amazonaws.com/chronicle-studio/finaid-decisions/'
  ],
  [
    '',
    './'
  ]
]));

document.open();

// Handle things differently depending on whether we're in an outdated browser.
if ( isModernBrowser() ) {
  // Add any modern-browser-only stuff here.
} else {
  $( 'body' ).addClass( 'old-ie' );
  // Add any IE fallback stuff here.
}

// Load the required JS files.
(function() {
  var i,
    len,
    path,
    script;

  for ( i = 0, len = jsPaths.length; i < len; i++ ) {
    path = jsPaths[ i ];
    if ( isAbsolute( path ) ) {
      if ( currentProtocol === 'file:' ) {
        path = 'http:' + path;
      }
    } else {
      path = rootPath + path;
    }
    document.write( '<script src="' + path + '" charset="utf-8"></script>' );
  }
}());

// Load the required CSS files.
(function() {
  var i,
    len,
    path,
    sheet;

  for ( i = 0, len = cssPaths.length; i < len; i++ ) {
    path = cssPaths[ i ];
    if ( isAbsolute( path ) ) {
      if ( currentProtocol === 'file:' ) {
        path = 'http:' + path;
      }
    } else {
      path = rootPath + path;
    }
    document.write( '<link rel="stylesheet" href="' + path + '" />' );
  }
}());

document.close();

// All of this project's files should be loaded at this point. The project's JS
// should take care of resetting the page's jQuery version as needed, and the
// project's JS also should handle further application initialization ($(
// document ).ready handlers, etc.).

}( this ));
