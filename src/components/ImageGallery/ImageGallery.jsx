import { Component } from 'react';

import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const { photos, openModal } = this.props;
    return (
      <ul className="gallery">
        <ImageGalleryItem photosData={photos} showModal={openModal} />
      </ul>
    );
  }
}
