import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { myContext } from './components/context/context';
import { useEffect, useState } from 'react';
import { slideUpdateLinks,categoryListImage } from './MyJerseyList';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ShopByTeams from './components/ShopByTeams/ShopByTeams';
import MyStore from './components/MyStore/MyStore';
import MyHomePage from '../src/components/MyHomePage/MyHomePage'
import ShopBySpecialEditions from './components/ShopBySpecialEditions/ShopBySpecialEditions';
import ShopByNewArrivals from './components/ShopByNewArrivals/ShopByNewArrivals';
import ShopByPlayerEditions from './components/ShopByPlayerEditions/ShopByPlayerEditions';
import MyWishList from './components/MyWishList/MyWishList';
import AddToCart from './components/AddToCart/AddToCart';
import AdminPage from './components/AdminPage/AdminPage';
import AdminProducts from './components/AdminPage/AdminProducts';
import InterMiami from './components/Teams/InterMiami';
import RealMadrid from './components/ShopByTeams/RealMadrid';
import Arsenal from './components/ShopByTeams/Arsenal';
import ManchesterUnited from './components/ShopByTeams/ManchesterUnited';
import Liverpool from './components/ShopByTeams/Liverpool';
import Bayern from './components/ShopByTeams/Bayern';
import Alnassar from './components/ShopByTeams/Alnassar';
import Barcelona from './components/ShopByTeams/Barcelona';
import ProductDisplay from './components/ProductDisplay/ProductDisplay';
import SearchPage from './components/SearchPage/SearchPage';
import ManCity from './components/ShopByTeams/ManCity';
import UsersPage from './components/AdminPage/UsersPage';
import {Toaster} from 'react-hot-toast'
import axios from 'axios';
import {apiUrl} from '../../../frontend/my-project/src/utils/api'

function App() {
  // const [myPlayers,setMyPlayers] =useState(myPlayersData)
  const [categoryImage,setCategoryImage] = useState(categoryListImage)
  const [imageLink,setImageLink] = useState(slideUpdateLinks)
  
  const [myJersey,setMyJersey] = useState([])
  const [specialEditions,setSpecialEditions] = useState([])
  const [newArrivals,setNewArrivals] = useState([])
  const [playerEditions,setPlayerEditions] = useState([])
  const [shopByteams,setShopByTeams] = useState([]) 
  const [likeProducts,setLikeProducts] = useState([])
  // Total
  const [cartProducts,setCartProducts] = useState([])
  const [productTotal,setProductTotal] = useState(0)
  const [cartQuantity,setCartQuantity] = useState(1)
  const [tot,setTot] = useState(0)
  // Teams
  const [interMiami,setInterMiami] = useState([])
  const [realMadrid,setRealMadrid] = useState([])
  const [arsenal,setArsenal] = useState([])
  const [manchesterUnited,setManchesterUnited] = useState([])
  const [liverpool,setLiverpool] = useState([])
  const [bayern,setBayern] = useState([])
  const [alnassar,setAlnassar] = useState([])
  const [barcelona,setBarcelona] = useState([])
  const [manchesterCity,setManchesterCity] = useState([])
  // TEAMS
  // Product Display
  const [prodDisp,setProdDdisp] = useState([])
// Search Items
    const [searchQuery, setSearchQuery] = useState("")
    // const [filteredUsers, setFilteredUsers] = useState(myJerseys)
    const [searchItem,SetSearchItem] = useState("")
    const [itemSearch,setItemSearch] = useState([])
// Banned User
  const [bannedUser,setBannedUser] = useState([])
  // button Name Change
  const [btnName,setBtnName] = useState("Add To Cart")
  // Color Change
  const [colors, setColors] = useState("green");
  // button Color
  const [buttonStyle, setButtonStyle] = useState({ backgroundColor: 'green' });

  const [token,setToken] = useState('')

 const values = {categoryImage,setCategoryImage,imageLink,setImageLink,myJersey,setMyJersey,
  specialEditions,setSpecialEditions,newArrivals,setNewArrivals,playerEditions,setPlayerEditions,shopByteams,setShopByTeams,
  likeProducts,setLikeProducts,cartProducts,setCartProducts,productTotal,setProductTotal,cartQuantity,setCartQuantity,
  interMiami,setInterMiami,realMadrid,setRealMadrid,arsenal,setArsenal,manchesterUnited,setManchesterUnited,liverpool,setLiverpool,bayern,setBayern,
  alnassar,setAlnassar,barcelona,setBarcelona,manchesterCity,setManchesterCity,
  // myPlayers,setMyPlayers
  prodDisp,setProdDdisp,tot,setTot,searchQuery,setSearchQuery,searchItem,SetSearchItem,
  itemSearch,setItemSearch,bannedUser,setBannedUser,btnName,setBtnName,colors, setColors,buttonStyle, setButtonStyle,token,setToken
}

useEffect(() => {
  getProducts()
  const tokens = localStorage.getItem("token")
  setToken(tokens)
}, [])

const getProducts = async () => {
  try{

      const response = await axios.get(`${apiUrl}/api/product/getProduct`)
      const data = response.data.products
      console.log("response", data)
      setMyJersey(data)

  }catch(error){
      console.log(error)
  }
}

const userId = localStorage.getItem("userId");

useEffect(() => {
  getCartProducts()
  const tokens = localStorage.getItem("token")
  setToken(tokens)
}, [])

const getCartProducts = async () => {
  try{
  
      const response = await axios.get(`${apiUrl}/api/user/getCart/${userId}`)
      const data = response.data.cart.cart
      console.log("response", data)
      setCartProducts(data)

  }catch(error){
      console.log(error)
  }
}

useEffect(() => {
  getWishlistProducts()
}, [])

const getWishlistProducts = async () => {
  try{

      const response = await axios.get(`${apiUrl}/api/user/getWishlist/${userId}`)
      const data = response.data.wishlist.wishlist
      console.log("response", data)
      setLikeProducts(data)

  }catch(error){
      console.log(error)
  }
}

  return (
    <div className="App">
      <BrowserRouter>
      <myContext.Provider value={values}>
        <Routes>
          <Route path='/' element={<MyHomePage/>}/>
          <Route path='/SignIn' element={<SignIn/>}/>
          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path='/MyStore' element={<MyStore/>}/>
          <Route path='/ShopByTeams' element={<ShopByTeams/>}/>
          <Route path='/ShopBySpecialEditions' element={<ShopBySpecialEditions/>}/>
          <Route path='/ShopByNewArrivals' element={<ShopByNewArrivals/>}/>
          <Route path='/ShopByPlayerEditions' element={<ShopByPlayerEditions/>}/>
          <Route path='/MyWishList' element={<MyWishList/>}/> 
          <Route path='/AddToCart' element={<AddToCart/>}/> 

          <Route path='/AdminPage' element={<AdminPage/>}/> 
          <Route path='/AdminProducts' element={<AdminProducts/>}/> 

          {/* TEAMS */}
          
          <Route path='/InterMiami' element={<InterMiami/>}/> 
          <Route path='/RealMadrid' element={<RealMadrid/>}/> 
          <Route path='/Arsenal' element={<Arsenal/>}/> 
          <Route path='/ManchesterUnited' element={<ManchesterUnited/>}/> 
          <Route path='/Liverpool' element={<Liverpool/>}/> 
          <Route path='/Bayern' element={<Bayern/>}/> 
          <Route path='/Alnassar' element={<Alnassar/>}/> 
          <Route path='/Barcelona' element={<Barcelona/>}/> 
          <Route path='/ManchesterCity' element={<ManCity/>}/> 

  

          {/* Product Display */}
          <Route path='/ProductDisplay' element={<ProductDisplay/>}/> 
          {/* Search Page */}
          <Route path='/SearchPage' element={<SearchPage/>}/> 
          {/* Admin USers */}
          <Route path='/UsersPage' element={<UsersPage/>}/> 

        </Routes>
        <Toaster />
        </myContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;