/*
 * jQuery CSSEmoticons plugin 0.1
 *
 * Copyright (c) 2010 Steve Schwartz (JangoSteve)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: Fri Sep 10 01:02:00 2010 -0500
 */
(function($) {
  $.fn.cssEmoticons = function(options) {

    var opts = $.extend({}, $.fn.cssEmoticons.defaults, options);

    return this.each(function() {
      var container = $(this);
      
    });

  }

  $.fn.cssEmoticons.defaults = {animate: true}
})(jQuery);