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

    const thumbnailsContainer = slideshowGalleryContainer.querySelector('.slideshow-thumbnail-row')
    if (!thumbnailsContainer) {
        throw new Error('Thumbnails container not found')
    }

    const prevButton = document.querySelector('.slideshow-prev-button')
    if (!prevButton) {
        throw new Error('Previous button not found')
    }

    const nextButton = document.querySelector('.slideshow-next-button')
    if (!nextButton) {
        throw new Error('Next button not found')
    }

    const fullscreenButton = slideshowGalleryContainer.querySelector('.slideshow-fullscreen-button')
    if (!fullscreenButton) {
        throw new Error('Fullscreen button not found')
    }

    const currentIndexSpan = slideshowGalleryContainer.querySelector('.lightbox-current-index')
    if (!currentIndexSpan) {
        throw new Error('Current index span not found')
    }

    const slideshowCaptionContainer = slideshowGalleryContainer.querySelector('.slideshow-caption-container')
    if (!slideshowCaptionContainer) {
        throw new Error('slideshowCaptionContainer span not found')
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
        const closeButton = slideshowGalleryContainer.querySelector('.slideshow-close-button')
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

        const imageTitle = lightboxImages[currentImageIndex]?.alt?.trim()

        if (imageTitle) {
            // Clear previous captions (if any)
            slideshowCaptionContainer.innerHTML = ''

            imageTitle.split('\n').forEach((line, index) => {
                const titleSpan = document.createElement('span')
                titleSpan.className = index === 0 ? 'title-caption first-line' : 'title-caption additional-lines'
                titleSpan.textContent = line.trim()
                slideshowCaptionContainer.appendChild(titleSpan)
            })
        }
    }

    // Utility functions
    const createElementWithClass = (tag, className) => {
        const element = document.createElement(tag)
        element.className = className
        return element
    }

    // Add event listeners for arrow keys
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length
            updateLightbox()
        } else if (event.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % lightboxImages.length
            updateLightbox()
        }
    })

    // Add event listeners for swipe gestures
    let touchStartX = 0
    let touchEndX = 0

    slideshowGalleryContainer.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX
    })

    slideshowGalleryContainer.addEventListener('touchmove', (event) => {
        touchEndX = event.touches[0].clientX
    })

    slideshowGalleryContainer.addEventListener('touchend', () => {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            currentImageIndex = (currentImageIndex + 1) % lightboxImages.length
            updateLightbox()
        } else if (touchStartX - touchEndX < -50) {
            // Swipe right
            currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length
            updateLightbox()
        }
    })

    updateLightbox()

} catch (error) {
    console.error('Error initializing slideshow gallery:', error)
}
