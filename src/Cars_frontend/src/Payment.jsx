
import { useLocation } from "react-router-dom";
import { Principal } from '@dfinity/principal';
import { useEffect, useState } from "react";
import { Cars_backend } from 'declarations/Cars_backend';

export default function(){
    const location = useLocation();
    const { principal } = location.state || {};
    var [Showbalance ,setShowbalance] = useState("");

    async function MakeTransaction(){
        var SenderPrincipal = Principal.fromText(principal);
        var ReceiverPrincipal =Principal.fromText(document.getElementById("ReceiverPrincipal").value);
        var amount = BigInt(document.getElementById("amount").value);

        var TransactionStatus = await Cars_backend.transfer(SenderPrincipal,ReceiverPrincipal,amount)
        console.log(TransactionStatus);
        if("ok" in TransactionStatus){
            alert("Transaction successful");
            getbalance();
        }
    }
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

    return(
        <>
            <div>
                <div>
                    <center><p id="HeadPayment">Make Your Payment securely and Faster in <b><strong>ICP</strong></b></p></center>
                </div>
                <div id="BalanceDiv"><b><strong>Balance:</strong>{Showbalance.toString()}</b> Tokens</div>
                <div>
                    <p id="Contactdet">You can contact us through this mail for the more vehicle details and <b><strong>PRINCIPAL</strong></b>to make transactions
                     <br /><br /><b><strong>MAIL:</strong>Srujan9063@gmail.com</b></p>
                </div>
                <div id="PaymentForm">
                    <label><b><strong>Sender principal:</strong></b></label>
                    <input type="text" id="SenderPrincipal" value={principal} readOnly /><br />
                    <label><b><strong>Receiver principal:</strong></b></label>
                    <input type="text" id="ReceiverPrincipal" /><br />
                    <label><b><strong>No Of tokens:</strong></b></label>
                    <input type="Number" id="amount" required />
                    <button id="MakeTransactionBtn" onClick={MakeTransaction}>Make Transaction</button>
                </div>
            </div>
        </>
    );
} 