'use strict'

try {
    const slideshowGalleryContainer = document.querySelector('.slideshow-gallery')
    if (!slideshowGalleryContainer) {
        throw new Error('Slideshow gallery container not found')
    }

    const lightboxImagesContainer = slideshowGalleryContainer.querySelector('.slideshow-lightbox-container')
    if (!lightboxImagesContainer) {
        throw new Error('Lightbox images container not found')
    }

    const thumbnailsContainer = slideshowGalleryContainer.querySelector('.slgrow')
    if (!thumbnailsContainer) {
        throw new Error('Thumbnails container not found')
    }

    const prevButton = document.querySelector('.slgprev')
    if (!prevButton) {
        throw new Error('Previous button not found')
    }

    const nextButton = document.querySelector('.slgnext')
    if (!nextButton) {
        throw new Error('Next button not found')
    }

    const fullscreenButton = slideshowGalleryContainer.querySelector('.slgfullscreen')
    if (!fullscreenButton) {
        throw new Error('Fullscreen button not found')
    }

    const currentIndexSpan = slideshowGalleryContainer.querySelector('.lightbox-current-index')
    if (!currentIndexSpan) {
        throw new Error('Current index span not found')
    }


    const slgcaptionContainer = slideshowGalleryContainer.querySelector('.slgcaption-container')
    if (!slgcaptionContainer) {
        throw new Error('slgcaptionContainer span not found')
    }

    const lightboxImages = Array.from(lightboxImagesContainer.querySelectorAll('img'))
    const thumbnails = Array.from(thumbnailsContainer.querySelectorAll('img'))

    let currentImageIndex = 0
    let isFullscreen = false

    // Function to toggle fullscreen class
    function toggleFullscreen() {
        isFullscreen = !isFullscreen
        if (isFullscreen) {
            slideshowGalleryContainer.classList.add('fullscreen')
            fullscreenButton.textContent = '🗗'
        } else {
            slideshowGalleryContainer.classList.remove('fullscreen')
            fullscreenButton.textContent = '🗖'
        }
        updateLightbox()
    }

    // Add event listener for fullscreen button
    fullscreenButton.addEventListener('click', toggleFullscreen)

    // Add event listener for ESC key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isFullscreen) {
            toggleFullscreen()
        }
    })

    // Function to remove close button
    function removeCloseButton() {
        const closeButton = slideshowGalleryContainer.querySelector('.slgclose')
        if (closeButton) {
            slideshowGalleryContainer.removeChild(closeButton)
        }
    }

    // Add event listeners for navigation buttons
    prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length
        updateLightbox()
    })

    nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % lightboxImages.length
        updateLightbox()
    })

    // Add event listeners for thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index
            updateLightbox()
        })
    })

    // Function to update the lightbox display
    function updateLightbox() {
        lightboxImages.forEach((image, index) => {
            if (index === currentImageIndex) {
                image.classList.add('active')
            } else {
                image.classList.remove('active')
            }
        })

        thumbnails.forEach((thumbnail, index) => {
            if (index === currentImageIndex) {
                thumbnail.classList.add('active')
            } else {
                thumbnail.classList.remove('active')
            }
        })

        currentIndexSpan.textContent = `${currentImageIndex + 1} / ${lightboxImages.length}`

        const imageTitle = lightboxImages[currentImageIndex].alt
       
        if(imageTitle) {
            // Split the title by newline
            const titleLines = imageTitle.split('\n');
            titleLines.forEach((line, index) => {
                const titleSpan = document.createElement('span');
                titleSpan.classList.add('title-caption');
                // First line bold, subsequent lines small
                if (index === 0) {
                    titleSpan.classList.add('first-line');
                } else {
                    titleSpan.classList.add('additional-lines');
                }
                
                titleSpan.textContent = line.replace('\n','').trim();
                slgcaptionContainer.appendChild(titleSpan);
                
            });
        }
    }

    // Utility functions
    const createElementWithClass = (tag, className) => {
        const element = document.createElement(tag);
        element.className = className;
        return element;
    };

    updateLightbox()

    
} catch (error) {
    console.error('Error initializing slideshow gallery:', error)
}
