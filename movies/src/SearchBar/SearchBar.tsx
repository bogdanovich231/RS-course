import { ChangeEvent, FC, useState } from 'react';
import search from '../assets/Vector.svg';
import './SearchBar.scss';
import  { searchMovie } from '../Api/Api';
import IMovie, { SearchProps, SearchState } from '../Types/Types';

const Search: FC<SearchProps> = ({ updateSearchResults }) => {
  const [state, setState] = useState<SearchState>({
    query: localStorage.getItem('searchQuery') || '',
    searchResults: undefined,
    isLoading: false,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, query: event.target.value });
  };

  const handleSearch = async () => {
    const { query } = state;
    localStorage.setItem('searchQuery', query);
    setState({ ...state, isLoading: true });
    try {
      const result = (await searchMovie(query, 1)) as IMovie[] | undefined;
      console.log('Results from API:', result);
      updateSearchResults(result || []);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setState({ ...state, isLoading: false });
    }
  };

  return (
    <div className="search_bar">
      <input placeholder="Search movie" type="text" onChange={handleInputChange} value={state.query} />
      <button className="search_btn" onClick={handleSearch}>
        <img src={search} alt="search btn" />
      </button>
    </div>
  );
};

export default Search;
