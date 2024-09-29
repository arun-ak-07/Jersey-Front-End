import React, { useContext, useState, useEffect } from "react";
import '../AddToCart/AddToCart.css'
import Nav from "react-bootstrap/Nav";
import lionImage from "../images/ar7.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from '../context/context';
import axios from "axios";
import toast from "react-hot-toast";
import {apiUrl} from '../../utils/api'

export default function AddToCart() {
  const {  cartProducts, setCartProducts, tot, setTot
  } = useContext(myContext)
  const nav = useNavigate()

  const userId = localStorage.getItem("userId");
  
  const removeWishList = async (datas) => {
   try {
    
     // setCartProducts(cartProducts.filter((data, i) => i !== index));
     const response = await axios.post(`${apiUrl}/api/user/removeCart/${userId}`,
      {productId:datas._id})

     const data = response.data.cart.cart
     setCartProducts(data)
     if(response.status === 200){
      toast.success(response.data.message);
    }else{
      toast.error(response.data.error);
    }

     const newTot = parseInt(tot) - data.price * data.quantity;
     setTot(newTot);

   } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
  } else {
      toast.error('An error occurred. Please try again.');
  }
   }
  }

 

  const IncreementBtn = async (data) => {
    try{

      const response = await axios.put(`${apiUrl}/api/user/increementCartQuantity/${userId}`,{
        productId:data._id
      })
      const datas = response.data.cart
      console.log("response", response.data.cart)
      if(response.status === 200){
        setCartProducts(datas)
      }

    }
    catch(error){
      console.log(error)
    }
  }

  function DecreementBtn(id){
    const newQty = cartProducts.map((item) => 
    item.id === id?{...item,qty:item.qty-1}:item
    )

    

    setCartProducts(newQty)
  }

  const calculateTotal = () => {
    return cartProducts.reduce((total,item) => total + item.price * item.qty,0)
  }
  const amount = calculateTotal()

  return (
    <div className="mainf">

      <div className="topf">
        <Nav className="top-mainf">
          <p className="topmain-textf">Now Enjoy All India Free Shipping On Every Order</p>
        </Nav>
        <div className="signIn-logof">
          <Link to={'/'}><img src={lionImage} height={100} width={100} alt="" /></Link>
        </div>
      </div>
      <hr style={{ widows: '100%' }} />

      <div className="centerfAddToCart">
        {cartProducts == "" ? (

          <div className="centerf1AddToCart">

            <div className="center-textf1"><h4>Your Cart is empty</h4></div>
            <div className="center-textf2" style={{ marginBottom: '25px' }}><p>Looks like you haven't made your choice yet..</p></div>
            <button className="btnf" onClick={() => nav('/')}>Back to Home Page</button>

          </div>

        ) : (
          <div className="centerf2AddToCart">

            <div className="amain-card1aAddToCart">
              {
                cartProducts.map((data, index) => (
                  <div class="card1aAddToCart" key={data.id}>

                    <div className="card1a-leftAddToCart">
                      <img className="dataImage" src={data.image} alt="" style={{ height: '260px', width: '100%' }} />
                    </div>
                    <div className="card1a-rightAddToCart">
                      <div className="removeButtonAddToCart"><Link style={{ textDecoration: 'none' }}><p style={{ fontSize: '16px', color: 'grey', letterSpacing: '1px' }} onClick={() => removeWishList(data)}>REMOVE</p></Link></div>
                      <div className="data11AddToCart"><h2 className="dataName">{data.name}</h2></div>
                      <div className="data12AddToCart"><h2 className="dataPrice">₹{data.price*data.qty}</h2></div>
                      
                        {/* <CartDropDown  quantity={data.quantity} onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)} /> */}
                        <div className="dropDwonQuantity" style={{display:'flex',flexDirection:'row',marginBottom: '60px' }}> 
                        <button onClick={()=>data.qty>1 ? DecreementBtn(data.id) : removeWishList} style={{border:'none'}}>-</button> &nbsp;
                        <button  style={{borderRadius:'20px',height:'30px',width:'30px'}} >{data.qty}</button>&nbsp;
                        <button onClick={()=>IncreementBtn(data)} style={{border:'none'}}>+</button></div>
                      
                    </div>

                  </div>
                ))
              }
            </div>

            <div className="amain-card2aAddToCart">

              <div className="amain-card2aAddToCart-top">
                <div style={{ paddingLeft: '50px', marginTop: '10px' }}><h4>PRICE DETAILS</h4></div>
              </div>

              <div className="amain-card2aAddToCart-center">
                
                <div className="pricez" style={{ paddingLeft: '50px', marginTop: '5px', display: 'flex', flexDirection: 'row' }}><p>Price ({cartProducts.length} item)</p><p style={{ marginLeft: '235px' }}>₹{amount}</p></div>
                
                <div style={{ paddingLeft: '50px', display: 'flex', flexDirection: 'row' }}><p>Delivery Charges</p><p style={{ textDecoration: 'line-through', marginLeft: '180px' }}>₹ 40</p>&nbsp; <p style={{ color: 'green' }}>FREE</p></div>
              </div>

              <div className="amain-card2aAddToCart-bottom">
                <div className="grandTOTal" style={{ paddingLeft: '50px', marginTop: '5px', display: 'flex', flexDirection: 'row' }}><p>Grand Total</p><p style={{ marginLeft: '244px' }}>₹{amount}</p></div>
                <div style={{ paddingLeft: '50px' }}><p>Inclusive of all taxes</p></div>
                <div style={{ paddingLeft: '50px' }}><p>Average delivery time: 7-9 days</p></div>
              </div>

              <div className="amain-card2aAddToCart-button" style={{ padding: '5px' }}>
                <div ><button class="btn btn-dark" style={{ width: '100%' }}>Continue</button></div>
              </div>

            </div>



          </div>
        )
        }
      </div>
    </div>
  )
}