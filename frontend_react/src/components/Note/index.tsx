import { useState } from "react";
import styles from "./Note.module.scss";
import Favorite from "../../img/favorite.png";
import Favorite_fill from "../../img/favorite_fill.png";
import Pencil from "../../img/pencil.png";
import Paint from "../../img/paint.png";
import Close from "../../img/close.png";
import { INote } from "../../types/Note_props";
import BlockColor from "../BlockColor";
import { useNavigate } from "react-router-dom";
import { createNote, changeFavorite, editNote, deleteNote } from "../../lib/api";

const Note = ({
    id,
    title,
    body,
    is_new = false,
    is_favorite = false,
    color = '#FFFFFF'
}: INote) => {
    const navigate = useNavigate();

    const [newTitle, setNewTitle] = useState<string>("");
    const [newBody, setNewBody] = useState<string>("");
    const [newNoteFavorite, setNewNoteFavorite] = useState<boolean>(false);
    const [oldTitle, setOldTitle] = useState<string>(title);
    const [oldBody, setOldBody] = useState<string>(body);
    const [disabled, setDisabled] = useState<boolean>(is_new ? false : true);
    const [error, setError] = useState<string>("");
    const [isEditPencil, setIsEditPencil] = useState<boolean>(false);
    const [isEditPaint, setIsEditPaint] = useState<boolean>(false);

    const handleNewNote = async () => {
        if (is_new) {
            if (newTitle && newBody) {
                setDisabled(true);
                setError('');

                const json = await createNote(newTitle, newBody, newNoteFavorite);

                if (json.error) {
                    setError(json.error);
                    alert(error);
                } else {
                    alert("Tarefa criada com sucesso!");
                }

                setNewTitle('');
                setNewBody('');
                setNewNoteFavorite(false);
                setDisabled(false);
            }
        }
    }

    const handleChangeFavorite = async (id: number) => {
        setDisabled(true);
        setError('');

        if (id !== 0) {
            const json = await changeFavorite(id);

            if (json.error) {
                setError(json.error);
                alert(error);
            } else {
                // window.location.href = '/';
                navigate('/', { replace: true });
            }

        }else{
            setNewNoteFavorite(true);
        }
        setDisabled(false);
    }

    const handleEditPencil = async (id: number) => {
        if (isEditPencil) {
            setIsEditPencil(false);

            if (title !== oldTitle || body !== oldBody) {

                const json = await editNote(id, oldTitle, oldBody);

                if (json.error) {
                    setError(json.error);
                    alert(error);
                }
                alert('Salvo');
            }

        } else {
            setIsEditPencil(true);
        }
    }

    const handleEditPaint = async (id: number) => {
        isEditPaint ? setIsEditPaint(false) : setIsEditPaint(true);
    }

    const handleDeleteNote = async (id: number) => {
        const json = await deleteNote(id);

        if (json.error) {
            setError(json.error);
            alert(error);
        } else {
            alert('Deletado com sucesso!');
            window.location.href = '/';
        }
    }

    return (
        <div className={`${styles.note} ${is_new ? styles.note_new : ''}`} onBlur={handleNewNote}>
            <div className={styles.note_container} style={{ backgroundColor: color }}>
                {/* header */}
                <div className={styles.note_header}>
                    <input
                        type="text"
                        className={styles.title}
                        placeholder={is_new ? title : ''}
                        disabled={is_new ? disabled : !isEditPencil}
                        value={is_new ? newTitle : oldTitle}
                        onChange={is_new ? e => setNewTitle(e.target.value) : e => setOldTitle(e.target.value)}
                    />
                    <img
                        src={is_new ? (newNoteFavorite ? Favorite_fill : Favorite) : (is_favorite ? Favorite_fill : Favorite)}
                        alt="favorite"
                        onClick={() => handleChangeFavorite(id)}
                    />
                </div>
                {/* end-header */}

                {/* body */}
                <div className={`${styles.note_body} ${!is_new ? styles.old : ''}`}>
                    <textarea
                        className={styles.note_input}
                        placeholder={is_new ? body : ''}
                        disabled={is_new ? disabled : !isEditPencil}
                        value={is_new ? newBody : oldBody}
                        onChange={is_new ? e => setNewBody(e.target.value) : e => setOldBody(e.target.value)}
                    >
                    </textarea>
                </div>
                {/* end-body */}

                {/* footer */}
                {!is_new &&
                    <div className={styles.note_footer}>
                        <div className={styles.note_footer_left}>
                            <div onClick={() => handleEditPencil(id)} className={`${styles.footer_pencil_fill} ${isEditPencil ? styles.tint_edit : ''}`}>
                                <img src={Pencil} alt="pencil" className={styles.footer_pencil} />
                            </div>
                            <div onClick={() => handleEditPaint(id)} className={`${styles.footer_paint_fill} ${isEditPaint ? styles.tint_edit : ''}`}>
                                <img src={Paint} alt="paint" className={styles.footer_paint} />
                            </div>
                        </div>
                        <div onClick={() => handleDeleteNote(id)} className={styles.note_footer_rigth}>
                            <img src={Close} alt="close" className={styles.footer_close} />
                        </div>
                    </div>
                }
                {/* end-footer */}

            </div>
            {/* blockColor */}
            {isEditPaint &&
                <BlockColor id={id} setIsEditPaint={setIsEditPaint}/>
            }
            {/* end-blockColor */}
        </div>
    );
}

export default Note;