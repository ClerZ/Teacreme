document.addEventListener('DOMContentLoaded', function () {
    const contentDiv = document.getElementById('content');
    const links = document.querySelectorAll('.page-link');
  
    function loadPage(url) {
      // Fade out animation
      contentDiv.classList.add('fade-out');
      contentDiv.addEventListener('transitionend', function () {
        fetch(url)
          .then(response => response.text())
          .then(html => {
            contentDiv.innerHTML = html;
            contentDiv.classList.remove('fade-out');
            contentDiv.classList.add('fade-in');
          });
      }, { once: true });
    }
  
    function handleClick(event) {
      event.preventDefault();
      const url = event.target.getAttribute('href');
      loadPage(url);
    }
  
    links.forEach(link => link.addEventListener('click', handleClick));
  });
  