import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myContext } from "../context/context";

export default function AdminPage() {
  const nav = useNavigate()
  const [adminEmail1, setAdminEmail1] = useState("")
  const [adminPassword1, setAdminPassword1] = useState("")
  const [adminDetails, setAdminDetails] = useState([])
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const { setLikeProducts, setCartProducts, setSignIn, signIn } = useContext(myContext)
  function adminEmail(a) {
    setAdminEmail1(a.target.value)
  }
  function adminPasswod(b) {
    setAdminPassword1(b.target.value)
  }
  function adminSubmit() {
    if (adminEmail1 !== "admin123@gmail.com" || adminPassword1 !== "admin@12") {
      alert("Ivalid email address or password")
    }
    else {
      setAdminDetails([...adminDetails, { adminEmail1, adminPassword1 }])
      setLikeProducts([]);
      setCartProducts([]);
      const newA = [...signIn]
      newA.pop()
      setSignIn(newA)
      nav('/AdminProducts')
    }

  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '50px' }}>
      <h4>Admin Login</h4><br />
      <div className="admin-email"><input type="email" onChange={adminEmail} placeholder="Enter email..." /></div><br />
      <div className="admin-password"><input type="password" onChange={adminPasswod} placeholder="Enter password..." /></div><br />
      <div className="admin-button" ><button style={{ borderRadius: '5px' }} onClick={adminSubmit} >submit</button></div>
    </div>
  )
}