import { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import Header from "../../components/Header";
import Note from "../../components/Note";
import { INote } from "../../types/Note";
import { readNotes } from "../../lib/api";
import Loading from "../../img/loading.gif";

const HomePage = () => {
    const [listNotes, setListNotes] = useState<INote[]>([]);
    const [listNotesFavorites, setListNotesFavorites] = useState<INote[]>([]);
    const [listNotesOthers, setListNotesOthers] = useState<INote[]>([]);
    const [listNotesFilters, setListNotesFilters] = useState<INote[]>([]);
    const [existNotes, setExistNotes] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);

        const getNotes = async () => {
            const json = await readNotes();
            setListNotes(json.todos);
        }

        getNotes();
        setLoading(false);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line eqeqeq
        setListNotesFavorites(listNotes.filter(i => i.favorite == true));
        // eslint-disable-next-line eqeqeq
        setListNotesOthers(listNotes.filter(i => i.favorite == false));
    }, [listNotes]);

    useEffect(() => {
        const id = setTimeout(() => {
            setExistNotes(false);
        }, 3000);
    
        return () => clearTimeout(id);
    }, []);

    const handleGetListFilters = async (list: INote[]) => {
        setListNotesFilters(list);
    }

    return (
        <div className={styles.home}>
            <Header listNotes={listNotes} getListFilters={handleGetListFilters} />

            <div className={styles.home_container}>
                {/* new-note */}
                <div className={styles.notes_new}>
                    <Note id={0} title="Título" body="Criar nota..." is_new={true} />
                </div>
                {/* end-new-note */}

                {/* filtrados-notes */}
                {!loading && listNotesFilters.length > 0 && listNotesOthers.length > 0 &&
                    <>
                        <span className={styles.categories}>Filtrados</span>
                        <div className={styles.notes_favorites}>
                            {listNotesFilters.map((i, k) =>
                                <Note key={k} id={i.id} title={i.title} body={i.body} is_favorite={i.favorite} color={i.color} />
                            )}
                        </div>
                    </>
                }
                {/* end-filtrados-notes */}

                {/* favorites-notes */}
                {!loading && listNotesFilters.length === 0 && listNotesFavorites.length > 0 &&
                    <>
                        <span className={styles.categories}>Favoritas</span>
                        <div className={styles.notes_favorites}>
                            {listNotesFavorites.map((i, k) =>
                                <Note key={k} id={i.id} title={i.title} body={i.body} is_favorite={i.favorite} color={i.color} />
                            )}
                        </div>
                    </>
                }
                {/* end-favorites-notes */}

                {/* others-notes */}
                {!loading && listNotesFilters.length === 0 && listNotesOthers.length > 0 &&
                    <>
                        <span className={styles.categories}>Outras</span>
                        <div className={styles.notes_others}>
                            {listNotesOthers.map((i, k) =>
                                <Note key={k} id={i.id} title={i.title} body={i.body} is_favorite={i.favorite} color={i.color} />
                            )}
                        </div>
                    </>
                }
                {/* end-others-notes */}

                {/* loading */}
                {loading &&
                    <div className={styles.loading}>
                        <img src={Loading} alt="loading" />
                    </div>
                }
                {/* end-loading */}

                {/* lista de notas vazia */}
                {existNotes && !loading && listNotes.length === 0 &&
                    <div className={styles.loading}>
                        <img src={Loading} alt="loading" />
                    </div>
                }
                {/* end-lista de notas vazia */}
                {!existNotes && !loading && listNotes.length === 0 &&
                    <div className={styles.loading}>
                        Não há tarefas.
                    </div>
                }

            </div>

        </div >
    );
}

export default HomePage;