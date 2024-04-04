import styles from "./Header.module.scss";
import Icon from "../../img/icon.png";
import Close from "../../img/close.png";
import Search from "../Search";

const Header = () => {
    return(
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.header_left}>
            {/* logo */}
            <div className={styles.logo}>
              <img src={Icon} alt="icon" />
              <span>CoreNotes</span>
            </div>
            {/* end-logo */}

            {/* search */}
            <Search/>
            {/* end-search */}
          </div>
          

          {/* button close */}
          <img src={Close} alt="close" className={styles.button_close} />
          {/* end-button close */}
        </div>
      </div>  
    );
}

export default Header;