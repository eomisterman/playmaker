import React, { useState } from "react";
import './SearchBar.css';

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const search = () => {
        props.onSearch(searchTerm);
    }

    const handleTermChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            props.onSearch(searchTerm);
        }
    }

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} onKeyPress={handleKeyPress} />
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    );
}

export default SearchBar;