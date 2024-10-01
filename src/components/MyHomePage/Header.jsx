import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../context/context";
import "../MyHomePage/Header.css"
import'./Header.css'
import BodyScroll from "../BodyScroll/BodyScroll";
import lionImage from '../images/ar7.jpeg'
import { Button, Form } from "react-bootstrap";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import {apiUrl} from '../../utils/api'



const Header = () => {
  const {
    myJersey,
    setSearchQuery,
    searchItem,
    SetSearchItem,
    setItemSearch,
    setLikeProducts,
    setCartProducts,
    cartProducts,
    searchQuery
  } = useContext(myContext);

  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  function serachInp(e) {
    SetSearchItem(e.target.value);
  }

  function handleSearchInputChange() {
    if (searchItem === "") {
      // nav('/')
    } else {
      const query = searchItem;
      setSearchQuery(query);
      const filteredResults = myJersey.filter((user) => {
        const { name, price, category } = user;
        return (
          name.toLowerCase().includes(query.toLowerCase()) ||
          price.toString().includes(query) ||
          category.toLowerCase().includes(query.toLowerCase())
        );
      });
      setItemSearch(filteredResults);
      nav("/SearchPage");
    }
  }

  const logoutBtn = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/logout/${userId}`
      );
      if (response.status === 200) {
        toast.success("logout succefully");
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        setCartProducts([])
        setLikeProducts([])
        nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hover = async () => {
    // alert("hello")
  }
  

  return (
    <div className="topbar">
      
      <Nav className="top-main00">
        <p className="topmain-text00">
          Now Enjoy All India Free Shipping On Every Order
        </p>
      </Nav>

      <Navbar expand="lg" collapseOnSelect className="bg-body-tertiary nav-style">
  <Container>
    <Link to={"/"}> 
      <img
        className="logos"
        onClick={() => nav("/")}
        src={lionImage}
        height={100}
        width={100}
        alt=""
      />
    </Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={hover} />

    <Navbar.Collapse id="responsive-navbar-nav">
      <Form className="d-flex formClass" >
        <Form.Control
          onChange={serachInp}
          type="search"
          placeholder="Search"
          className="me-2 search-input"
          aria-label="Search"
        />
        <Button
          variant="outline-info"
          value={searchQuery}
          onClick={handleSearchInputChange}
          className="search-button"
        >
          Search
        </Button>
      </Form>

      <Nav className="me-auto my-2 my-lg-0" style={{ marginLeft: "0px" }}>
        <Nav.Link
          style={{ fontWeight: "bold", color: "black" }}
          onClick={() => nav("/MyStore")}
        >
          My Store
        </Nav.Link>

        <BodyScroll />

        <Nav.Link
          style={{ fontWeight: "bold", color: "black" }}
          onClick={() => nav("/ProductDisplay")}
        >
          Support
        </Nav.Link>
        <Nav.Link
          style={{ fontWeight: "bold", color: "black",fontSize: "20px",  }}
          onClick={() => nav("/MyWishList")}
        >
          <FaHeart style={{fontSize:'20px',marginBottom:'10px'}} />
        </Nav.Link>

        {cartProducts.length === 0 ? (
          <Nav.Link
            style={{ fontWeight: "bold", color: "black" }}
            onClick={() => nav("/AddToCart")}
          >
            <FaShoppingCart style={{fontSize:'20px',marginBottom:'4px'}}/>
          </Nav.Link>
        ) : (
          <><div className="cartIcons">
            <Nav.Link
              style={{ fontWeight: "bold", color: "black",display:"flex"}}
              onClick={() => nav("/AddToCart")}
              
            >
              <FaShoppingCart style={{fontSize:'20px',marginTop:'0px'}}/>
            </Nav.Link>
            <button className="cart-countH">{cartProducts.length}</button>
            
            </div></>
        )}

        <Nav.Link style={{ fontWeight: "bold", color: "black" }}>
          Call Us : +91-9746726000
        </Nav.Link>

        {token === null ? (
          <Nav.Link
            style={{ fontWeight: "bold", color: "black" }}
            onClick={() => nav("/signIn")}
          >
            LogIn
          </Nav.Link>
        ) : (
          <Nav.Link style={{ fontWeight: "bold", color: "black" }} onClick={logoutBtn}>
            Logout
          </Nav.Link>
        )}

      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

     
    </div>
  );
};

export default Header;
