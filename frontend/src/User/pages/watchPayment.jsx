import React, { useState } from "react";
import anime from "animejs";
import { Button } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import swal from 'sweetalert';
import './payment.scss';

export default function WatchPayment() {
  const {WatchBookingId  } = useParams();
  const location = useLocation();
  const { totalPrice } = location.state || {}; 
  console.log(WatchBookingId );  
  console.log(totalPrice); 

  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [cardNumber, setCardNumber] = useState("0000 0000 0000 0000");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardExpirationDate, setCardExpirationDate] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardType, setCardType] = useState("");
  const navigate = useNavigate();

  const flipCard = () => {
    anime({ targets: ".credit-card-inner", rotateY: "180deg", duration: "100", easing: "linear" });
  };

  const unFlipCard = () => {
    anime({ targets: ".credit-card-inner", rotateY: "360deg", duration: "100", easing: "linear" });
  };
  const handlePayment = async () => {
    try {
   
      await axios.put(`http://localhost:5000/WatchBooking/${WatchBookingId }`, {
        status: "Confirmed",
      });
  
      
      
  
   
      swal("Payment Successful!", "Your order has been placed!", "success");
  

      setShowConfetti(true);
  
      
      setTimeout(() => {
        navigate("/user/orders");
      }, 3000);
    } catch (error) {
      console.error("Payment error:", error);
      swal("Payment Failed", "Something went wrong!", "error");
    }
  };
  

  return (
    <div className="paymentcontainer">
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="credit-card">
        <div className="credit-card-inner">
          <div className="credit-card-front">
            <div id="card-type">{cardType}</div>
            <div id="card-number">{cardNumber}</div>
            <div id="card-expiration">
              {cardExpirationDate !== "" && <div id="validthru">Valid Thru</div>}
              {cardExpirationDate}
            </div>
            <div id="card-holder-name">{cardHolderName}</div>
          </div>
          <div className="credit-card-back">
            <div className="card-stripe" />
            <div className="card-sig-container">
              <div className="signature">{cardHolderName}</div>
              CVC {cardCVV}
            </div>
          </div>
        </div>
      </div>
      <form className="card-form">
        <label className="input-label">Credit Card Number</label>
        <input type="text" placeholder="Enter card number" className="text-input" maxLength="16" onChange={(e) => setCardNumber(e.target.value)} />
        <label className="input-label">Card Holder Name</label>
        <input type="text" placeholder="Enter name" className="text-input" maxLength="30" onChange={(e) => setCardHolderName(e.target.value.toUpperCase())} />
        <div className="date-and-csv">
          <input type="month" className="text-input" onChange={(e) => setCardExpirationDate(e.target.value)} />
          <input type="text" className="text-input" maxLength="3" onChange={(e) => setCardCVV(e.target.value)} onFocus={flipCard} onBlur={unFlipCard} />
        </div>
      </form>
      {/* Display total price */}
      {totalPrice && (
        <div>
          <h3>Total Price: ₹{totalPrice}</h3>
        </div>
      )}
      <div>
        <Button className="pay_btn" onClick={handlePayment}>
          Click to Pay <PaymentIcon />
        </Button>
      </div>
    </div>
  );
}
