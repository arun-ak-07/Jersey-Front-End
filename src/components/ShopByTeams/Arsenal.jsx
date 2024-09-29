import React, { useContext, useState, useEffect } from "react";
import "../Teams/InterMiami.css";
import { myContext } from "../context/context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../MyHomePage/Footer";
import Header from "../MyHomePage/Header";
import axios from "axios";
import AddToCarts from "../AddToCart/AddToCarts";
import AddToWishlist from "../MyWishList/AddToWishlist";
import TeamLogos from "./TeamLogos";
import { apiUrl } from "../../utils/api";

export default function Arsenal() {
  const nav = useNavigate();
  const { arsenal, setArsenal, prodDisp, setProdDdisp } = useContext(myContext);

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
      setArsenal(data.filter((data) => data.name.includes("Arsenal")));
    } catch (error) {
      console.log(error);
    }
  };
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
            src="https://dms.mydukaan.io/original/webp/media/90a01f65-b4ac-4f3f-9903-2f8cbf6f0c50.blob"
            alt=""
          />
        </div>
        <div className="imageTitlec">
          <p>
            Shop By Teams<h5>({arsenal.length} items)</h5>
          </p>
        </div>
        <div>
          <p style={{ color: "grey", letterSpacing: 1 }}>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              Home
            </Link>{" "}
            &nbsp;/ &nbsp;Arsenal
          </p>
        </div>

        <TeamLogos />

        <div className="center-items5">
          <div className="amain-card05">
            {arsenal.map((data, index) => (
              <div
                className="card5"
                class="card"
                style={{
                  marginBottom: "40px",
                  height: "600px",
                  width: "400px",
                }}
              >
                <AddToWishlist data={data} />

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

                  <AddToCarts data={data} />
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
