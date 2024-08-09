import { Principal } from "@dfinity/principal";
import { useEffect, useState } from "react";
export default function(){
    const principal = window.auth.principal;
    let [Showbalance ,setShowbalance] = useState("");

    async function MakeTransaction(){
        try {
            let SenderPrincipal = principal;
            let ReceiverPrincipal = Principal.fromText(document.getElementById("ReceiverPrincipal").value);
            let amount = BigInt(document.getElementById("amount").value);
    
            let TransactionStatus = await window.canister.cars.transfer(SenderPrincipal,ReceiverPrincipal,amount)
            console.log(TransactionStatus);
            if("ok" in TransactionStatus){
                alert("Transaction successful");
                getbalance();
            }
            if("err" in TransactionStatus){
                alert(TransactionStatus.err)
            }
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }
    async function getbalance(){
        let balance = await window.canister.cars.balanceOf(principal);
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