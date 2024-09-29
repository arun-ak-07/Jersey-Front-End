import React, { useContext, useEffect, useState } from "react";
import "../ShopBySpecialEditions/ShopBySpecialEditions.css";
import { myContext } from "../context/context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../MyHomePage/Header";
import Footer from "../MyHomePage/Footer";
import AddToCarts from "../AddToCart/AddToCarts";
import AddToWishlist from "../MyWishList/AddToWishlist";
import axios from "axios";
import { apiUrl } from "../../utils/api";

export default function ShopBySpecialEditions() {
  const nav = useNavigate();
  const {
    specialEditions,
    setSpecialEditions,
    myJersey,
    prodDisp,
    setProdDdisp,
  } = useContext(myContext);

  useEffect(() => {
    getProducts()
  }, [])
  
  const getProducts = async () => {
    try{
  
        const response = await axios.get(`${apiUrl}/api/product/getProduct`)
        const data = response.data.products
        console.log("response", data)
        setSpecialEditions(data.filter((data) => data.category === "Special Edition Jersey"))
  
    }catch(error){
        console.log(error)
    }
  }
  
  // Display Product Details

  function displayProdDetails(products) {
    if (prodDisp.includes(products)) {
      // setProdDdisp(prodDisp.filter((shoe) => shoe !== products))
    } else {
      setProdDdisp([products]);
    }
    nav("/ProductDisplay");
  }

  return (
    <div className="main1">
      <Header />

      <hr style={{ widows: "100%" }} />

      <div className="centerc111">
        <div className="imagec1">
          <img
            src="https://dms.mydukaan.io/original/webp/media/e0b7acf0-c044-48b5-ac57-cc7e0bffbd78.blob"
            alt=""
          />
        </div>
        <div className="imageTitlec1">
          <p>
            Special Editions<h5>({specialEditions.length} items)</h5>
          </p>
        </div>
        <div>
          <p style={{ color: "grey", letterSpacing: 1 }}>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              Home
            </Link>{" "}
            &nbsp;/ &nbsp;Special Editions
          </p>
        </div>

        <div className="center-items1">
          <div className="amain-card1">
            {specialEditions.map((data, index) => (
              <div
                class="card"
                style={{
                  height: "600px",
                  width: "400px",
                  marginBottom: "40px",
                  border: "10px bold black",
                }}
              >
               
               <AddToWishlist data={data}/>
               
                <div style={{ overflow: "hidden" }} className="acard-image">
                  <img
                    class="card-img-top"
                    onClick={() => displayProdDetails(data)}
                    src={data.image}
                    alt="Card image cap"
                  />
                </div>
                <div class="card-body" style={{ width: "100%" }}>
                  <h5
                    class="card-title card_text product-title medium t-16_24 mt-15_20 mb8 lineClamp dkn-product-card-name"
                    style={{ fontSize: "16px", lineHeight: "24px" }}
                  >
                    {data.name}
                  </h5>
                  <p class="card-text">₹{data.price}</p>
                  
                  <AddToCarts data={data}/>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr style={{ widows: "100%" }} />

      <Footer />
    </div>
  );
}
