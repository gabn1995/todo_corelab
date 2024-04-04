import styles from "./Note.module.scss";
import Favorite from "../../img/favorite.png";
import Favorite_fill from "../../img/favorite_fill.png";
import Pencil from "../../img/pencil.png";
import Paint from "../../img/paint.png";
import Close from "../../img/close.png";
import { INote } from "../../types/Note";
import BlockColor from "../BlockColor";

const Note = ({
    title,
    body,
    is_new = false,
    is_favorite = false,
    color = '#FFFFFF',
    visible_blockColor = false
}: INote) => {
    return (
        <div className={`${styles.note} ${is_new ? styles.note_new : ''}`}>
            <div className={styles.note_container} style={{ backgroundColor: color }}>
                {/* header */}
                <div className={styles.note_header}>
                    <span className={styles.title}>{title}</span>
                    <img src={is_favorite ? Favorite_fill : Favorite} alt="favorite" />
                </div>
                {/* end-header */}

                {/* body */}
                <div className={`${styles.note_body} ${!is_new ? styles.old : ''}`}>
                    <textarea className={styles.note_input}>
                        {body}
                    </textarea>
                </div>
                {/* end-body */}

                {/* footer */}
                {!is_new &&
                    <div className={styles.note_footer}>
                        <div className={styles.note_footer_left}>
                            <div className={styles.footer_pencil_fill}>
                                <img src={Pencil} alt="pencil" className={styles.footer_pencil} />
                            </div>
                            <div className={styles.footer_paint_fill}>
                                <img src={Paint} alt="paint" className={styles.footer_paint} />
                            </div>
                        </div>
                        <div className={styles.note_footer_rigth}>
                            <img src={Close} alt="close" className={styles.footer_close} />
                        </div>
                    </div>
                }
                {/* end-footer */}

            </div>
            {/* blockColor */}
            <BlockColor visible={visible_blockColor} />
            {/* end-blockColor */}
        </div>
    );
}

export default Note;