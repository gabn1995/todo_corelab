import React from "react";
import "./Search.scss";

const Search = () => {
    return(
      <div>
        <input 
          type="search" 
          className="search_input" 
          placeholder="Pesquisar notas"
        />
      </div>  
    );
}

export default Search;