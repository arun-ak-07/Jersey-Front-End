import React, { useContext, useState } from "react";
import "../MyStore/MyStore.css";
import Button from "react-bootstrap/Button";
import { myContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import "../ProductDisplay/ProductDisplay.css";
import Modal from "../Modal/Modal";
import Header from "../MyHomePage/Header";
import Footer from "../MyHomePage/Footer";
import toast from "react-hot-toast";
import AddToCarts from "../AddToCart/AddToCarts";

export default function ProductDisplay() {
  const nav = useNavigate();

  const {
    prodDisp,
    cartProducts,
    setCartProducts,
    token
  } = useContext(myContext);

  function buyNow(products) {
    if (token === null) {
      toast.error("SignIn First");
    } else {
      if (cartProducts.includes(products)) {
        // setCartProducts(cartProducts.filter((shoe) => shoe !== products))
      } else {
        setCartProducts([...cartProducts, products]);
      }
      nav("/AddToCart");
    }
  }

  return (
    <div className="amain">

      <Header />

      <hr
        style={{
          widows: "100%",
        }}
      />

      <div className="a1acenter">
        {prodDisp.map((data, index) => (
          <div className="prodDisp">
            <div className="prod-leftSection">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{ margin: "40px" }}
                  src={data.image}
                  alt=""
                  height={500}
                  width={500}
                  className="prodImg"
                />
              </div>
              <div style={{ margin: "10px" }}>
                <img
                  src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/5a57ac2d-8d37-4f94-b949-62d86a1d5c0e/fan-size-chart.png"
                  height={250}
                  width={700}
                  alt=""
                  className="chartss"
                />
              </div>
            </div>

            <div className="prod-rightSection" style={{ padding: "30px" }}>
              <div>
                <h2
                  style={{
                    fontSize: "22px",
                    lineHeight: "28px",
                    fontWeight: "bold",
                  }}
                >
                  {data.name}
                </h2>
              </div>
              <div style={{ marginTop: "20px" }}>
                <p
                  style={{
                    fontSize: "24px",
                    lineHeight: "32px",
                    fontWeight: "500",
                  }}
                >
                  ₹{data.price}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className="sizes"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <p style={{ fontWeight: "bold" }}>Select Size</p>
                  <button className="BtnProd" style={{ marginLeft: "20px" }}>
                    S
                  </button>
                  <button className="BtnProd" style={{ marginLeft: "20px" }}>
                    M
                  </button>
                  <button className="BtnProd" style={{ marginLeft: "20px" }}>
                    X
                  </button>
                  <button className="BtnProd" style={{ marginLeft: "20px" }}>
                    XL
                  </button>
                  <button className="BtnProd" style={{ marginLeft: "20px" }}>
                    XLL
                  </button>
                </div>

                <div className="sizes">
                  <Modal />
                </div>
              </div>

              <div></div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                }}
                className="btnzzzz1"
              >
                <div>

                  <AddToCarts data={data} />

                </div>{" "}
                &nbsp;&nbsp;
                <div>
                  <Button
                    style={{ width: "200px", borderRadius: "0px" }}
                    className="acard-button"
                    onClick={() => buyNow(data)}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>

              <div
                class="trusted-badges-wrapper flex d-row"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                }}
              >
                <div class="trusted-badge">
                  <img
                    src="https://dukaan.b-cdn.net/original/dukaan-media/plugins/trusted_badges_v2/free-shipping.svg"
                    alt="badge"
                  />
                </div>

                <div class="trusted-badge">
                  <img
                    src="https://dukaan.b-cdn.net/original/dukaan-media/plugins/trusted_badges_v2/cod-available.svg"
                    alt="badge"
                  />
                </div>

                <div class="trusted-badge">
                  <img
                    src="https://dukaan.b-cdn.net/original/dukaan-media/plugins/trusted_badges_v2/premium-quality.svg"
                    alt="badge"
                  />
                </div>
              </div>

              <div style={{ marginTop: "40px" }}>
                <p>Products Details</p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px" }}>
                  Cash On Delivery (COD) Available
                </h4>
              </div>
              <div>
                <p>{data.description}</p>
              </div>
              <div>
                <p>Fitting - Regular/Parallel Fit</p>
              </div>
              <div>
                <p style={{ color: "grey" }}>Please Note</p>
              </div>
              <div>
                <ul>
                  <li>
                    Kindly refer to the size chart given at the last slide of
                    jersey images before placing the order
                  </li>
                  <li>
                    For further size assistance from our team, kindly DM us on
                    Instagram or WhatsApp
                  </li>
                  <li>
                    For any custom print requirements or bulk orders, kindly DM
                    us on Instagram or WhatsApp
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr style={{ width: "100%", marginTop: "50px" }} />

      <Footer/>
    </div>
  );
}
