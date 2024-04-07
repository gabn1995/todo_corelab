import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Icon from "../../img/icon.png";
import Close from "../../img/close.png";
import { doLogout } from "../../lib/authHandler";
import { listColor } from "../../lib/colors";
import { INote } from "../../types/Note";

let timer: NodeJS.Timeout;

type Props = {
    listNotes: INote[],
    getListFilters: (list: INote[]) => void
}

const Header = ({ listNotes, getListFilters }: Props) => {
    const [search, setSearch] = useState<string>("");
    const [listFilters, setListFilters] = useState<INote[]>([]);
    const [listColorSelect, setListColorSelect] = useState<string[]>([]);
    const [colorSelect, setColorSelect] = useState<string>("");

    const filterList = async () => {
        let list: INote[] = [];

        if (!search && !colorSelect && listFilters.length > 0) {
            window.location.href = '/';
        }

        if (search && colorSelect) {
            list = listNotes.filter(i => i.title.includes(search) && i.color === colorSelect);
        } else if (search && !colorSelect) {
            list = listNotes.filter(i => i.title.includes(search));
        }
        if(list.length > 0) {
            setListFilters(list);
        }else if(list.length === 0 && search){
            alert("Não há tarefas para esse(s) filtros");
            setSearch("");
        }
    }

    useEffect(() => {
        getListFilters(listFilters);
    }, [listFilters]);

    useEffect(() => {
        setListColorSelect(listColor);
    }, []);

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(filterList, 1000)

    }, [search]);

    const handleClose = async () => {
        doLogout();
        window.location.href = '/';
    }

    const changeColor = async (color: string) => {
        setColorSelect(color);
        let list: INote[] = [];
        if (!color && !search) {
            window.location.href = '/';
        } else if (color && search) {
            list = listNotes.filter(i => i.title.includes(search) && i.color === colorSelect);
        } else if (color && !search) {
            list = listNotes.filter(i => i.color === color);
        }

        if (list.length > 0) {
            setListFilters(list);
        } else {
            alert("Não há tarefas para esse(s) filtros");
            window.location.href = '/';
        }
    }

    return (
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
                    <div className={styles.search} >
                        <input
                            type="text"
                            className={styles.search_input}
                            placeholder="Pesquisar notas"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    {/* end-search */}

                    {/* filter color */}
                    <select onChange={e => changeColor(e.target.value)} style={{ backgroundColor: colorSelect }} name="" id="" className={styles.filter_color_select}>
                        <option style={{ backgroundColor: "#FFFFFF" }} value="">---</option>
                        {listColorSelect.map((i, k) =>
                            <option key={k} style={{ backgroundColor: i }} value={i}></option>
                        )}
                    </select>
                    {/* filter color  */}
                </div>


                {/* button close */}
                <img src={Close} alt="close" className={styles.button_close} onClick={handleClose} />
                {/* end-button close */}
            </div>
        </div>
    );
}

export default Header;