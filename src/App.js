import "./App.css";
import logo from "./logo.svg";
import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { SERVER_BASE_URL, STRIPE_PROD_KEY } from "./config";

const KEY = STRIPE_PROD_KEY;

function App() {
  // We can modify this state as per our requirements.
  const [product, setProduct] = useState({
    name: "Pick Axe",
    price: 10,
    productBy: "Cong Holistic",
  });

  // This function proceeds the payments.
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${SERVER_BASE_URL}/api/checkout/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log("Response : ", res);
        const { status } = res;
        console.log("STATUS : ", status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Here we are using stripe component This looks like a button */}
          <StripeCheckout
            stripeKey={KEY}
            token={makePayment}
            name="buy me"
            amount={product.amount * 100}
          >
            <button onClick={(e) => e.preventDefault()}>
              {" "}
              My custom button
            </button>
          </StripeCheckout>
        </a>
      </header>
    </div>
  );
}

export default App;
