import React, { useContext, useState } from "react";
import "../MyStore/MyStore.css";
import { myContext } from "../context/context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import Header from "../MyHomePage/Header";
import Footer from "../MyHomePage/Footer";
import toast from "react-hot-toast";
import AddToCarts from "../AddToCart/AddToCarts";
import AddToWishlist from "../MyWishList/AddToWishlist";

export default function SearchPage() {
  const nav = useNavigate();
  const {
    itemSearch,
    likeProducts,
    setLikeProducts,
    cartProducts,
    setCartProducts,
    prodDisp,
    setProdDdisp,
    token,
  } = useContext(myContext);
  // WISH ITEMS
  const [totalPrice, setTotalPrice] = useState(0);

  function clicksForWish(products, index) {
    console.log("wish btn clicked");
    if (token === null) {
      toast.error("SignIn First");
    } else {
      if (likeProducts.includes(products)) {
        setLikeProducts(likeProducts.filter((shoe) => shoe !== products));
        toast.success("Item Removed From Wish List");
      } else {
        toast.success("Item Added To Wish List");
        setLikeProducts([...likeProducts, products]);
      }
    }
  }

  // CART ITEMS
  function clicksForAddCart(products) {
    if (token === null) {
      toast.error("SignIn First");
    } else {
      if (cartProducts.includes(products)) {
        // setCartProducts(cartProducts.filter((shoe) => shoe !== products))
      } else {
        setCartProducts([...cartProducts, products]);
      }
    }
  }
  // Display Product Details

  function displayProdDetails(products) {
    if (prodDisp.includes(products)) {
      setProdDdisp(prodDisp.filter((shoe) => shoe !== products));
    } else {
      setProdDdisp([...prodDisp, products]);
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
        <div className="amain-card">
          {itemSearch.length !== 0 ? (
            <>
              {itemSearch.map((data, index) => (
                <div
                  class="card"
                  style={{
                    height: "600px",
                    width: "400px",
                    marginBottom: "40px",
                    border: "10px bold black",
                  }}
                >
                  {/* <Link><CiHeart onClick={() => clicksForWish(data)} style={{ height: '35px', width: '35px', marginLeft: '360px' }} /></Link> */}
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
            </>
          ) : (
            <>
              <h2>No Results Found</h2>
            </>
          )}
        </div>
      </div>

      <hr style={{ width: "100%", marginTop: "50px" }} />

      <Footer />
    </div>
  );
}
