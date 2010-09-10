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
    
    var escapeCharacters = [ ")", "(" ];
    
    var threeCharacterEmoticons = [
      ":-)",
      ":-(",
      ":'("
    ];
    
    var twoCharacterEmoticons = [ // separate these out so that we can add a space between the characters for better proportions
      ":)",
      ":(",
      "=)",
      "=(",
      ":D",
      ":P",
      ":p",
      "=D",
      "=P",
      "XD"
    ];
    
    var specialRegex = new RegExp( '(\\' + escapeCharacters.join('|\\') + ')', 'g' );
    
    for ( var i=threeCharacterEmoticons.length-1; i>=0; --i ){
      threeCharacterEmoticons[i] = threeCharacterEmoticons[i].replace(specialRegex,'\\$1');
      threeCharacterEmoticons[i] = new RegExp( '(' + threeCharacterEmoticons[i] + ')', 'g' );
    }
    
    for ( var i=twoCharacterEmoticons.length-1; i>=0; --i ){
      twoCharacterEmoticons[i] = twoCharacterEmoticons[i].replace(specialRegex,'\\$1');
      twoCharacterEmoticons[i] = new RegExp( 
        '(' + twoCharacterEmoticons[i][0] + ')(' + twoCharacterEmoticons[i].substring(1,twoCharacterEmoticons[i].length) + ')', 'g' 
      );
    }

    return this.each(function() {
      var container = $(this);
      $(threeCharacterEmoticons).each(function(){
        container.html(container.html().replace(this,"<span class='css-emoticon'>$1</span>"));
      });
      $(twoCharacterEmoticons).each(function(){
        container.html(container.html().replace(this,"<span class='css-emoticon'>$1 $2</span>"));
      });
    });
  }

  $.fn.cssEmoticons.defaults = {animate: true}
})(jQuery);