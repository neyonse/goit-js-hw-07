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
              data-source='${original}'
              alt='${description}'
            />
          </a>
        </li>`;
    })
    .join('');
}

galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
galleryEl.addEventListener('click', onImageThumbClick);

function onImageThumbClick(event) {
  event.preventDefault();

  const { target } = event;

  if (!target.classList.contains('gallery__image')) {
    return;
  }

  const targetImageSrc = target.dataset.source;

  if (targetImageSrc) {
    const imageOriginal = basicLightbox.create(
      `<img src="${targetImageSrc}" width="1280" height="auto">`,
      {
        onShow: () => {
          document.addEventListener('keydown', onPressEsc);
          bodyScrollLock();
        },
        onClose: () => {
          document.removeEventListener('keydown', onPressEsc);
          bodyScrollUnlock();
        },
      }
    );

    imageOriginal.show();

    imageOriginal.element().addEventListener('click', () => {
      imageOriginal.close();
    });

    function onPressEsc(event) {
      if (event.code !== 'Escape') {
        return;
      }
      imageOriginal.close();
    }
  }
}

function bodyScrollLock() {
  document.body.style.overflow = 'hidden';
}

function bodyScrollUnlock() {
  document.body.style.overflow = 'auto';
}
