const wintermellonButtons1 = document.querySelectorAll('.bs1-size1');
const wintermellonButtons2 = document.querySelectorAll('.bs1-size2');
const okinawa1 = document.querySelectorAll('.bs2-size1');
const okinawa2 = document.querySelectorAll('.bs2-size2');
const oreocremecheese1 = document.querySelectorAll('.bs3-size1');
const oreocremecheese2 = document.querySelectorAll('.bs3-size2');

wintermellonButtons1.forEach(function(btn) {
    btn.addEventListener("click", function() {
        console.log("Wintermellon-16oz clicked");

        // Reset background color for all buttons
        wintermellonButtons1,wintermellonButtons2.forEach(function(innerBtn) {
            innerBtn.classList.remove('selected');
            innerBtn.style.backgroundColor = 'white';
            innerBtn.style.color = '#15154E';
        });

        // Add 'selected' class and change background color to the clicked button
        btn.classList.add('selected');
        btn.style.backgroundColor = '#15154E';
        btn.style.color = 'white';    });
});

wintermellonButtons2.forEach(function(btn) {
  btn.addEventListener("click", function() {
      console.log("Wintermellon-22oz clicked");

      // Reset background color for all buttons
      wintermellonButtons2,wintermellonButtons1.forEach(function(innerBtn) {
          innerBtn.classList.remove('selected');
          innerBtn.style.backgroundColor = 'white';
          innerBtn.style.color = '#15154E';
      });

      // Add 'selected' class and change background color to the clicked button
      btn.classList.add('selected');
      btn.style.backgroundColor = '#15154E';
      btn.style.color = 'white';
  });
});

okinawa1.forEach(function(btn) {
    btn.addEventListener("click", function() {
        console.log("Okinawa-16oz clicked");

        // Reset background color for all buttons
        okinawa1,okinawa2.forEach(function(innerBtn) {
            innerBtn.classList.remove('selected');
            innerBtn.style.backgroundColor = 'white';
            innerBtn.style.color = '#15154E';
        });

        // Add 'selected' class and change background color to the clicked button
        btn.classList.add('selected');
        btn.style.backgroundColor = '#15154E';
        btn.style.color = 'white';
    });
});

okinawa2.forEach(function(btn) {
  btn.addEventListener("click", function() {
      console.log("Okinawa-22oz clicked");

      // Reset background color for all buttons
      okinawa2,okinawa1.forEach(function(innerBtn) {
          innerBtn.classList.remove('selected');
          innerBtn.style.backgroundColor = 'white';
          innerBtn.style.color = '#15154E';
      });

      // Add 'selected' class and change background color to the clicked button
      btn.classList.add('selected');
      btn.style.backgroundColor = '#15154E';
      btn.style.color = 'white';
  });
});

oreocremecheese1.forEach(function(btn) {
    btn.addEventListener("click", function() {
        console.log("Oreo Cremecheese-16oz clicked");

        // Reset background color for all buttons
        oreocremecheese1,oreocremecheese2.forEach(function(innerBtn) {
            innerBtn.classList.remove('selected');
            innerBtn.style.backgroundColor = 'white';
            innerBtn.style.color = '#15154E';
        });

        // Add 'selected' class and change background color to the clicked button
        btn.classList.add('selected');
        btn.style.backgroundColor = '#15154E';
        btn.style.color = 'white';    
      });
});

oreocremecheese2.forEach(function(btn) {
  btn.addEventListener("click", function() {
      console.log("Oreo Cremecheese-22oz clicked");

      // Reset background color for all buttons
      oreocremecheese2,oreocremecheese1.forEach(function(innerBtn) {
          innerBtn.classList.remove('selected');
          innerBtn.style.backgroundColor = 'white';
          innerBtn.style.color = '#15154E';
    });

      // Add 'selected' class and change background color to the clicked button
      btn.classList.add('selected');
      btn.style.backgroundColor = '#15154E';
      btn.style.color = 'white';  });
});


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

function performSearch() {
  var searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

  // Check if the search term is not empty
  if (searchTerm !== '') {
    var flavorContainers = document.querySelectorAll('.txtformat');

    // Remove existing highlights
    var elements = document.querySelectorAll('.highlight');
    elements.forEach(function (element) {
      element.classList.remove('highlight');
    });

    flavorContainers.forEach(function (container) {
      var flavorText = container.textContent.toLowerCase();

      if (flavorText.includes(searchTerm)) {
        container.classList.add('highlight');

        container.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
}

function toggleCart() {
  console.log("working");
  const cartContainer = document.querySelector('.cart-container');
  const cartContainerStyle = window.getComputedStyle(cartContainer);
  const isOpen = cartContainerStyle.getPropertyValue('right') === '0px' || cartContainerStyle.getPropertyValue('right') === '';

  if (isOpen) {
    cartContainer.style.right = '-380px';
  } else {
    cartContainer.style.right = '0px';
  }
}
