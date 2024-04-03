import "./Note.scss";
import Favorite from "../../img/favorite.png";
import Favorite_fill from "../../img/favorite_fill.png";
import Pencil from "../../img/pencil.png";
import Paint from "../../img/paint.png";
import Close from "../../img/close.png";
import {Props_note} from "../../types/Note";


const Note = ({
    title,
    body,
    is_new = false,
    is_favorite = false,
    color = '#FFFFFF'
}: Props_note) => {
    return(
        <div className="note" style={{ backgroundColor:color }}>
            {/* header */}
            <div className="note_header">
                <span className="title">{title}</span>
                <img src={is_favorite ? Favorite_fill : Favorite} alt="favorite" />
            </div>
            {/* end-header */}

            {/* body */}
            <div className={`note_body ${!is_new ? 'old' : ''}`}>
                <textarea className="note_input">
                    {body}
                </textarea>
            </div>
            {/* end-body */}

            {/* footer */}
            {!is_new &&
            <div className="note_footer">
                <div className="note_footer_left">
                    <img src={Pencil} alt="pencil" className="footer_pencil"/>
                    <img src={Paint} alt="paint" className="footer_paint"/>
                </div>
                <div className="note_footer_rigth">
                    <img src={Close} alt="close" className="footer_close"/>
                </div>
            </div>
            }
            {/* end-footer */}
        </div>    
    );
}

export default Note;