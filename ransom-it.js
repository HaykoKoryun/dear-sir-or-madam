(function()
{
  function ransom(targets)
  {
    var targetsquery = '';

    if(typeof targets != 'undefined' && $.isArray(targets))
    {
      var comma = "";
      for(var i = 0; i < targets.length; ++i)
      {
        targetsquery += comma + targets[i];

        comma = ",";
      }
    }

    $('body :not(iframe)').filter(":not(.ransomed)").filter(targetsquery).contents().filter(function() {
      return (this.nodeType == 3) && this.nodeValue.match(/\S/);
    }).wrap("<span class='ransom-it'></span>");

    var elements = $('.ransom-it');

    // Tokenize the text and apply the style to each letter.
    for (var e = 0; e < elements.length; e++) {
      container = $(elements[e]);
      text = elements[e].innerHTML;
      container.empty();
      for (var i = 0; i < text.length; i++ ) {
        node = $('<span class="ransomed"></span>');
        letter = text.charAt(i);
        if ( letter != ' ') {
          node.css(styleIt());
        } else {
          node.css('margin', '0 10px 0 10px');
        }
        node.text(letter);
        container.append(node);
      }
      container.children().first().unwrap();
    }

    $(targetsquery).addClass("ransomed");
  }

  var text, node, letter, container;

  function styleIt() {
    var fontsize = fontSize();
    var bright = flip();
    var padding = fontSize <= 20 ? '0px 10px' : '0px 5px';
    var rotation = (-4 + 8 * Math.random());
    return {'margin' : '3px 2px 3px 2px',
            'padding' : padding,
            'text-align' : 'center',
            'background-color' : background(bright),
            'color' : foreground(bright),
            'font-size' : fontsize + 'px',
            'line-height' : fontsize + 15 + 'px',
            'font-family' : font(),
            'text-transform' : textCase(),
            'font-weight' : fontWeight(),
            'font-style' : flip() ? 'italic' : 'normal',
            'display': 'inline-block',
            'transform': 'rotate(' + rotation + 'deg)'
          };
  }

  function flip() {
    return Math.floor(Math.random() * 2);
  }

  function background(brightBackground) {
    var r = Math.floor(Math.random() * (254)),
        g = Math.floor(Math.random() * (254)),
        b = Math.floor(Math.random() * (254)),
        a = brightBackground ? 1 : 0.5;
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  }

  function foreground(brightBackground) {
    var max = brightBackground ? 254 : 200;
    var min = brightBackground ? 154 : 0;
    var r = Math.floor(Math.random() * (max - min) + min),
        g = Math.floor(Math.random() * (max - min) + min),
        b = Math.floor(Math.random() * (max - min) + min);
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  function fontSize() {
    return Math.floor((Math.random() * 10) + 16);
  }

  function fontWeight() {
    var weights = ['lighter', 'normal', 'bold', 'bolder'];
    return weights[Math.floor(Math.random() * 5)];
  }
  function font() {
    var fonts = ['serif', 'sans-serif', 'monospace', 'Comic Sans'];
    return fonts[Math.floor(Math.random() * 5)];
  }

  function textCase() {
    return flip() ? 'lowercase' : 'uppercase';
  }

  window.ransom = ransom;
})();
