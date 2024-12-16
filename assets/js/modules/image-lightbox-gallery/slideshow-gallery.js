{{- $showSlideshowGallery := .Page.Params.showSlideshowGallery | default .Site.Params.showSlideshowGallery -}}

{{ if $showSlideshowGallery }}

'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const slideshowGalleryContainer = document.querySelector('.slideshow-gallery');
    if(slideshowGalleryContainer == null) return;
    const lightboxImagesContainer = slideshowGalleryContainer.querySelector('.slideshow-lightbox-container');
    const thumbnailsContainer = slideshowGalleryContainer.querySelector('.slgrow');
    const prevButton = document.querySelector('.slgprev');
    const nextButton = document.querySelector('.slgnext');
    const fullscreenButton = slideshowGalleryContainer.querySelector('.slgfullscreen');
    const currentIndexSpan = slideshowGalleryContainer.querySelector('.lightbox-current-index');
    const titleSpan = slideshowGalleryContainer.querySelector('.lightbox-title');

    const lightboxImages = Array.from(lightboxImagesContainer.querySelectorAll('img'));
    const thumbnails = Array.from(thumbnailsContainer.querySelectorAll('img'));

    let currentImageIndex = 0;
    let isFullscreen = false;

    // Function to toggle fullscreen class
    function toggleFullscreen() {
        isFullscreen = !isFullscreen;
        if (isFullscreen) {
            slideshowGalleryContainer.classList.add('fullscreen');
            fullscreenButton.textContent = '🗗';
        } else {
            slideshowGalleryContainer.classList.remove('fullscreen');
            fullscreenButton.textContent = '🗖';
        }
        updateLightbox();
    }

    // Add event listener for fullscreen button
    fullscreenButton.addEventListener('click', toggleFullscreen);

    // Add event listener for ESC key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isFullscreen) {
            toggleFullscreen();
        }
    });


    // Function to remove close button
    function removeCloseButton() {
        const closeButton = slideshowGalleryContainer.querySelector('.slgclose');
        if (closeButton) {
            slideshowGalleryContainer.removeChild(closeButton);
        }
    }

    // Add event listeners for navigation buttons
    prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightbox();
    });

    nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
        updateLightbox();
    });

    // Add event listeners for thumbnails
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

{{ end }}