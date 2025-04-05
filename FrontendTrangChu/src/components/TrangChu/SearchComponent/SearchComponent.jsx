import { Input } from "antd";
import { useState } from "react";
const { Search } = Input;

const SearchComponent = ({ placeholder, onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  let searchTimeout;

  const handleSearchChange = (value) => {
    setSearchValue(value);

    // Clear timeout before setting a new one
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout
    searchTimeout = setTimeout(() => {
      onSearch(value); // Call onSearch after delay
    }, 300); // Delay 300ms
  };

  return (
    <Search
      placeholder={placeholder}
      allowClear
      enterButton="Tìm kiếm"
      size="large"
      onChange={(e) => handleSearchChange(e.target.value)} // Call search function when typing
      onSearch={() => onSearch(searchValue)} // Call onSearch when the user hits Enter
    />
  );
};

export default SearchComponent;
