import React, { useContext, useState, useEffect } from "react";
import "../Teams/InterMiami.css";
import { myContext } from "../context/context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../MyHomePage/Header";
import AddToWishlist from "../MyWishList/AddToWishlist";
import Footer from "../MyHomePage/Footer";
import AddToCarts from "../AddToCart/AddToCarts";
import axios from "axios";
import TeamLogos from "./TeamLogos";
import { apiUrl } from "../../utils/api";

export default function Barcelona() {
  const nav = useNavigate();
  const { prodDisp, setProdDdisp } = useContext(myContext);

  const [shopByProducts, setShopByProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/product/getProduct`
      );
      const data = response.data.products;
      console.log("response", data);
      setShopByProducts(data.filter((data) => data.name.includes("Barcelona")));
    } catch (error) {
      console.log(error);
    }
  };

  function displayProdDetails(products) {
    if (prodDisp.includes(products)) {
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
            src="https://dms.mydukaan.io/original/webp/media/0a3d7bde-f4d1-49cb-8dc5-840a4f3ed2ee.blob"
            alt=""
          />
        </div>
        <div className="imageTitlec">
          <p>
            Shop By Teams<h5>({shopByProducts.length} items)</h5>
          </p>
        </div>
        <div>
          <p style={{ color: "grey", letterSpacing: 1 }}>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              Home
            </Link>{" "}
            &nbsp;/ &nbsp;FC Barcelona
          </p>
        </div>

        <TeamLogos />

        <div className="center-items5">
          <div className="amain-card05">
            {shopByProducts.map((data, index) => (
              <div
                className="card5"
                class="card"
                style={{
                  marginBottom: "40px",
                  height: "600px",
                  width: "400px",
                }}
              >
                {/* <Link><CiHeart onClick={() => clicksForWish(data)} style={{ height: '35px', width: '35px', marginLeft: '360px' }} /></Link> */}

                <AddToWishlist />

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

                  <AddToCarts />
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
