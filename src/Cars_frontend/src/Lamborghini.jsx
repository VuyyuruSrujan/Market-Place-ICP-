import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export default function Lambhorghini(){
    const navigate = useNavigate();
    const location = useLocation();
    const { principal } = location.state || {};

    function OrderLambo(){
        navigate('/Payment',{ state: { principal} })
    }

        
    return(
        <>
            <div id="LamboHead">
                <center><b><strong> LAMBORGHINI </strong></b></center>
            </div>
            <div>
                <img src="lambowhite_processed.webp" id="Lambomainimg" />
            </div>
            <div id="Details">
                <ul>
                    <li>Supports both Fuel and Power</li>
                    <li>Fuel consumption Combined: 11,86 l/100km</li>
                    <li>Power consumption Combined: 10,1 kWh/100 Km</li>
                    <li>CO2 emissions Combined: 276 g/km</li>
                    <li>Fuel consumption with discharged battery Combined: 17,8 l/100km</li>
                </ul>
                <center> <button id="LambOrderBtn" onClick={OrderLambo}>Order Now</button> </center>
            </div>

        </>
    );

}