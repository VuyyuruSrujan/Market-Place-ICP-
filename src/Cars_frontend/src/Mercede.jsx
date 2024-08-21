import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
export default function Mercede(){
    const navigate = useNavigate();
    const location = useLocation();
    const { principal } = location.state || {};

    async function OrderBenz(){
        // navigate('/Payment',{ state: { principal} })
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
    }
    return(
        <>
            <div id="LamboHead">
                <center><b><strong> MERCEDES BENZ </strong></b></center>
            </div>

            <div>
                <img src="merceBenz_processed.jpg"  id="Benzimg"/>
            </div>
            <div id="BenzDetails">
                <ul>
                    <li>Supports both Fuel and Power</li>
                    <li>Fuel consumption Combined: 11,86 l/100km</li>
                    <li>Power consumption Combined: 10,1 kWh/100 Km</li>
                    <li>CO2 emissions Combined: 276 g/km</li>
                    <li>Fuel consumption with discharged battery Combined: 17,8 l/100km</li>
                </ul>
            </div>
            <div>
                <center> <button id="LambOrderBtn" onClick={OrderBenz}>Order Now</button> </center>
            </div>
        </>
    );
}