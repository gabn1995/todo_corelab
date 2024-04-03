import "./Home.scss";
import Header from "../../components/Header";
import Note from "../../components/Note";

const HomePage = () => {
  return (
    <>
      <Header />

      <div className="home_area">
        {/* new-note */}
        <Note title="Título" body="Criar nota..." is_new={true}/>
        {/* end-new-note */}

        {/* favorites-notes */}
        <span className="categories">Favoritas</span>
        <Note title="Título" body="Criar nota..." is_favorite={true} color="#CCC"/>
        <Note title="Título" body="Criar nota..." is_favorite={true} color="#CCC"/>
        {/* end-favorites-notes */}

        {/* others-notes */}
        <span className="categories">Outras</span>
        <Note title="Título" body="Criar nota..." color="#CCC"/>
        {/* end-others-notes */}
      </div>

    </>
  );
}

export default HomePage;