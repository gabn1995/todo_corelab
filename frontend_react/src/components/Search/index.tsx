import React from "react";
import styles from "./Search.module.scss";

const Search = () => {
    return(
      <div className={styles.search} >
        <input 
          type="search" 
          className={styles.search_input} 
          placeholder="Pesquisar notas"
        />
      </div>  
    );
}

export default Search;