document.addEventListener('DOMContentLoaded', function () {
  // Add smooth scrolling to links with the "scroll-link" class
  var scrollLinks = document.querySelectorAll('.scroll-link');
  
  scrollLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      var targetId = this.getAttribute('href').substring(1);
      var targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    });
  });
});