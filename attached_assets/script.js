document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('#primary-navigation');
  const header = document.querySelector('header');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('show');
      header.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
        navMenu.classList.remove('show');
        menuBtn.setAttribute('aria-expanded', false);
        header.classList.remove('menu-open');
      }
    });
  }

  // Header scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('show')) {
          navMenu.classList.remove('show');
          if (menuBtn) {
            menuBtn.setAttribute('aria-expanded', false);
          }
        }
      }
    });
  });

  // Contact form handling with improved validation and submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const submitText = submitBtn.querySelector('.submit-text');
      const spinner = submitBtn.querySelector('.spinner');

      // Show loading state
      submitText.textContent = 'Sending...';
      spinner.classList.remove('hidden');
      submitBtn.disabled = true;

      // Simple validation
      if (!formValues.name || !formValues.email || !formValues.message) {
        alert('Please fill in all required fields.');
        resetFormState();
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formValues.email)) {
        alert('Please enter a valid email address.');
        resetFormState();
        return;
      }

      try {
        // In a real application, you would send this data to a server
        // Using Formspree as an example
        const response = await fetch('https://formspree.io/f/your-form-id', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Show success message
          alert(`Thank you ${formValues.name}! We've received your message and will contact you soon.`);
          contactForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your form. Please try again or contact us directly.');
      } finally {
        resetFormState();
      }

      function resetFormState() {
        submitText.textContent = 'Send Message';
        spinner.classList.add('hidden');
        submitBtn.disabled = false;
      }
    });
  }

  // Testimonial slider functionality
  const testimonialSlider = document.querySelector('.testimonials-slider');
  if (testimonialSlider) {
    let currentSlide = 0;
    const slides = Array.from(testimonialSlider.querySelectorAll('.testimonial-card'));
    const totalSlides = slides.length;
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
        slide.setAttribute('aria-hidden', i !== index);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoRotate();
      });

      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoRotate();
      });
    }

    // Initialize slider
    showSlide(0);

    // Auto-rotate every 5 seconds
    let autoRotate = setInterval(nextSlide, 5000);

    function resetAutoRotate() {
      clearInterval(autoRotate);
      autoRotate = setInterval(nextSlide, 5000);
    }
  }

  // Shopping cart functionality
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.querySelector('.cart-overlay');
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.total-amount');
  const shopBtn = document.querySelector('.shop-btn');
  const closeCartBtn = document.querySelector('.close-cart');
  const checkoutBtn = document.querySelector('.checkout-btn');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartCount = document.querySelector('.cart-count');

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  function updateCartCount() {
    if (cartCount) {
      cartCount.textContent = cartItems.length;
      cartCount.setAttribute('aria-label', `${cartItems.length} items in cart`);
    }
  }

  function renderCartItems() {
    if (!cartItemsContainer) return;

    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
      cartTotal.textContent = '₦0.00';
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cartItems.forEach((item, index) => {
      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      
      // Create elements instead of using innerHTML
      const img = document.createElement('img');
      img.src = item.image || 'images/product-placeholder.jpg';
      img.alt = item.name;
      img.className = 'cart-item-img';
      img.setAttribute('loading', 'lazy');
      
      const detailsDiv = document.createElement('div');
      detailsDiv.className = 'cart-item-details';
      
      const title = document.createElement('h4');
      title.className = 'cart-item-title';
      title.textContent = item.name;
      
      const price = document.createElement('p');
      price.className = 'cart-item-price';
      price.textContent = item.price;
      
      const removeButton = document.createElement('button');
      removeButton.className = 'cart-item-remove';
      removeButton.setAttribute('data-index', index.toString());
      removeButton.textContent = 'Remove';
      
      // Append elements to build the structure
      detailsDiv.appendChild(title);
      detailsDiv.appendChild(price);
      detailsDiv.appendChild(removeButton);
      
      cartItemElement.appendChild(img);
      cartItemElement.appendChild(detailsDiv);
      cartItemsContainer.appendChild(cartItemElement);

      // Extract numeric value from price (e.g., "₦1,500" => 1500)
      const priceValue = parseFloat(item.price.replace(/[^\d.]/g, ''));
      total += priceValue;
    });

    cartTotal.textContent = `₦${total.toLocaleString('en-NG')}`;
    if (checkoutBtn) checkoutBtn.disabled = false;

    // Add event listeners to remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        removeFromCart(index);
      });
    });
  }

  function addToCart(productId, productName, productPrice, productImage) {
    cartItems.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage
    });
    saveCart();
    updateCartCount();
    renderCartItems();
  }

  function removeFromCart(index) {
    cartItems.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCartItems();
  }

  function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  function clearCart() {
    cartItems = [];
    saveCart();
    updateCartCount();
    renderCartItems();
  }

  // Initialize cart
  updateCartCount();
  renderCartItems();

  // Add to cart buttons
  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const product = this.closest('.product-card');
        if (!product) return;
        
        const productId = this.getAttribute('data-id');
        const productName = product.querySelector('h3').textContent;
        const productPrice = product.querySelector('.price').textContent;
        const productImage = product.querySelector('img').src;

        addToCart(productId, productName, productPrice, productImage);
        
        // Show feedback
        const feedback = document.createElement('div');
        feedback.className = 'cart-feedback';
        feedback.textContent = `${productName} added to cart!`;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
          feedback.classList.add('show');
        }, 10);
        
        setTimeout(() => {
          feedback.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(feedback);
          }, 300);
        }, 2000);
      });
    });
  }

  // Cart sidebar toggle
  if (shopBtn) {
    shopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      cartSidebar.classList.add('open');
      cartOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', function() {
      cartSidebar.classList.remove('open');
      cartOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener('click', function() {
      cartSidebar.classList.remove('open');
      this.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      alert('Proceeding to checkout with ' + cartItems.length + ' items');
      // In a real app, redirect to checkout page
      // window.location.href = '/checkout';
    });
  }

  // Scroll to top button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Lazy loading for images
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback for browsers without native lazy loading
    const lazyLoad = function() {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.removeAttribute('loading');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '200px 0px'
      });

      lazyImages.forEach(img => {
        observer.observe(img);
      });
    };

    document.addEventListener('DOMContentLoaded', lazyLoad);
    window.addEventListener('load', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('scroll', lazyLoad);
  }

  // Product filter functionality
  const productFilter = document.createElement('div');
  productFilter.className = 'product-filter';
  productFilter.innerHTML = `
    <button class="filter-btn active" data-filter="all">All Products</button>
    <button class="filter-btn" data-filter="eggs">Eggs</button>
    <button class="filter-btn" data-filter="meat">Meat</button>
    <button class="filter-btn" data-filter="live">Live Birds</button>
  `;
  
  const productsSection = document.querySelector('#products');
  if (productsSection) {
    productsSection.insertBefore(productFilter, productsSection.querySelector('.products-grid'));
    
    const filterButtons = productFilter.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter products
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
          if (filter === 'all') {
            product.style.display = 'block';
          } else {
            const productType = product.getAttribute('data-type');
            product.style.display = productType === filter ? 'block' : 'none';
          }
        });
      });
    });
  }
});

// Add cart feedback styles dynamically
const style = document.createElement('style');
style.textContent = `
  .cart-feedback {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--primary);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10000;
  }
  .cart-feedback.show {
    opacity: 1;
  }
`;
document.head.appendChild(style);
