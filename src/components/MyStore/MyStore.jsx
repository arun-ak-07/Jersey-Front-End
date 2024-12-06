import React, { useContext, useEffect, useState } from "react";
import "../MyStore/MyStore.css";
import { useNavigate } from "react-router-dom";
import Header from "../MyHomePage/Header";
import Footer from "../MyHomePage/Footer";
import { myContext } from "../context/context";
import AddToCarts from "../AddToCart/AddToCarts";
import AddToWishlist from "../MyWishList/AddToWishlist";
import { Container, Spinner } from "react-bootstrap";


export default function MyStore() {
  const nav = useNavigate();
  const {
    myJersey,
    prodDisp,
    setProdDdisp,
    token,
  } = useContext(myContext);
  console.log("Jerseys", myJersey)
  console.log("token", token);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(myJersey){
      setLoading(false)
    }
  }, [myJersey])

  function displayProdDetails(products) {
    if (prodDisp.includes(products)) {
      // setProdDdisp(prodDisp.filter((shoe) => shoe !== products))
    } else {
      setProdDdisp([products]);
    }
    nav("/ProductDisplay");
  }

  return (
    <div className="amain">
      <Header />

      <hr
        style={{
          widows: "100%",
        }}
      />

      <div className="aacenter">

      {loading ? (
          <Container className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
            <Spinner animation="border" role="status" variant="primary" size="lg">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Container>
        ) : (
          <div className="amain-card">
          {myJersey ? (
            myJersey?.map((data, index) => (
              <div
                class="card"
                style={{
                  height: "600px",
                  width: "400px",
                  marginBottom: "40px",
                  border: "10px bold black",
                  cursor:'pointer',
                  padding:'2px',
                }}
              >
                <div className="d-flex justify-content-end w-100"><AddToWishlist data={data}/></div>

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
            ))
          ) : (
            <h2>No Results Found!!!!</h2>
          )}
        </div>
        )}
      </div>

      <hr style={{ width: "100%", marginTop: "50px" }} />

      <Footer />
    </div>
  );
}
