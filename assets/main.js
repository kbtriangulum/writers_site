document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) {
      return;
    }

    var url;
    try {
      url = new URL(href, window.location.href);
    } catch (error) {
      return;
    }

    var isWebLink = url.protocol === 'http:' || url.protocol === 'https:';
    var isExternal = isWebLink && url.origin !== window.location.origin;
    if (isExternal) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    } else {
      link.removeAttribute('target');
      link.removeAttribute('rel');
    }
  });

  var page = document.body.getAttribute('data-page');
  document.querySelectorAll('.nav a').forEach(function (link) {
    if (link.getAttribute('data-page') === page) link.classList.add('active');
  });

  document.querySelectorAll('.accordion-trigger').forEach(function (button) {
    button.addEventListener('click', function () {
      var item = button.closest('.accordion-item');
      item.classList.toggle('open');
    });
  });

  var menu = document.querySelector('.mobile-menu');
  if (menu) {
    menu.addEventListener('click', function () {
      document.body.classList.toggle('menu-open');
    });
  }
});
