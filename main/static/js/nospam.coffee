# Usage:
# <span class="js-hidden-eml" data-user="nohj" data-website="moc.liamg"></span>
#
if !window._phantom && !window.callPhantom && !window.__phantomas && !window.Buffer && !window.emit && !window.spawn && !window.webdriver && !window.domAutomation && window.outerWidth != 0 && window.outerHeight != 0 && !window.callPhantom
  reverse = (s)->
    return s.split("").reverse().join("")
  $(()->
    $('.js-hidden-eml').each((i, elem)->
      elem = $(elem)
      l = elem.attr('data-user');
      h = elem.attr('data-website');

      eml = reverse(l) + '@' + reverse(h);
      elem.replaceWith('<a href="mai' + 'lto:' + eml + '">' + eml + '</a>')
    )
  )
