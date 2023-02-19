import { useState } from 'react';
import { Modal } from '../../Modal/Modal';
import PropTypes from 'prop-types';
import { GalleryItem } from './ImagGalleryItem.styled';

export function ImageGalleryItem({ item }) {
  const [showModal, setShowModal] = useState(false);

  const onModal = () => {
    setShowModal(!showModal);
  };

  return (
    <GalleryItem>
      <img src={item.webformatURL} onClick={onModal} alt="img" />
      {showModal && <Modal onClose={onModal} image={item} />}
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};
