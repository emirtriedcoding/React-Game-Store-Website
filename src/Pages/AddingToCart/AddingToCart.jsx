import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function AddingToCart() {
  const { id } = useParams();
  const index = Number(id) - 1;
  const [game, setGame] = useState(null);
  const { addedGames, setAddedGames } = useContext(AppContext);

  const fetchData = () => {
    fetch("http://localhost:5173/data/gamesData.json")
      .then((res) => res.json())
      .then((data) => {
        setGame(data[index]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (selectedDevice) => {
    const updatedDevices = game.isAvailable.map((device) => ({
      ...device,
      active: device === selectedDevice,
    }));

    setGame((prevGame) => ({
      ...prevGame,
      isAvailable: updatedDevices,
    }));
  };

  const addHandle = (game) => {
    setAddedGames((prevGames) => [...prevGames, game]);
  };

  return (
    <div className="bg-black flex items-center justify-center py-40 px-5 lg:px-0">
      {game && (
        <div
          className={`flex flex-col lg:flex-row w-full lg:w-[800px] rounded-lg bg-[#141414] relative pb-20 lg:pb-0`}
        >
          <div className="w-full lg:w-[300px]">
            <img
              src={game.prevImg}
              alt=""
              className="rounded-l-md lg:h-[500px]"
            />
          </div>
          <div className="p-5 w-full lg:w-1/2 flex flex-col items-start gap-4">
            <h2 className="relative z-50 text-white font-bold text-2xl before:absolute before:w-[400px] before:h-[10px] before:bg-gradient-to-r before:from-red-600 before:to-transparent before:top-1/3 before:-z-40 before:rounded-sm before:opacity-90">
              {game.name}
            </h2>
            <span className="bg-red-600 text-white px-2 py-1 text-sm rounded-md">
              {game.cat}
            </span>
            <p className="text-gray-400 leading-7 text-sm">{game.desc}</p>
            <h4 className="text-[#00CED1] font-bold">Select Your Device : </h4>
            <div className="flex gap-5">
              {game.isAvailable.map((device) => (
                <span
                  onClick={() => handleChange(device)}
                  className={`px-6 py-2 rounded-md cursor-pointer ${
                    device.active ? "bg-[#00CED1]" : "bg-white"
                  }`}
                  key={device.id}
                >
                  {device.for}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between w-full mt-7">
              <span className="text-green-600 font-bold text-2xl animate-pulse">
                ${game.price}
              </span>
              <Link
                to="/cart"
                onClick={() => addHandle(game)}
                className="bg-green-600 text-white px-6 py-2 rounded-md text-sm"
              >
                Add to Cart
              </Link>
            </div>
            <Link
              className="absolute bottom-5 right-5 bg-red-600 text-white px-8 py-1 rounded-md text-sm"
              to="/"
            >
              Back to The Home Page
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
