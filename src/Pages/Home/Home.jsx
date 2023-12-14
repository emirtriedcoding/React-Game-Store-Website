import React, { useEffect, useState } from "react";
import Banner from "../../Components/Banner/Banner";
import { createContext } from "react";
import Main from "../../Components/Main/Main";
import Blog from "../../Components/Blog/Blog";

export const HomeContext = createContext();

export default function Home() {
  const [games, setGames] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:5173/data/gamesData.json")
      .then((res) => res.json())
      .then((data) => setGames(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HomeContext.Provider value={{ games, setGames }}>
      <div className="flex flex-col" >
        <Banner />
        <Main />
        <Blog/>
      </div>
    </HomeContext.Provider>
  );
}
