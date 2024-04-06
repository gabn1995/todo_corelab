import { useState } from "react";
import styles from "./BlockColor.module.scss";
import { changeColor } from "../../lib/api";

type Props = {
    id: number,
    setIsEditPaint: (isEdit: boolean) => void,
}
const BlockColor = ({id, setIsEditPaint}: Props) => {

    const [error, setError] = useState<string>();

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

    const listColor = [
        "#BAE2FF","#B9FFDD","#FFE8AC","#FFCAB9",
        "#F99494","#9DD6FF","#ECA1FF","#DAFF8B",
        "#FFA285","#CDCDCD","#979797","#A99A7C",
    ];

    return(
        <div className={styles.blockColor}>
             {listColor.map((i, k) =>
                <div key={k} onClick={() => handleChangeColor(i)} className={styles.itemColor} style={{backgroundColor: i}}></div>
             )}       
        </div>    
    );
};

export default BlockColor;