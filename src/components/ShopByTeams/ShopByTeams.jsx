import React, { useContext, useEffect } from "react";
import "../ShopByTeams/ShopByTeams.css";
import { myContext } from "../context/context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../MyHomePage/Header";
import Footer from "../MyHomePage/Footer";
import AddToCarts from "../AddToCart/AddToCarts";
import AddToWishlist from "../MyWishList/AddToWishlist";
import axios from "axios";
import TeamLogos from "./TeamLogos";
import { apiUrl } from "../../utils/api";

export default function ShopByTeams() {
  const nav = useNavigate();
  const {
    shopByteams,
    setShopByTeams,
    prodDisp,
    setProdDdisp,
    myJersey
  } = useContext(myContext);

  useEffect(() => {
    getProducts()
  }, [])
  
  const shopByteamz = [...new Set (myJersey.map(data => data.name ))]
  
  console.log("shopBY", shopByteamz)

  const getProducts = async () => {
    try{
  
        const response = await axios.get(`${apiUrl}/api/product/getProduct`)
        const data = response.data.products
        console.log("response", data)
        setShopByTeams(data.filter((data) => data.category === "Shop By Teams"))
  
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
    <div className="mainc">
      <Header />

      <hr style={{ widows: "100%" }} />

      <div className="centerc5">
        <div className="imagec">
          <img
            src="https://dms.mydukaan.io/original/webp/media/50b3f49f-6d30-47a3-9968-076d6018dc48.blob"
            alt=""
          />
        </div>
        <div className="imageTitlec">
          <p>
            Shop By Teams<h5>({shopByteams.length} items)</h5>
          </p>
        </div>
        <div>
          <p style={{ color: "grey", letterSpacing: 1 }}>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              Home
            </Link>{" "}
            &nbsp;/ &nbsp;Shop By Teams
          </p>
        </div>

       <TeamLogos/>

        <div className="center-items5">
          <div className="amain-card5">
            {shopByteams.map((data, index) => (
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

      <hr style={{ width: "100%", marginTop: "50px" }} />

      <Footer />
    </div>
  );
}
