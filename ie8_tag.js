function () {
  showLightBox();
  addStyleSheet('.qb-btn { min-width: 10em; } .qb-close-btn { color: #626262; } .qb-continue-btn { background: #203240; color: white; border-color: #203240; } .qb-info-icon { background-image: url(https://d1m54pdnjzjnhe.cloudfront.net/pngineer/1a000170-0e50-11e7-a34a-4964468dc4d5.png); width: 30px; display: inline-block; height: 30px; margin-right: 1em; } .qb-close-btn { margin-right: 1em; } .qb-buttons-row { text-align: center; border-top: 1px solid gray; margin: 2em -70px 0; padding: 1.5em 0 1em; } .qb-unsupported {position: relative; padding: 40px 70px 10px; color: #555557; } .qb-unsupported-close {position: absolute; color: #555557; top: 0px; right: 0px; padding: 10px; text-decoration: none; font-family: sans-serif; font-size: 25px; font-weight: 100; display: block; height: 20px; width: 20px; text-align: center; line-height: 20px; } .qb-unsupported p.qb-unsupported-heading { margin-top: 0.1em; vertical-align: middle; display: inline-block; font-size: 22px; font-weight: bold; margin-bottom: 1em; } .qb-unsupported p {margin-bottom: 12px; line-height: 25px; } .qb-unsupported-btn {width: 90px; display: block; margin: 15px auto 0; }');
  setCookie('qbIEmsg', 1);
  
  function showLightBox () {

    var $ = window.jQuery;

    var html = [
      '<div class="qb-unsupported">',
        '<div class="qb-unsupported-main">',
          '<div class="qb-info-icon"></div>',
          '<p class="qb-unsupported-heading">Please update your browser</p>',
          '<p>So we can be certain your details are kept safe and secure, we no longer support the browser you’re using.</p>',
          '<p>To continue using our website, please update your browser.</p>',
          '<div class="qb-buttons-row">',
            '<a class="btn standard-btn qb-btn qb-close-btn">Close</a>',
            '<a class="btn standard-btn qb-btn qb-continue-btn" href="http://www.jet2.com/out-of-date-browser">Update now</a>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
    
   $.getScript('https://d1m54pdnjzjnhe.cloudfront.net/pngineer/4f179d10-ef83-11e5-8ea0-ad1e61341871.js').then(function () {
     
      var Lightbox = window.__qubit.lightbox_ie7;
      var lightbox = Lightbox({
        css: {
          width: 650,
          height: 315,
          background: '#f2f2f2'
        },
        html: html
      });

      lightbox.fire();

      lightbox.$el.find('.qb-continue-btn').on('click', function (e) {
        window.__qubit.uv.emit('trInteraction', {
          type: 'click',
          name: 'updateBrowser'
        })
      })

      lightbox.$el.find('.qb-close-btn').on('click', function (e) {
        e.preventDefault();
        window.__qubit.uv.emit('trInteraction', {
          type: 'click',
          name: 'close'
        })
        lightbox.exit();
      })
    })
  }
  
  function setCookie (name, value, days) {
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }
  
  function addStyleSheet(css) {
    var head, styleElement;
    head = document.getElementsByTagName('head')[0];
    styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    if (css instanceof Array) {
      css = css.join("");
    }
    
    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = css;
    } else {
      styleElement.appendChild(document.createTextNode(css));
    }
    
    head.appendChild(styleElement);
    return styleElement;
  }
}