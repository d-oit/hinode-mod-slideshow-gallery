/* eslint-disable */
{{- $enableZoom := .Site.Params.lightbox.enablezoom -}}
{{- $enableRotate := .Site.Params.lightbox.enableRotate -}}
{{- $disableSliderButtons := .Site.Params.lightbox.disableSliderButtons -}}
{{- $showImageAmount := .Site.Params.lightbox.showImageAmount -}}
{{- $showCloseButton := .Page.Params.lightbox.showCloseButton | default true -}}
/* eslint-enable */

(() => {
  'use strict';

  // Cached DOM selectors and constants
  const FA_NAMESPACE = 'http://www.w3.org/2000/svg';
  const LIGHTBOX_CLASSES = {
    container: 'lightbox-container',
    toolbar: 'lightbox-toolbar',
    image: 'lightbox-image rounded',
    title: 'lightbox-title',
    imageCounter: 'lightbox-image-counter'
  };

  // Utility functions
  const createElementWithClass = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  };

  const createSVGElement = (type, attributes = {}) => {
    const element = document.createElementNS(FA_NAMESPACE, type);
    Object.entries(attributes).forEach(([key, value]) =>
      element.setAttribute(key, value)
    );
    return element;
  };

  const createButton = (className, content) => {
    const button = document.createElement('button');
    button.className = className;
    button.type = 'button';
    button.innerHTML = content;
    return button;
  };

  // Image manipulation helpers
  const getRotationDegrees = (img) => {
    const matrix = window.getComputedStyle(img).transform;
    if (matrix === 'none') return 0;
    const values = matrix.split('(')[1].split(')')[0].split(',');
    const angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle;
  };

  const transformImage = (img, operation) => {
    const operations = {
      zoomIn: () => {
        img.classList.add('fullscreen-image');
        img.style.width = `${img.clientWidth * 1.2}px`;
      },
      zoomOut: () => {
        img.classList.remove('fullscreen-image');
        img.style.width = `${img.clientWidth * 0.8}px`;
      },
      rotateLeft: () => {
        const currentRotation = getRotationDegrees(img);
        img.style.transform = `rotate(${currentRotation - 90}deg)`;
      },
      rotateRight: () => {
        const currentRotation = getRotationDegrees(img);
        img.style.transform = `rotate(${currentRotation + 90}deg)`;
      }
    };
    operations[operation]();
  };

  // Lightbox navigation
  const getLightboxImages = () => {
    const lightboxImages = document.querySelectorAll('img.lightbox');
    return Array.from(lightboxImages).filter(
      (img, index, arr) => arr.findIndex((item) => item.src === img.src) === index
    );
  };

  const updateNavigationButtons = (currentImg, prevButton, nextButton, counterElement) => {
    const images = getLightboxImages();
    const currentIndex = images.findIndex(img => img && img.src === currentImg.src);

    prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
    nextButton.style.display = currentIndex === images.length - 1 ? 'none' : 'block';

    {{ if $showImageAmount }}
    if (counterElement) {
      counterElement.textContent = `${currentIndex + 1}/${images.length}`;
    }
    {{ end }}
  };

  const navigateImage = (currentImg, direction) => {
    try {
      const lightboxContainer = currentImg.closest(`.${LIGHTBOX_CLASSES.container}`);
      const images = getLightboxImages();
      const currentIndex = images.findIndex(img => img && img.src === currentImg.src);
      const newIndex = currentIndex + direction;
  
      if (newIndex >= 0 && newIndex < images.length && images[newIndex]) {
        const newImage = createLightboxImage(images[newIndex]);
  
        if (lightboxContainer && newImage) {
          // Remove existing title if present
          const existingTitle = lightboxContainer.querySelector(`.${LIGHTBOX_CLASSES.title}`);
          if (existingTitle) {
            lightboxContainer.removeChild(existingTitle);
          }
  
          // Replace the image
          lightboxContainer.replaceChild(newImage, currentImg);
  
          // Recreate and append the title
          const titleElement = createImageTitle(newImage);
          if (titleElement) {
            lightboxContainer.appendChild(titleElement);
          }
  
          // Reattach controls
          attachLightboxControls(lightboxContainer, newImage);
        }
      }
    } catch (error) {
      console.error('Image navigation error:', error);
    }
  };

  // Swipe and keyboard navigation
  const addSwipeAndKeyboardNavigation = (lightboxContainer, currentImg) => {
    let touchStartX = 0;
    let touchEndX = 0;

    // Touch events for mobile swipe
    lightboxContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);

    lightboxContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe(currentImg);
    }, false);

    // Keyboard navigation
    const handleKeyNavigation = (e) => {
      const lightboxContainer = currentImg.closest(`.${LIGHTBOX_CLASSES.container}`);
      if (lightboxContainer && lightboxContainer instanceof Node) {
      const controls = {
        prev: lightboxContainer.querySelector('.prev-button'),
        next: lightboxContainer.querySelector('.next-button'), 
        {{ if $showImageAmount }}
        counter: lightboxContainer.querySelector(`.${LIGHTBOX_CLASSES.imageCounter}`),
        {{ end }}
      };

      switch(e.key) {
        case 'ArrowRight':
          navigateImage(currentImg, 1);
          break;
        case 'ArrowLeft':
          navigateImage(currentImg, -1);
          break;
        case 'Escape':          
          document.body.removeChild(lightboxContainer);      
          document.removeEventListener('keydown', handleKeyNavigation);
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyNavigation);

    function handleSwipe(img) {
      const swipeThreshold = 50;
      const swipeDistance = touchEndX - touchStartX;

      if (swipeDistance > swipeThreshold) {
        // Swipe right (previous image)
        navigateImage(img, -1);
      } else if (swipeDistance < -swipeThreshold) {
        // Swipe left (next image)
        navigateImage(img, 1);
      }
    }
  };

  // Create image title
  const createImageTitle = (lightboxImage) => {
    const title = lightboxImage.getAttribute('alt');
  
    if (!title) return null;
  
    const titleDiv = createElementWithClass('div', LIGHTBOX_CLASSES.title);
    
    // Split the title by newline
    const titleLines = title.split('\n');
    
    titleLines.forEach((line, index) => {
      const titleSpan = document.createElement('span');
      titleSpan.classList.add('title-caption');
      
      // First line bold, subsequent lines small
      if (index === 0) {
        titleSpan.classList.add('first-line');
      } else {
        titleSpan.classList.add('additional-lines');
      }
      
      titleSpan.textContent = line.trim();
      titleDiv.appendChild(titleSpan);
    });
  
    return titleDiv;
  };

  // Create lightbox image
  const createLightboxImage = (img) => {
    const lightboxImage = img.cloneNode(true);
    lightboxImage.className = LIGHTBOX_CLASSES.image;
    return lightboxImage;
  };

  // Show lightbox
  const showLightbox = (img) => {
    try {
      const lightbox = createElementWithClass('div', LIGHTBOX_CLASSES.container);
      const lightboxImage = createLightboxImage(img);
      const toolbar = createElementWithClass('div', LIGHTBOX_CLASSES.toolbar);

      const controls = {
        {{ if $enableZoom }}
        zoomIn: createButton('zoom-in-button', '+'),
        zoomOut: createButton('zoom-out-button', '-'),
        {{ end }}
        {{ if $enableRotate }}
        rotateLeft: createButton('rotate-left-button', '⟲'),
        rotateRight: createButton('rotate-right-button', '⟳'),
        {{ end }}
        {{ if $showCloseButton }}
        close: createButton('close-button', '&times;'),
        {{ end }}
        prev: createButton('prev-button btn', '&larr;'),
        next: createButton('next-button btn', '&rarr;')
      };

      // Append toolbar controls
      Object.values(controls).forEach(control => {
        if (control) toolbar.appendChild(control);
      });

      // Add image counter
      {{ if $showImageAmount }}
      const imageCounter = createElementWithClass('div', LIGHTBOX_CLASSES.imageCounter);
      lightbox.appendChild(imageCounter);
      {{ end }}

      lightbox.appendChild(lightboxImage);
      lightbox.appendChild(toolbar);

      // Add title if exists
      const titleElement = createImageTitle(lightboxImage);
      if (titleElement) {
        lightbox.appendChild(titleElement);
      }

      // Add navigation containers
      {{ if not $disableSliderButtons }}
      const slidePrevious = createElementWithClass('div', 'slide-lightbox-container slide-btn-container-previous');
      const slideNext = createElementWithClass('div', 'slide-lightbox-container slide-btn-container-next');
      slidePrevious.appendChild(controls.prev);
      slideNext.appendChild(controls.next);
      lightbox.appendChild(slidePrevious);
      lightbox.appendChild(slideNext);
      {{ end }}

      // Add swipe and keyboard navigation
      addSwipeAndKeyboardNavigation(lightbox, lightboxImage);

      document.body.appendChild(lightbox);

      // Attach event listeners
      const attachClosing = (element) => {
        element.addEventListener('click', (e) => {
          if (e.target === lightbox || e.target === controls.close) {
            document.body.removeChild(lightbox);
          }
        });
      };

      attachClosing(lightbox);
      attachLightboxControls(lightbox, lightboxImage);
    } catch (error) {
      console.error('Lightbox creation error:', error);
    }
  };

  // Attach lightbox controls
  const attachLightboxControls = (lightboxContainer, lightboxImage) => {
    const controls = {
      {{ if $enableZoom }}
      zoomIn: lightboxContainer.querySelector('.zoom-in-button'),
      zoomOut: lightboxContainer.querySelector('.zoom-out-button'),
      {{ end }}
      {{ if $enableRotate }}
      rotateLeft: lightboxContainer.querySelector('.rotate-left-button'),
      rotateRight: lightboxContainer.querySelector('.rotate-right-button'),
      {{ end }}
      prev: lightboxContainer.querySelector('.prev-button'),
      next: lightboxContainer.querySelector('.next-button'),
      {{ if $showImageAmount }}
      counter: lightboxContainer.querySelector(`.${LIGHTBOX_CLASSES.imageCounter}`),
      {{ end }}

      
    };

    updateNavigationButtons(
      lightboxImage,
      controls.prev,
      controls.next,
      {{ if $showImageAmount }}controls.counter{{ end }}
    );

    {{ if $enableZoom }}
    if (controls.zoomIn) controls.zoomIn.addEventListener('click', () => transformImage(lightboxImage, 'zoomIn'));
    if (controls.zoomOut) controls.zoomOut.addEventListener('click', () => transformImage(lightboxImage, 'zoomOut'));
    {{ end }}

    {{ if $enableRotate }}
    if (controls.rotateLeft) controls.rotateLeft.addEventListener('click', () => transformImage(lightboxImage, 'rotateLeft'));
    if (controls.rotateRight) controls.rotateRight.addEventListener('click', () => transformImage(lightboxImage, 'rotateRight'));
    {{ end }}

    if (controls.prev) controls.prev.addEventListener('click', () => navigateImage(lightboxImage, -1));
    if (controls.next) controls.next.addEventListener('click', () => navigateImage(lightboxImage, 1));

    // Add swipe and keyboard navigation
    addSwipeAndKeyboardNavigation(lightboxContainer, lightboxImage);
    
  };

  // Initialize lightbox event listeners
  window.addEventListener('DOMContentLoaded', () => {
    const lightboxIcons = document.querySelectorAll('.lightbox-icon');
    const images = getLightboxImages();

    lightboxIcons.forEach((icon) => {
      icon.addEventListener('click', (event) => {
        const img = icon.closest('.image-wrapper')?.querySelector('img');
        if (img) {
          showLightbox(img);
          event.stopPropagation();
        }
      });
    });

    images.forEach((img) => {
      img.addEventListener('click', () => showLightbox(img));
    });
  });
})();