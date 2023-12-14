import Home from "./Pages/Home/Home"
import Cart from "./Pages/Cart/Cart"
import Favorites from "./Pages/Favorites/Favorites"
import AddingToCart from "./Pages/AddingToCart/AddingToCart"

let routes = [
    {path : "/" , element : <Home/>} ,
    {path : "/cart" , element : <Cart/>},
    {path : "/favorites" , element : <Favorites/>},
    {path : "/addingtocart/:id" , element : <AddingToCart/>}  
]




export default routes