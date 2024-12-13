window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const slideshowGalleryContainer = document.querySelector('.slideshow-gallery');
    const lightboxImagesContainer = slideshowGalleryContainer.querySelector('.slideshow-lightbox-container');
    const thumbnailsContainer = slideshowGalleryContainer.querySelector('.slgrow'); // Corrected the class name
    const prevButton = document.querySelector('.slgprev');
    const nextButton = document.querySelector('.slgnext');
    const currentIndexSpan = slideshowGalleryContainer.querySelector('.lightbox-current-index');
    const titleSpan = slideshowGalleryContainer.querySelector('.lightbox-title');

    const lightboxImages = Array.from(lightboxImagesContainer.querySelectorAll('img'));
    const thumbnails = Array.from(thumbnailsContainer.querySelectorAll('img'));

    let currentImageIndex = 0;

    // Add event listeners
    prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightbox();
    });

    nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
        updateLightbox();
    });

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightbox();
        });
    });

    // Function to update the lightbox display
    function updateLightbox() {
        lightboxImages.forEach((image, index) => {
            if (index === currentImageIndex) {
                image.classList.add('active');
            } else {
                image.classList.remove('active');
            }
        });

        thumbnails.forEach((thumbnail, index) => {
            if (index === currentImageIndex) {
                thumbnail.classList.add('active');
            } else {
                thumbnail.classList.remove('active');
            }
        });

        currentIndexSpan.textContent = `${currentImageIndex + 1} / ${lightboxImages.length}`;
        titleSpan.textContent = lightboxImages[currentImageIndex].alt;
    }

    updateLightbox();
});
