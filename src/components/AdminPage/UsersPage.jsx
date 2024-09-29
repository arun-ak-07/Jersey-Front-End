import React, { useState } from "react";
import { myContext } from "../context/context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../AdminPage/UsersPage.css'
export default function UsersPage() {
    const nav = useNavigate()
    const [col,setCol] = useState("green")
    const { signsUps, setSignsUps, setSignIn, bannedUser,setBannedUser, setButtonStyle,signIn } = useContext(myContext)

    

    function delBtn(data, index) {
        alert("User Name : "  + data.userName + " Deleted Successfully")
        setSignsUps(signsUps.filter((data, i) => i !== index))
        const newA = [...signIn]
        newA.pop()
        setSignIn(newA)

    }

    function banBtn(index) {
        setCol("red");
        setBannedUser(signsUps.filter((i) => i !== index));

        const newA = [...signIn];
        newA.pop();
        setSignIn(newA);
        console.log("first", setBannedUser);
        alert("Banned Successfully");
        
        // Change the button style here
        setButtonStyle({ backgroundColor: 'red' });
    }
    function UnBanBtn(index){
        setCol("green");
        setSignIn(signsUps.filter((i) => i !== index));
        const newA = [...signIn];
        newA.pop();
        setSignIn(newA);
        setBannedUser(bannedUser.filter((data, i) => i !== index));
        
        alert("Un - Banned Successfully");

    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <h2>Users Detail</h2>
            <table style={{ border: '1px solid black', marginTop: '100px', width: '100%', height: '100%' }}>
                <tr style={{ border: '1px solid black' }}>
                    <th style={{ border: '1px solid black' }}>User Name</th>
                    <th>User Email</th>
                    <th>Ban</th>
                    <th>Delete</th>
                </tr>

                {
                    signsUps.map((data, index) => (

                        <tr style={{ border: '1px solid black' }} key={index}>
                            <td>{data.userName}</td>
                            <td>{data.password}</td>
                            <td style={{ display: 'flex', flexDirection: 'column' }}><button className="btx" 
                            
                            onClick={()=>banBtn(index)}>ban</button>
                                <button onClick={()=>UnBanBtn(index)} className="btx">unBan</button></td>
                            <td><button className="btx" onClick={() => delBtn(data, index)}>delete</button></td>

                        </tr>

                    ))
                }
            </table>
            <div><Link to={'/'}>Home</Link></div>

        </div>
    )
}