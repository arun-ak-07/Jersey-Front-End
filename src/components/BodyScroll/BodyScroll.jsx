import { useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Card, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { myContext } from "../context/context";
import '../BodyScroll/BodyScroll.css'

export default function BodyScroll() {
  const nav = useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data, myPlayers, setMyPlayers, categoryImage, setCategoryImage, myJersey,
    imageLink, setImageLink
  } = useContext(myContext)

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
    <>
      <Nav.Link  onClick={handleShow} style={{color:'black',border:'none',fontWeight:'bold'}}>
       Categories
      </Nav.Link>

      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <hr style={{width:'100%'}}/>
        <Offcanvas.Body>
          
        <div className="category-cards0">

            {
              categoryImage.map((data, index) => (

                <div key={index}>

                  <Card className='cardMain0'  onClick={() => showShopByTeams(data.CategoryTitle)} style={{cursor:'pointer'}}>
                    <Card style={{ height: '100px', width: '100px', overflow: 'hidden' }}>
                      <Card.Img className="slideCards0" variant="top" src={data.CategoryImage} />
                    </Card>
                    <Card.Body className='cardBody0'>
                      <Card.Title style={{ color: 'black', textDecoration: 'none' }}>{data.CategoryTitle}</Card.Title>
                    </Card.Body>
                  </Card>

                </div>
              ))
            }
          </div>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

