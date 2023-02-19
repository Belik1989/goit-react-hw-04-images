import { useState } from 'react';

import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImagenGallery/ImageGallery';

import { fetchImages } from 'services/fetchImages';
import { Button } from '../Button/Button';
import { Loader } from 'components/Loader/Loader';
import { AppBox } from './App.styled';
// при внесенні сторінки в константи перестає рендериться 
// нормально галерея
let page = 1;
export function App() {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);
  // const [page, setPage] = useState(1);
  const totalPages = items.length / (page * totalHits);

  const submitHandler = async searchValue => {
    if (searchValue.trim() === '') {
      alert("You can't search by empty field, try again.");
      return;
    } else {
      try {
        setStatus('pending');
        const { totalHits, hits } = await fetchImages(searchValue, page);
        if (hits.length < 1) {
          setStatus('idle');
          alert(
            'Sorry, there are no images matching your search query. Please try again'
          );
        } else {
          setItems(hits);
          setSearchValue(searchValue);
          setTotalHits(totalHits);
          setStatus('resolved');
        }
      } catch (error) {
        setStatus('rejected');
      }
    }
  };

  const onNextPage = async () => {
    setStatus('pending');
    try {
      const { hits } = await fetchImages(searchValue, (page += 1));
      setItems([...items, ...hits]);
      // setPage(prevPage => prevPage + 1);
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
    }
  };

  return (
    <AppBox>
      <Searchbar onSubmit={submitHandler} />
      <ImageGallery items={items} />
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <span>Oops!Something wrong!Try later.</span>}
      {totalPages < 1 && status === 'resolved' && (
        <Button onClick={onNextPage} />
      )}
    </AppBox>
  );
}
