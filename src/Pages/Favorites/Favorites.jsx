import React from "react";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function Favorites() {
  const { favorites, setFavorites } = useContext(AppContext);

  const removeHandle = (game) => {
    let newFavorites = favorites.filter((favorite) => favorite.id !== game.id);
    setFavorites(newFavorites);
  };

  return (
    <div className="h-screen w-full bg-black p-5 lg:p-28">
      <div className="bg-[#141414] w-full h-full rounded-md p-5 flex flex-col gap-7">
        <h2 className="text-white text-xl lg:text-3xl before:opacity-50 font-bold italic z-50 relative before:absolute before:w-1/3 before:h-[10px] before:bg-gradient-to-r before:from-red-600 before:to-transparent before:top-1/3 before:-z-50 before:rounded-sm">
          Favorites
        </h2>
        {!favorites.length && (
          <p className="text-white bg-red-600 p-5 text-center font-bold rounded-md" >Nothing yet....</p>
        )}
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-3">
          {favorites &&
            favorites.map((favorite) => (
              <img
                key={favorite.id}
                src={favorite.bgImg}
                className="rounded-md cursor-pointer"
                onClick={() => removeHandle(favorite)}
                alt=""
              />
            ))}
        </div>
      </div>
    </div>
  );
}
