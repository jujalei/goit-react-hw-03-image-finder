import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import { fetchPhotos } from 'services/api';

import { toast } from 'react-toastify';

const toastConfig = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};
export class App extends Component {
  state = {
    page: 1,
    photos: [],
    query: '',
    totalHits: null,
    loading: false,
    error: null,
    showModal: false,
    modalImage: {},
  };

  handleSubmit = e => {
    if (e.target.elements.query.value === this.state.query) {
      return;
    }

    this.setState({
      page: 1,
      query: e.target.elements.query.value,
      photos: [],
    });
  };

  showModal = largeImage => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
        modalImage: largeImage,
      };
    });
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;

    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.setState({ loading: true });
      try {
        const { hits, totalHits } = await fetchPhotos(query, page);

        if (totalHits < 1) {
          this.setState({
            error: `${query} is not found`,
          });
          toast.error(`${query} is not found`, toastConfig);
        } else {
          this.setState({
            error: null,
          });
        }

        this.setState(prevState => {
          return {
            photos: [...prevState.photos, ...hits],
            totalHits: totalHits,
          };
        });
      } catch (error) {
        this.setState({
          error: 'Something went wrong',
        });
        toast.error('Something went wrong', toastConfig);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const { photos, modalImage, totalHits, page } = this.state;
    return (
      <div>
        <Searchbar handleSubmit={e => this.handleSubmit(e)} />
        {photos && <ImageGallery photos={photos} openModal={this.showModal} />}
        {this.state.showModal && (
          <Modal showModal={this.showModal} largeImage={modalImage} />
        )}
        {this.state.loading && <Loader />}
        {photos.length > 0 && Math.ceil(totalHits / 12) > page && (
          <Button onClickLoadMore={this.loadMore} />
        )}
      </div>
    );
  }
}
