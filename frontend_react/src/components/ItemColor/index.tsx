import styles from "./ItemColor.module.scss";

type Props = {
    color: string
}

const ItemColor = ({color}: Props) => {
    return(
        <div className={styles.itemColor} style={{backgroundColor: color}}>
        </div>    
    );
};

export default ItemColor;