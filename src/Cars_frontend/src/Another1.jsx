import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { logout } from "./utils/auth";
export default function Another1() {
    const [identity, setIdentity] = useState(null);
    const navigate = useNavigate();
    const isAuthenticated = window.auth.isAuthenticated;
    async function handleConnect() {
        const IDENTITY_PROVIDER = "http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943#authorize";
        const MAX_TTL = 7 * 24 * 60 * 60 * 1000 * 1000 * 1000;
        const authClient = window.auth.client;

        const isAuthenticated = await authClient.isAuthenticated();

        if (!isAuthenticated) {
            await authClient?.login({
                identityProvider: IDENTITY_PROVIDER,
                onSuccess: async () => {
                    window.auth.isAuthenticated = await authClient.isAuthenticated();
                    window.location.reload()
                },
                maxTimeToLive: MAX_TTL,
            });
        }

    }
    async function handleDisconnect() {
        setIdentity(null)
        logout();
        window.location.reload()
    }

    useEffect(() => {
        async function init() {
            const authClient = window.auth.client;
            if (await authClient.isAuthenticated()) {
                const identity = await authClient.getIdentity();
                setIdentity(identity);
            }
        }
        init();
    }, []);

    function ProfileClick() {
        if (isAuthenticated) {
            // navigate('/Profile');
            navigate('/Profile', { state: { principal: identity.getPrincipal().toText() } });
        } else {
            alert("Connect to Internet Identity");
        }
    }

    function lambo() {
        if (isAuthenticated) {
            navigate('/Lamborghini', { state: { principal: identity.getPrincipal().toText() } });
        } else {
            alert("connect to internet identity");
        }
    }

    function merce() {
        if (isAuthenticated) {
            navigate('/Mercede', { state: { principal: identity.getPrincipal().toText() } })
        } else {
            alert("connect to internet identity");
        }
    }
    function Audif() {
        if (isAuthenticated) {
            navigate('/Audi', { state: { principal: identity.getPrincipal().toText() } })
        } else {
            alert("connect to internet identity");
        }
    }
    function OrderTesla() {
        if (isAuthenticated) {
            navigate('/Payment', { state: { principal: identity.getPrincipal().toText() } })
        } else {
            alert("connect to internet identity!")
        }
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
                        onClick={isAuthenticated ? handleDisconnect : handleConnect}
                        style={{ cursor: "pointer", marginTop: "32px" }}
                    >
                        {isAuthenticated ? "Disconnect" : "Connect"}
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
                        <img src="imageblack.jpeg" id="imageblack" />
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
