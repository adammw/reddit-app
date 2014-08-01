(function($) {
  'use strict';

  var displayPost = function(post, imageUrl) {
    var $post = $('<div class="post loading"><a href="' + post.url + '"><img src="' + imageUrl + '"><span class="title">' + post.title + '</span></a></div>');
    $post.imagesLoaded( function() {
      $post.removeClass('loading');
    });
    $post.appendTo('main');
  };
  $.getJSON('http://www.reddit.com/r/adviceanimals/hot.json', function(data) {
    data.data.children.filter(function(post){
      return post.kind === 't3';
    }).map(function(data) {
      return data.data;
    }).forEach(function(post) {
      switch(post.domain) {
        case 'i.imgur.com':
        case 'imgur.com':
          var m;
          if ((m = /^https?:\/\/(?:i\.)?imgur.com\/([^\/]+?)(\..+?)?$/.exec(post.url))) {
            displayPost(post, 'http://i.imgur.com/' + m[1] + '.png');
          }
          break;
        case 'livememe.com':
          displayPost(post, post.url);
          break;
        default:
          console.log('unhandled domain:', post.domain, post.url);
      }
    });
  });
})(window.jQuery);
