import { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import { useNavigate } from 'react-router-dom';
import { Cars_backend } from 'declarations/Cars_backend';
import PlugConnect from '@psychedelic/plug-connect';

export default function Another1(){
    const [identity, setIdentity] = useState(null);
    const navigate = useNavigate();

    async function handleConnect() {
        const authClient = await AuthClient.create();
        authClient.login({
            maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
            identityProvider: "https://identity.ic0.app/#authorize",
            onSuccess: async () => {
                const identity = await authClient.getIdentity();
                setIdentity(identity);
            },

        });
    }

    useEffect(() => {
        async function init() {
            const authClient = await AuthClient.create();
            if (await authClient.isAuthenticated()) {
                const identity = await authClient.getIdentity();
                setIdentity(identity);
            }
        }
        init();
    }, []);

    function ProfileClick() {
        if (identity && identity.getPrincipal() != "" && identity.getPrincipal() != null) {
            // navigate('/Profile');
            navigate('/Profile', { state: { principal: identity.getPrincipal().toText() } });
        } else {
            alert("Connect to Internet Identity");
        }
    }

    function lambo(){
        if (identity && identity.getPrincipal() != "" && identity.getPrincipal() != null) {
        navigate('/Lamborghini',{ state: { principal: identity.getPrincipal().toText() } });
    }else{
        alert("connect to internet identity");
    }
}

    function merce(){
        if (identity && identity.getPrincipal() != "" && identity.getPrincipal() != null) {
        navigate('/Mercede',{ state: { principal: identity.getPrincipal().toText() } })
    }else{
        alert("connect to internet identity");
    }
}
    function Audif(){
        if (identity && identity.getPrincipal() != "" && identity.getPrincipal() != null) {
        navigate('/Audi',{ state: { principal: identity.getPrincipal().toText() } })
    }else{
        alert("connect to internet identity");
    }
}
    async function OrderTesla(){
        // if (identity && identity.getPrincipal() != "" && identity.getPrincipal() != null) {
            // navigate('/Payment',{ state: { principal: identity.getPrincipal().toText() } })
            window.ic.plug.requestConnect();
            const connected = await window.ic.plug.isConnected();
            if(connected){
            const params = {
                to: 'xxxxx-xxxxx-xxxxx-xxxxx',
                amount: 100000000,
                memo: '123451231231',
            };
            const result = await window.ic.plug.requestTransfer(params);
            console.log("trans",result);
        }
        // else{
        //     alert("connect to internet identity!")
        // }
    
}


    function handleTeslaClick(event) {
        event.preventDefault();
        document.getElementById('teslasection').scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <div id="BodHea">
                <div><br /><br />
                    <h1><center> DRIVING THRILLS </center></h1>
                    <button id="ConnectBtns"
                        onClick={handleConnect}
                        style={{ cursor: "pointer", marginTop: "32px" }}
                    >
                        Connect
                    </button>
                    <button id="ProfileBtn" onClick={ProfileClick}> Profile </button>
                    {identity && (
                        <p id="PrincPrint">Principal: {identity.getPrincipal().toText()}</p>
                    )}
                    <div id="ModelsText">
                        <h1>CARS</h1>
                        <ul>
                            <li><a href="#teslasection" id="tess" onClick={handleTeslaClick}>TESLA <small>(Click here)</small></a></li>
                            <li onClick={lambo}>LAMBORGHINI<small>(Click here)</small></li>
                            <li onClick={Audif}>AUDI<small>(Click here)</small></li>
                            <li onClick={merce}>Mercedes-Benz<small>(Click here)</small></li>
                        </ul>
                    </div>
                    <div>
                        <img src="imageblack.jpeg" id="imageblack"/>
                    </div>
                </div>

                <div><br /><br /><br /><br /><br />
                   <div id="teslasection">
                        <p id="Tesladivv"> <center><b><strong>TESLA</strong></b></center> </p>
                    </div>
                    <div><h1><center>MODEL - Y</center></h1></div>
                    <video width="800" height="500" autoPlay loop id="teslVideo" >
                        <source src="teslaVideo.webm" />
                    </video>
                        <div id="Features">
                            <li>Navigate on Autopilot</li><br />
                            <li>Auto Lane Change</li><br />
                            <li>Autopark</li><br />
                            <li>Summon</li><br />
                            <li>Smart Summon</li><br />
                            <li>Autosteer on city streets</li><br />
                            <li>Traffic Light and Stop Sign Control</li><br />
                        </div>
                    
                    {/* <div>
                        <video width="800" height="500" autoPlay loop id="teslVideo1" >
                            <source src="AutoPark.webm" />
                        </video>
                    </div> */}
                    <div id="Secong">
                        <img src="modely1.jpeg" id="modelyimg" />
                        <div id="ExtraDet">
                            <b>Top Speed 125 mph</b><br /><br />
                            <b>Range - 363mi</b><br /><br />
                            <b>0-60mph in 4.9sec</b>
                        </div>
                        <button id="OderTesla1" onClick={OrderTesla}><b> Order Now </b></button><br /><br /><br />
                    </div>                
                </div>
            </div>
        </>
    );
}