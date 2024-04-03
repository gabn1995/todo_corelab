import "./Header.scss";
import Icon from "../../img/icon.png";
import Close from "../../img/close.png";
import Search from "../Search";

const Header = () => {
    return(
      <div className="header">
        <div className="container">
          <div className="header-left">
            {/* logo */}
            <div className="logo">
              <img src={Icon} alt="icon" />
              <span>CoreNotes</span>
            </div>
            {/* end-logo */}

            {/* search */}
            <Search/>
            {/* end-search */}
          </div>
          

          {/* button close */}
          <img src={Close} alt="close" className="button_close"/>
          {/* end-button close */}
        </div>
      </div>  
    );
}

export default Header;