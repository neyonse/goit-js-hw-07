import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

function createGalleryMarkup(data) {
  return data
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
          <a class="gallery__link" href='${original}'>
            <img
              class="gallery__image"
              src='${preview}'
              alt='${description}'
            />
          </a>
        </li>`;
    })
    .join('');
}

galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
