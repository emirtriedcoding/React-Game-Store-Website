import { useContext, useState } from "react";
import { AppContext } from "../../App";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const { addedGames, setAddedGames } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const totalAmount = addedGames.reduce((acc, game) => acc + game.price, 0);

  const deleteHandle = (id) => {
    let newGames = addedGames.filter((game) => game.id !== id);
    setAddedGames(newGames);
  };

  const handlePay = () => {
    if (!addedGames.length) {
      return;
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toast.success("Success !", {
          style: {
            fontFamily: "Poppins, sans-serif",
            fontSize: "15px",
            borderRadius: "18px"
          },
        });
        setAddedGames([]);
      }, 2000);
    }
  };

  return (
    <div className="w-full bg-black flex flex-col gap-10 items-center justify-center h-screen">
      <div className="overflow-x-auto w-[400px] lg:w-full lg:flex lg:justify-center">
       {addedGames.length ? (
         <table className="rounded-md overflow-hidden">
         <thead className="bg-[#242424] text-gray-500">
           <tr >
             <th className="px-8 py-3">Game</th>
             <th className="px-8 py-3">Category</th>
             <th className="px-8 py-3">Price</th>
             <th className="px-8 py-3">Device</th>
             <th className="px-8 py-3">Action</th>
           </tr>
         </thead>
         <tbody className="text-gray-400">
           {addedGames && 
             addedGames.map((addedGame) => (
               <tr key={addedGame.id} className="bg-[#141414]">
                 <td className="px-4  lg:px-8 py-3 font-bold text-[#00CED1] text-sm lg:text-base">
                   {addedGame.name}
                 </td>
                 <td className="px-8 py-3">{addedGame.cat}</td>
                 <td className="px-8 py-3 text-green-600 ">
                   ${addedGame.price}
                 </td>
                 <td className="px-8 py-3">
                   {addedGame.isAvailable.map(
                     (device) =>
                       device.active && (
                         <span key={device.id}>{device.for}</span>
                       )
                   )}
                 </td>
                 <td className="px-8 py-3">
                   <button
                     onClick={() => deleteHandle(addedGame.id)}
                     className="bg-red-600 text-white px-8 py-2 rounded-md"
                   >
                     <MdOutlineDeleteOutline size={22} />
                   </button>
                 </td>
               </tr>
             ))}
         </tbody>
       </table>
       ) : <p className="text-white bg-red-600 lg:w-1/2 p-3 text-center rounded-md font-bold" >Nothing yet...</p> }
      </div>
      <div className="rounded-md flex gap-8 lg:justify-between items-center lg:w-1/4 bg-[#242424] px-10 py-4 text-gray-400">
        <div className="flex gap-3 items-center">
          <span>Total : </span>
          <span className="text-green-600">${totalAmount.toFixed(2)}</span>
        </div>
        <button
          onClick={handlePay}
          className="px-4 py-1 bg-[#00CED1] rounded-md text-black"
          disabled={loading}
        >
          {loading ? <VscLoading className="animate-spin" /> : "Pay"}
        </button>
      </div>
      <ToastContainer
       draggable
       position="top-left"
       theme="dark"
       autoClose={1500}
      />
    </div>
  );
}
