import React, { useContext, useState } from "react";
import { HomeContext } from "../../Pages/Home/Home";
import { Link } from "react-router-dom";

import { IoSearchOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";

import { AppContext } from "../../App";

export default function Main() {
  const { games, setGames } = useContext(HomeContext);
  const [activeCategory, setActiveCategory] = useState(1);
  const [search, setSearch] = useState("");
  const { favorites, setFavorites } = useContext(AppContext);

  const categories = [
    { id: 1, title: "All" },
    { id: 2, title: "Action" },
    { id: 3, title: "Battle Royale" },
    { id: 4, title: "Fighting" },
    { id: 5, title: "Racing" },
  ];

  const switchHandle = (id) => {
    setActiveCategory(id);
  };
  
  const favoriteHandle = (game) => {
    const isAlreadyFavorited = favorites.some((fav) => fav.id === game.id);
    if (!isAlreadyFavorited) {
      setFavorites((prevGames) => [...prevGames, game]);
    } else {
      return;
    }
  };

  return (
    <div className="bg-[#000] w-full p-10 flex flex-col gap-4 lg:gap-8 relative before:absolute before:-left-5  before:-top-10 before:lg:-top-20 before:w-[2100px] before:h-14 before:lg:h-44 before:bg-black before:blur-md">
      <h2 className="text-white text-xl lg:text-3xl before:opacity-50 font-bold italic z-50 relative before:absolute before:w-1/3 before:h-[10px] before:bg-gradient-to-r before:from-red-600 before:to-transparent before:top-1/3 before:-z-50 before:rounded-sm">
        Our Latest Games
      </h2>
      <div className="flex flex-col gap-8 lg:flex-row justify-between items-center w-full">
        <div className="flex lg:flex-row gap-3 w-full text-[10px] lg:text-base">
          {categories.map((cat) => (
            <span
              className={` ${
                activeCategory === cat.id
                  ? "bg-[#00CED1] text-black"
                  : "text-white border border-solid border-[#00CED1]"
              } p-2 lg:px-4 lg:py-2 rounded-md cursor-pointer hover:-translate-y-1 duration-200`}
              key={cat.id}
              onClick={() => switchHandle(cat.id)}
            >
              {cat.title}
            </span>
          ))}
        </div>
        <div>
          <div className="bg-transparent border border-solid border-[#00CED1] flex flex-row-reverse items-center gap-3 px-2 py-1 w-[300px] rounded-md text-white duration-200 hover:-translate-y-1 ">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none placeholder:text-sm w-full"
              placeholder="Search For a Game ..."
            />
            <IoSearchOutline size={20} className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-8 gap-2">
        {games &&
          games.map((game) => (
            <div
              key={game.id}
              className={`group cursor-pointer relative flex justify-center items-center ${
                activeCategory !== 1 &&
                game.cat !== categories[activeCategory - 1].title
                  ? "hidden"
                  : ""
              } ${
                game.name.toLowerCase().includes(search.toLowerCase())
                  ? ""
                  : "hidden"
              }`}
            >
              <img
                src={game.prevImg}
                className="h-full lg:h-[400px] w-full rounded-md group-hover:hue-rotate-180 duration-200"
                alt=""
              />
              <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-200 flex flex-col gap-3 justify-center items-center absolute text-black bg-[#000] w-full h-full bg-opacity-80 ">
                <span className="font-bold bg-[#00CED1] p-1 rounded-md">
                  {game.name}
                </span>
                <span className="bg-red-600 text-white p-1 rounded-md text-sm">
                  {game.cat}
                </span>
                <span className="text-green-400 font-bold">${game.price}</span>
                <div className="flex gap-6 mt-10">
                  <Link to={`/addingtocart/${game.id}`}>
                    <IoCartOutline className="text-green-500" size={30} />
                  </Link>
                  <IoMdHeartEmpty
                    onClick={() => favoriteHandle(game)}
                    className="text-red-500"
                    size={30}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
