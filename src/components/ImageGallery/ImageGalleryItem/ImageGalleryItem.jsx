import { Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    const { photosData: data, showModal } = this.props;
    return data.map(item => {
      return (
        <li className="gallery-item" key={item.id}>
          <img
            className="gallery-image-item"
            src={item.webformatURL}
            alt={item.tags}
            onClick={() => {
              showModal(item.largeImageURL);
            }}
          />
        </li>
      );
    });
  }
}
