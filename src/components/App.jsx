import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import styles from './App.module.css';
import { getImg } from '../api/images-api';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [currentTargetPage, setCurrentTargetPage] = useState(1);
  const [allPages, setAllPages] = useState(0);
  const [search, setSearch] = useState('');
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (search === '') return;

    const getImages = async () => {
      setIsLoader(true);
      try {
        const { hits, totalHits } = await getImg(search, currentTargetPage);
        const images = hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => ({
            id,
            largeImageURL,
            webformatURL,
            tags,
          })
        );
        setImages(prev => [...prev, ...images]);
        setAllPages(Math.ceil(totalHits / 12));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoader(false);
      }
    };

    getImages();
  }, [currentTargetPage, search]);

  const onSubmit = search => {
    setSearch(search);
    setImages([]);
    setCurrentTargetPage(1);
  };

  const loadMore = () => {
    setCurrentTargetPage(prev => prev + 1);
  };

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(prev => !prev);
    setLargeImageUrl(largeImageURL);
    setTags(tags);
  };
  return (
    <div className={styles.App}>
      {showModal && (
        <Modal closeModal={toggleModal}>
          <img src={largeImageUrl} alt={tags} />
        </Modal>
      )}
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} openModal={toggleModal} />
      {images.length > 0 && !isLoader && allPages !== currentTargetPage && (
        <Button onClick={loadMore}>Load more</Button>
      )}
      {isLoader && <Loader />}
    </div>
  );
};
