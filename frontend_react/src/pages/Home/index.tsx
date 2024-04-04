import styles from "./Home.module.scss";
import Header from "../../components/Header";
import Note from "../../components/Note";

const HomePage = () => {
  return (
    <div className={styles.home}>
      <Header />

      <div className={styles.home_container}>
        {/* new-note */}
        <div className={styles.notes_new}>
          <Note title="Título" body="Criar nota..." is_new={true}/>
        </div>
        {/* end-new-note */}

        {/* favorites-notes */}
        <span className={styles.categories}>Favoritas</span>
        <div className={styles.notes_favorites}>
          <Note title="Título" body="Criar nota..." is_favorite={true} color="#CCC" visible_blockColor={true} />
          <Note title="Título" body="Criar nota..." is_favorite={true} color="#CCC"/>
          <Note title="Título" body="Criar nota..." is_favorite={true} color="#CCC"/>
          <Note title="Título" body="Criar nota..." is_favorite={true} color="#CCC"/>
          <Note title="Título" body="Criar nota..." is_favorite={true} color="#CCC"/>
        </div>
        {/* end-favorites-notes */}

        {/* others-notes */}
        <span className={styles.categories}>Outras</span>
        <div className={styles.notes_others}>
          <Note title="Título" body="Criar nota..." color="#CCC"/>
          <Note title="Título" body="Criar nota..." color="#CCC"/>
          <Note title="Título" body="Criar nota..." color="#CCC"/>
          <Note title="Título" body="Criar nota..." color="#CCC"/>
        </div>
        {/* end-others-notes */}
      </div>

    </div>
  );
}

export default HomePage;