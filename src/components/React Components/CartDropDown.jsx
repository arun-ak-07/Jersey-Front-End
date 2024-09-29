import { useContext, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { myContext } from '../context/context';

export default function CartDropDown({ onQuantityChange }) {

  const { cartQuantity, setCartQuantity } = useContext(myContext)
  console.log("first", cartQuantity)

  function handleQuantityChange(newQuantity) {
    setCartQuantity(newQuantity)
    onQuantityChange(newQuantity)
  }
  return (
    
    <Dropdown style={{ background: 'white' }}>
      <Dropdown.Toggle style={{ background: 'white', color: 'black' }} variant="secondary" id="dropdown-basic">
        Qty : {cartQuantity}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {

          [1, 2, 3, 4, 5, 6, 7, 8].map(quantity => (
            <Dropdown.Item key={quantity} onClick={() => handleQuantityChange(quantity)}>{quantity}</Dropdown.Item>
          ))
        }
      </Dropdown.Menu>
      {/* <Dropdown.Menu> */}


      {/* <Dropdown.Item href="#/action-1" onClick={() => (setCartQuantity(1))}>1</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={() => (setCartQuantity(2))}>2</Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={() => (setCartQuantity(3))}>3</Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={() => (setCartQuantity(4))}>4</Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={() => (setCartQuantity(5))}>5</Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={() => (setCartQuantity(6))}>6</Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={() => (setCartQuantity(7))}>7</Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={() => (setCartQuantity(8))}>8</Dropdown.Item>
      </Dropdown.Menu> */}
    </Dropdown>
  );
}

