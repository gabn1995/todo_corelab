import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Icon from "../../img/icon.png";
import Close from "../../img/close.png";
import { doLogout } from "../../lib/authHandler";
import { INote } from "../../types/Note";
import { useNavigate } from "react-router-dom";

let timer: NodeJS.Timeout;

type Props = {
    listNotes: INote[],
    getListFilters: (list: INote[]) => void
}

const Header = ({ listNotes, getListFilters }: Props) => {
    const navigate = useNavigate();

    const [search, setSearch] = useState<string>("");
    const [listFilters, setListFilters] = useState<INote[]>([]);

    const filterList = async () => {
        let list = listNotes.filter((i) =>
            i.title.includes(search)
        );
        setListFilters(list);

        if (!search && listFilters.length > 0) {
            navigate('/', { replace: true });
        }
    }

    useEffect(() => {
        getListFilters(listFilters);
    }, [listFilters]);


    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(filterList, 1000)

    }, [search]);

    const handleClose = () => {
        doLogout();
        window.location.href = '/';
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
                </div>


                {/* button close */}
                <img src={Close} alt="close" className={styles.button_close} onClick={handleClose} />
                {/* end-button close */}
            </div>
        </div>
    );
}

export default Header;