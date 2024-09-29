import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { CiHeart } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import { myContext } from '../context/context';
import axios from 'axios';
import {apiUrl} from '../../utils/api'
import './MyWishList.css'

const AddToWishlist = ({data}) => {

    const nav = useNavigate();
    const {
      setLikeProducts,
      likeProducts,
      token,
    } = useContext(myContext);

    console.log("token", token)
    const userId = localStorage.getItem("userId");

    const clicksForWish = async (products) => {
      try {
        console.log("wish btn clicked");
        if (token === null) {
          toast.error("SignIn First");
          nav("/SignIn");
        } else {

          const response = await axios.put(`${apiUrl}/api/user/addToWishlist/${userId}`,{
            productId:products._id, 
            name:products.name, 
            price:products.price, 
            image:products.image, 
            qty:products.qty
          })
  
          if(response.status === 200){
            toast.success(response.data.message);
          }else{
            toast.error(response.data.error);
          }
        }
      }
      catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
      } else {
          toast.error('An error occurred. Please try again.');
      }
      }
      }

  return (
    <>
      <Link>
                  <CiHeart
                    onClick={() => clicksForWish(data)}
                    className='wishlistLogo'
                    style={{
                      height: "35px",
                      width: "35px",
                      // marginLeft: "360px",
                      color: likeProducts.includes(data) ? "red" : "green",
                    }}
                  />
        </Link>
    </>
  )
}

export default AddToWishlist
