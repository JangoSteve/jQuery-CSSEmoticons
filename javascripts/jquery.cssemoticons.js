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
    
    var escapeCharacters = [ ")", "(", "*", "[", "]", "{", "}", "|", "^", "<", ">", "\\", "?" ];
    
    var threeCharacterEmoticons = [
      ":-)", ":o)", ":c)", ":^)", ":-D", ":-(", ":-9", ";-)", ":-P", ":-p", ":-Þ", ":-b", ":-O", ":-/", ":-X", ":-#", ":'(", "B-)", "8-)", ";*(", ":-*", ":-\\",
      "?-)" // <== This is my own invention, it's a smiling pirate (with an eye-patch)!
    ];
    
    var twoCharacterEmoticons = [ // separate these out so that we can add a space between the characters for better proportions
      ":)", ":]", "=]", "=)", "8)", ":}", ":D", "8D", "XD", "xD", "=D", ":(", ":[", ":{", "=(", ";)", ";]", ";D", ":P", ":p", "=P", "=p", ":b", ":Þ", ":O", "8O", ":/", "=/", ":S", ":#", ":X", "B)", ":|", ":\\", "=\\", ":*", ":&gt;", ":&lt;"//, "*)"
    ];
    
    var specialEmoticons = { // emoticons to be treated with a special class, hash specifies the additional class to add, along with standard css-emoticon class
      "&gt;:)": { cssClass: "red small" },
      "&gt;;)": { cssClass: "red small"},
      "&gt;:(": { cssClass: "red small" },
      ";(":     { cssClass: "red" },
      "&lt;3":  { cssClass: "pink counter-rotated" },
      "O_O":    { cssClass: "no-rotate" },
      "o_o":    { cssClass: "no-rotate" },
      //"OwO":  { cssClass: "no-rotate" }, // these emoticons overflow and look weird even if they're made even smaller, could probably fix this with some more css trickery
      //"O-O":  { cssClass: "no-rotate" },
      "0_o":    { cssClass: "no-rotate" },
      "O_o":    { cssClass: "no-rotate" },
      "T_T":    { cssClass: "no-rotate" },
      "^_^":    { cssClass: "no-rotate" }
    }
    
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
    
    for ( var emoticon in specialEmoticons ){
      specialEmoticons[emoticon].regexp = emoticon.replace(specialRegex,'\\$1');
      specialEmoticons[emoticon].regexp = new RegExp( '(' + specialEmoticons[emoticon].regexp + ')', 'g' );
    }

    return this.each(function() {
      var container = $(this);
      var cssClass = 'css-emoticon'
      if(opts.animate){ cssClass += ' un-transformed-emoticon animated-emoticon'; }
      for( var emoticon in specialEmoticons ){
        specialCssClass = cssClass + " " + specialEmoticons[emoticon].cssClass;
        container.html(container.html().replace(specialEmoticons[emoticon].regexp,"<span class='" + specialCssClass + "'>$1</span>"));
      }
      $(threeCharacterEmoticons).each(function(){
        container.html(container.html().replace(this,"<span class='" + cssClass + "'>$1</span>"));
      });                                                          
      $(twoCharacterEmoticons).each(function(){                    
        container.html(container.html().replace(this,"<span class='" + cssClass + "'>$1 $2</span>"));
      });
      // fix emoticons that got matched more then once (where one emoticon is a subset of another emoticon), and thus got nested spans
      $('span.css-emoticon > span.css-emoticon').each(function(){
        $(this).parent().html($(this).parent().text());
      });
      setTimeout(function(){$('.un-transformed-emoticon').removeClass('un-transformed-emoticon');}, 800);
    });
  }

  $.fn.cssEmoticons.defaults = {animate: true}
})(jQuery);