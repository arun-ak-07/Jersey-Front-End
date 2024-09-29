import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { myContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {apiUrl} from '../../utils/api'

const AddToCarts = ({data}) => {

  const { cartProducts, setCartProducts, token } = useContext(myContext);
  
  const userId = localStorage.getItem("userId");
  console.log("cartsss", cartProducts)
  const nav = useNavigate()

  const clicksForAddCart = async (products) => {
    try {
      if (token === null) {
        nav("/SignIn");
      } else {

        const response = await axios.put(`${apiUrl}/api/user/addToCart/${userId}`,{
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
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
    } else {
        toast.error('An error occurred. Please try again.');
    }
    }
  }

  return (
    <>
      <Button className="acard-button" style={{width:'100%'}} onClick={() => clicksForAddCart(data)}>
        {/* {btnName} */}
        {cartProducts.includes(data) ? "Added" : "Add to cart"}
      </Button>
    </>
  );
};

export default AddToCarts;
