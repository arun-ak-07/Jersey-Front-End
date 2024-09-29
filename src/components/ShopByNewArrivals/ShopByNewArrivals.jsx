import React, { useContext, useState, useEffect } from "react";
import "./ShopByNewArrivals.css";
import { myContext } from "../context/context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../MyHomePage/Header";
import Footer from "../MyHomePage/Footer";
import AddToCarts from "../AddToCart/AddToCarts";
import AddToWishlist from "../MyWishList/AddToWishlist";
import axios from "axios";
import { apiUrl } from "../../utils/api";

export default function ShopByNewArrivals() {
  const nav = useNavigate();
  const {
    newArrivals,
    setNewArrivals,
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
        setNewArrivals(data.filter((data) => data.category === "New Arrivals"))
  
    }catch(error){
        console.log(error)
    }
  }

  const [colors, setColors] = useState("red");

  function displayProdDetails(products) {
    if (prodDisp.includes(products)) {
      // setProdDdisp(prodDisp.filter((shoe) => shoe !== products))
    } else {
      setProdDdisp([products]);
    }
    nav("/ProductDisplay");
  }

  return (
    <div className="main222">
      <Header />

      <hr style={{ widows: "100%" }} />

      <div className="centerc222">
        <div className="imagec2">
          <img className="imageARr"
            src="https://dukaan.b-cdn.net/1440x1440/webp/upload_file_service/be9aca54-83d9-46ec-bb25-b294b562acb3/image.png"
            alt=""
          />
        </div>
        <div className="imageTitlec2">
          <p>
            New Arrivals<h5>({newArrivals.length} items)</h5>
          </p>
        </div>
        <div>
          <p style={{ color: "grey", letterSpacing: 1 }}>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              Home
            </Link>{" "}
            &nbsp;/ &nbsp;NEW ARRIVALS
          </p>
        </div>

        <div className="center-items2">
          <div className="amain-card20">
            {newArrivals.map((data, index) => (
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

      <Footer/>

    </div>
  );
}
