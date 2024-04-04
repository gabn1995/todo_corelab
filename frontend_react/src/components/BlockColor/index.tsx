import styles from "./BlockColor.module.scss";
import ItemColor from "../ItemColor";

type Props = {
    visible: boolean
}

const BlockColor = ({visible}: Props) => {
    return(
        <div className={styles.blockColor} style={{display:`${visible ? 'flex' : 'none'}`}}>
            <ItemColor color="#BAE2FF"/>
            <ItemColor color="#B9FFDD"/>
            <ItemColor color="#FFE8AC"/>
            <ItemColor color="#FFCAB9"/>
            <ItemColor color="#F99494"/>
            <ItemColor color="#9DD6FF"/>
            <ItemColor color="#ECA1FF"/>
            <ItemColor color="#DAFF8B"/>
            <ItemColor color="#FFA285"/>
            <ItemColor color="#CDCDCD"/>
            <ItemColor color="#979797"/>
            <ItemColor color="#A99A7C"/>
        </div>    
    );
};

export default BlockColor;