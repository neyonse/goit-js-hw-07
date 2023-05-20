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

galleryEl.addEventListener('click', onImageClick);

function onImageClick(event) {
  event.preventDefault();

  const currentImageThumb = event.target;

  if (!currentImageThumb.classList.contains('gallery__image')) {
    return;
  }

  const currentImageSrc = currentImageThumb.dataset.source;
  console.log(currentImageSrc);

  const instance = basicLightbox.create(
    `<img src="${currentImageSrc}" width="1280" height="auto">`
  );

  instance.show();
}

// function createGalleryMarkup(data) {
//   const galleryItemsMarkup = [];

//   data.forEach(el => {
//     const galleryItem = document.createElement('li');
//     const galleryLink = document.createElement('a');
//     const galleryImage = document.createElement('img');

//     galleryItem.classList.add('gallery__item');

//     galleryLink.classList.add('gallery__link');
//     galleryLink.href = el.original;

//     galleryImage.classList.add('gallery__image');
//     galleryImage.src = el.preview;
//     // galleryImage.dataSource = el.original; // how to add?
//     galleryImage.alt = el.description;

//     galleryItem.append(galleryLink);
//     galleryLink.append(galleryImage);
//     galleryItemsMarkup.push(galleryItem);

//     console.log('galleryItem: ', galleryItem);
//   });

//   console.log('galleryItemsMarkup: ', galleryItemsMarkup);

//   return galleryItemsMarkup;
// }
