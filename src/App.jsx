import { useState } from "react";
import { useRoutes } from "react-router-dom";
import { createContext } from "react";

import routes from "./routes";
import Header from "./Components/Header/Header";
import BackToTop from "./Components/BackToTop/BackToTop";
import Footer from "./Components/Footer/Footer";

import "./App.css";

export const AppContext = createContext();

export default function App() {
  const router = useRoutes(routes);
  const [addedGames, setAddedGames] = useState([]);
  const [favorites, setFavorites] = useState([]);

  return (
    <>
      <AppContext.Provider
        value={{ addedGames, setAddedGames, favorites, setFavorites }}
      >
        <div>
          <div>
            <Header />
            <BackToTop />
          </div>
          {router}
          <div>
            <Footer />
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
}
