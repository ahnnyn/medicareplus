import { Input } from 'antd';
import { useState, useRef } from 'react';
const { Search } = Input;

const SearchComponent = ({ onSearch, placeholder }) => {
  const [searchValue, setSearchValue] = useState('');
  const searchTimeout = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      onSearch(value.trim());
    }, 300);
  };

  const handleEnterSearch = () => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    onSearch(searchValue.trim());
  };

  return (
    <Search
      placeholder={placeholder}
      enterButton="Tìm kiếm"
      size="large"
      value={searchValue}
      onChange={handleChange}
      onSearch={handleEnterSearch}
    />
  );
};

export default SearchComponent;
