import { Cars_backend } from 'declarations/Cars_backend';
import { Principal } from '@dfinity/principal';
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Profile() {
    const location = useLocation();
    const { principal } = location.state || {};
    const [userDetails, setUserDetails] = useState(null);
    var [Showbalance ,setShowbalance] = useState("");

    async function SubmitUserDetails() {
        const name = document.getElementById("UserName").value;
        const Age = BigInt(document.getElementById("UserAge").value);
        const Address = document.getElementById("UserAddress").value;
        const princi = Principal.fromText(principal);
        const mail = document.getElementById("usermail").value;

        const UserDet = {
            Name: name,
            PHNO: Age,
            address: Address,
            MAIL: mail,
            Princi: princi
        };

        const details = await Cars_backend.addUser(UserDet);
        console.log(details);
        getDetails();
        alert(details);
    }

    async function getDetails() {
        const PrincipalfromAnother = Principal.fromText(principal);
        const result = await Cars_backend.getUserDetByPrincipal(PrincipalfromAnother);
        if (result && result.length > 0) {
            setUserDetails(result);
        } else {
            setUserDetails(null);
        }
    }

    useEffect(() => {
        getDetails();
    }, []);

    async function getbalance(){
        const PrincipalforBal = Principal.fromText(principal);
        var balance = await Cars_backend.balanceOf(PrincipalforBal);
        console.log(balance);
        if(balance!= null  || balance!=""){
        setShowbalance(balance);
        }else{
            setShowbalance('0')
        }
    }
    useEffect(() => {
        getbalance();
    }, []);

    return (
        <>
            <div>
                <div>
                    <p id="ProfileTxt"><b><strong><center>PROFILE</center></strong></b></p>
                    <ul id="ProfileUl">
                        <li>To make your profile ,connect to internet identity on the main page</li>
                        <li>First connect your internet identity to check your profile details</li>
                    </ul>
                    <img src="cyberT.png" id="Truck" />
                </div>
                <div id="BalanceDiv"><b><strong>Balance: </strong></b>{Showbalance.toString()} tokens</div>

                {userDetails === null ? (
                    <div id="ProfDet">
                        <label>Name:</label>
                        <input type="text" id="UserName" required /><br /><br />
                        <label>PHONE NO:</label>
                        <input type="Number" id="UserAge" required /><br /><br />
                        <label>Address:</label>
                        <input type="text" id="UserAddress" required /><br /><br />
                        <label>MAIL: </label>
                        <input type="text" id="usermail" required />
                        <center> <button id="SubmitUserDetails" onClick={SubmitUserDetails}><b>Submit</b></button> </center>
                    </div>
                ) : (
                    <div id="RegisteredForm">
                        {userDetails.map((user, index) => (
                            <div key={index}>
                              <p><b><strong>Name:</strong></b> {user.Name.toString()}</p>
                                 <p><b><strong>MAIL:</strong></b>  {user.MAIL.toString()}</p>
                                 <p><b><strong>PHNO:</strong></b>  {user.PHNO.toString()}</p>
                                 <p><b><strong>Address:</strong></b>  {user.address}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
