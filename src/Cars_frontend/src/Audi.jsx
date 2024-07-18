import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export default function Audi(){
    const navigate = useNavigate();
    const location = useLocation();
    const { principal } = location.state || {};

    function OrderAudi(){
        navigate('/Payment',{ state: { principal} })
    }
    return(
        <>
            <div>
                <div id="LamboHead">
                    <center><b><strong> AUDI </strong></b></center>
                </div>

                <div id="AudiDetails">
                <ul><br /><br />
                    <li>Supports both Fuel and Power</li>
                    <li>Fuel consumption Combined: 11,86 l/100km</li>
                    <li>Power consumption Combined: 10,1 kWh/100 Km</li>
                    <li>CO2 emissions Combined: 276 g/km</li>
                    <li>Fuel consumption with discharged battery Combined: 17,8 l/100km</li>
                </ul>
                <center> <button id="Audibtn" onClick={OrderAudi}>Order Now</button> </center>
            </div>
            <img src="audicar_processed.webp" id="Audiimg" />
            </div>
        </>
    );
}