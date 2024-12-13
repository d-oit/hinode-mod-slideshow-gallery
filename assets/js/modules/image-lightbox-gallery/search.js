document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('gallery-search-input')
  if (searchInput === null) return
  const searchSuggestions = document.getElementById('gallery-search-suggestions-id')
  const galleryItems = document.querySelectorAll('.gallery-item')

  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase()
    if (query === '') return
    const suggestions = []

    galleryItems.forEach(item => {
      const title = item.dataset.imageTitle !== undefined ? item.dataset.imageTitle : ''
      const tags = item.dataset.imageTags !== undefined ? item.dataset.imageTags : ''
      const subject = item.dataset.imageSubject !== undefined ? item.dataset.imageSubject : ''
      const description = item.dataset.imageDescription !== undefined ? item.dataset.imageDescription : ''
      const permalink = item.dataset.imagePermalink
      if (title.includes(query) || subject.includes(query) | tags.includes(query) || description.includes(query)) {
        suggestions.push(`<a href="${permalink}">${title}</a>`)
      }
    })
    searchSuggestions.innerHTML = suggestions.join('\n')
  })
})
