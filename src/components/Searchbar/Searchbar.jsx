import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchbarBox,
  SearchForm,
  SearchFormButton,
  SearchbarInput,
} from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';

export function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  const inputHandler = async event => {
    setSearchValue(event.currentTarget.value.toLowerCase());
  };

  const handlerSubmit = event => {
    event.preventDefault();
    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <SearchbarBox>
      <SearchForm onSubmit={handlerSubmit}>
        <SearchFormButton type="submit">
          <FcSearch />
        </SearchFormButton>

        <SearchbarInput
          name="searchValue"
          type="text"
          value={searchValue}
          typeof="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={inputHandler}
        />
      </SearchForm>
    </SearchbarBox>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
