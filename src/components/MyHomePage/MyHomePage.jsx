import React, { useContext } from "react";
import "./MyHomePage.css"
import Button from "react-bootstrap/Button";
import Header from "./Header";
import { myContext } from "../context/context";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import'./Header.css'

export default function MyHomePage() {
  
  const nav = useNavigate()
  const {categoryImage} = useContext(myContext)
  console.log(categoryImage)

  

  function showShopByTeams(CategoryTitle) {
    if (CategoryTitle === "SHOP BY TEAMS") {
      nav('/ShopByTeams')
    }
    else if (CategoryTitle === "SPECIAL EDITIONS") {
      nav('/ShopBySpecialEditions')

    }
    else if (CategoryTitle === "NEW ARRIVALS") {
      nav('/ShopByNewArrivals')
    }
    else if (CategoryTitle === "PLAYER EDITIONS") {
      nav('/ShopByPlayerEditions')
    }
  }

  return (
    <div className="main1111">

     <Header/>

      <div className="center1111">

        <div className="center-2Main" >
          <MDBCarousel showIndicators showControls fade>
            <Link to={'/ManchesterCity'}><MDBCarouselItem itemId={1}>
              <img src='https://dukaan.b-cdn.net/1440x1440/webp/media/78dc1a8d-0126-4471-b8cc-2c6aa9dd7b4c.blob' className='d-block w-80' alt='...' />
            </MDBCarouselItem></Link>

            <Link to={'/Arsenal'}><MDBCarouselItem itemId={2}>
              <img src='https://dukaan.b-cdn.net/1440x1440/webp/media/cb7e601c-3c44-487c-8884-a4ed26f6a550.blob' className='d-block w-80' alt='...' />
            </MDBCarouselItem></Link>

            <Link to={'/RealMadrid'}><MDBCarouselItem itemId={3}>
              <img src='https://dukaan.b-cdn.net/1440x1440/webp/upload_file_service/79c7fa71-63c0-4624-bf00-8cb81a8f96d5/image.png' className='d-block w-80' alt='...' />
            </MDBCarouselItem></Link>

            <Link to={'/ShopByNewArrivals'}><MDBCarouselItem itemId={4}>
              <img src='https://dukaan.b-cdn.net/1440x1440/webp/upload_file_service/3897d495-5e6f-4de2-ab7c-34e771afb8e9/image.png' className='d-block w-80' alt='...' />
            </MDBCarouselItem></Link>

            <Link to={'/ManchesterUnited'}><MDBCarouselItem itemId={5}>
              <img src='https://dukaan.b-cdn.net/1440x1440/webp/upload_file_service/b713bc67-abbb-4b6e-8382-b5b9c2270ef2/image.png' className='d-block w-80' alt='...' />
            </MDBCarouselItem></Link>

          </MDBCarousel>
        </div>

        <div className="center-1">
          <h3 class="t-black-12 z-ind-2 t-24_32 mt-18_26 medium mb32 m-mb16 textCenter" className="topCat" style={{ color: 'white' }}>Top categories</h3>

          <div className="category-cards">

            {
              categoryImage.map((data, index) => (

                <div key={index}>

                  <Card style={{ background: 'black' }} onClick={() => showShopByTeams(data.CategoryTitle)} className="blackShade">
                    <Card style={{ height: '300px', width: '300px', overflow: 'hidden' }} className="cardsimage">
                      <Card.Img className="slideCards" variant="top" src={data.CategoryImage} />
                    </Card>
                    <Card.Body>
                      <Card.Title style={{ color: 'white', textDecoration: 'none' }}>{data.CategoryTitle}</Card.Title>
                    </Card.Body>
                  </Card>

                </div>
              ))
            }
          </div>

        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '50px', flexDirection: 'column', alignItems: 'center' }} className="center-images">
        <div className="center-images1"><img className="imgsss" src="https://dukaan.b-cdn.net/1200x360/webp/upload_file_service/49b7cea0-fc78-4472-a880-60dcce8b3231/image.png" alt="" /></div>
        <span class="mt24 m-mt16 t-24_32 mt-18_26 medium textCenter title">Jersey World - Football Fans Choice</span>
        <span class="mt8 m-mt4 t-16_24 mt-14_20 regular textCenter description">Click Below to Find out why our store has a Rapidly Growing list of Super Happy Customers!</span>
        <div style={{ marginTop: '40px' }}><Button className="btn btn-dark">About Us</Button></div>
      </div>

      <hr style={{ width: '100%', marginTop: '50px' }} className="centerHr" />

      <Footer/>

    </div>
  );
}