import React, { useContext } from "react";
import "../MyWishList/MyWishList.css";
import Nav from "react-bootstrap/Nav";
import lionImage from "../images/ar7.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../context/context";
import axios from "axios";
import toast from "react-hot-toast";
import {apiUrl} from '../../utils/api'

export default function MyWishList() {
  const nav = useNavigate();
  const { likeProducts, setLikeProducts } = useContext(myContext);
  const userId = localStorage.getItem("userId");

  const removeWishList = async (datas) => {
    try {
      
      const response = await axios.post(`${apiUrl}/api/user/removeWishList/${userId}`,{
        productId:datas._id
      })

      const data = response.data.wishlist.wishlist

      setLikeProducts(data)
      if(response.status === 200){
        toast.success(response.data.message)
      }
      else{
        toast.error(response.data.error)
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
    } else {
        toast.error('An error occurred. Please try again.');
    }
    }
  }
console.log("Wishlists", likeProducts);
  return (
    <div className="mainf">
      <div className="topf">
        <Nav className="top-mainf">
          <p className="topmain-textf fs-6">
            Now Enjoy All India Free Shipping On Every Order
          </p>
        </Nav>
        <div className="signIn-logof">
          <Link to={"/"}>
            <img src={lionImage} height={100} width={100} alt="" />
          </Link>
        </div>
      </div>
      <hr style={{ widows: "100%" }} />

      <div className="centerf">
        {likeProducts == "" ? (
          <div className="centerf1">
            <div className="center-textf1">
              <h4>Your wishlist is empty</h4>
            </div>
            <div className="center-textf2" style={{ marginBottom: "25px" }}>
              <p>Looks like you haven't made your choice yet..</p>
            </div>
            <button className="btnf" onClick={() => nav("/MyStore")}>
              Back to Store
            </button>
          </div>
        ) : (
          <div className="centerf2">
            <div className="amain-card1a">
              {likeProducts.map((data) => (
                <div class="card1a">
                  <div className="card1a-left">
                    <img
                      src={data.image}
                      className="wishImg"
                      alt=""
                    />
                  </div>
                  <div className="card1a-right">
                    <div className="removeButton">
                      <Link style={{ textDecoration: "none" }}>
                        <p
                          style={{
                            fontSize: "16px",
                            color: "grey",
                            letterSpacing: "1px",
                          }}
                          onClick={() => removeWishList(data)}
                        >
                          REMOVE
                        </p>
                      </Link>
                    </div>
                    <div className="data11">
                      <h2 className="wishTxt">{data.name}</h2>
                    </div>
                    <div className="data12">
                      <h2 className="wishTxt">{data.price} Rs</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
