import { useEffect, useState } from "react";
import styles from "./BlockColor.module.scss";
import { changeColor } from "../../lib/api";
import { listColor } from "../../lib/colors";

type Props = {
    id: number,
    setIsEditPaint: (isEdit: boolean) => void,
}
const BlockColor = ({id, setIsEditPaint}: Props) => {
    const [listColorSelect, setListColorSelect] = useState<string[]>([]);
    const [error, setError] = useState<string>();

    useEffect(() => {
        setListColorSelect(listColor);
    }, []);

    const handleChangeColor = async (color: string) => {
        const json = await changeColor(id, color);

        if (json.error) {
            setError(json.error);
            alert(error);
        }else{
            setIsEditPaint(false);
            alert('Cor alterada com sucesso!');
            window.location.href = '/';
        }
    }

    return(
        <div className={styles.blockColor}>
             {listColorSelect.map((i, k) =>
                <div key={k} onClick={() => handleChangeColor(i)} className={styles.itemColor} style={{backgroundColor: i}}></div>
             )}       
        </div>    
    );
};

export default BlockColor;