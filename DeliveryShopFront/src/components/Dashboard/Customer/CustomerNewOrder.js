import React, { useContext, useState, useEffect } from "react";

import { Button, Form } from "react-bootstrap";
import CartContext from "./CartContext";
import CustomerTopBar from "./CustomerTopBar";
import "./CustomerNewOrder.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import {
  Add16Regular,
  Alert12Filled,
  Subtract16Filled,
} from "@fluentui/react-icons";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { postOrders } from "../../../hooks/ApiService";
import TopBar from "../Admin/AdminTopBar";
import CustomerSideBar from "./CustomerSideBar";
import { Row, Col, Container } from "react-bootstrap";

function CustomerNewOrder() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [comment, setComment] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressError, setAddressError] = useState(false); // New state for address validation error
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let calculatedTotal = 0;
    if (cartItems) {
      Object.values(cartItems).forEach((item) => {
        calculatedTotal += item.product.price * item.quantity;
      });
    }
    setTotal(calculatedTotal + 120);
  }, [cartItems]);

  const handleCheckout = async () => {
    if (!cartItems || Object.values(cartItems).length === 0) {
      return;
    }

    if (!address) {
      setAddressError(true); // Set address validation error to true
      return;
    }

    setAddressError(false); // Reset address validation error to false

    const productQuantities = Object.values(cartItems).map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    const orderData = {
      productQuantities: productQuantities,
      comment: comment,
      address: address,
    };

    try {
      const response = await postOrders(token, orderData);

      if (response.ok) {
        setMessage("Uspešno ste dodali porudžbinu!");
        setIsModalOpen(true); // Show success modal
        setTimeout(() => {
          setIsModalOpen(false); // Hide the modal after 3 seconds
          // Reset cart items to initial values
          setCartItems({});
          // Redirect to /customer-dashboard
          navigate("/customer-dashboard");
        }, 3000);
      } else {
        setMessage("Nema dovoljno jedinica artikla koje želite da naručite!");
        setIsModalOpen(true);
        // Show success modal
        setTimeout(() => {
          setIsModalOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleQuantityChange = (itemId, newValue) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[itemId].quantity = parseInt(newValue, 10);
    setCartItems(updatedCartItems);
  };

  const handleIncrement = (itemId) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[itemId].quantity += 1;
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (itemId) => {
    const updatedCartItems = { ...cartItems };
    if (updatedCartItems[itemId].quantity > 1) {
      updatedCartItems[itemId].quantity -= 1;
      setCartItems(updatedCartItems);
    }
  };

  const handlePlatiPouzecem = () => {
    console.log("Plati Pouzecem clicked");
    // Add your logic for "Plati Pouzecem" button here
  };

  return (
    <div className="container">
      <TopBar />
      <Row>
        <Col md={3}>
          <CustomerSideBar />
        </Col>
        <Col md={9}>
          {cartItems && Object.values(cartItems).length > 0 ? (
            <div className="cart-items-container mx-auto pt-5">
              {Object.values(cartItems).map((item) => (
                <div key={item.product.id} className="cart-item">
                  <h3 className="cart-item-name">{item.product.name}</h3>
                  <div className="cart-item-details">
                    <p className="cart-item-quantity pt-2">Količina:</p>
                    <div className="quantity-controls">
                      <Subtract16Filled
                        onClick={() => handleDecrement(item.product.id)}
                        className="quantity-decrement"
                      />
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) =>
                          handleQuantityChange(item.product.id, e.target.value)
                        }
                        className="cart-item-quantity-input"
                      />
                      <></>
                      <Add16Regular
                        onClick={() => handleIncrement(item.product.id)}
                        className="quantity-increment"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Form.Group controlId="address">
                <Form.Label className="pt-2">Adresa: </Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  required // Set the address field as required
                  className={
                    addressError
                      ? "checkout-address is-invalid"
                      : "checkout-address"
                  }
                />
                {addressError && (
                  <Form.Control.Feedback type="invalid">
                    Adresa je obavezna!
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <p className="pt-3">Komentar:</p>
              <textarea
                rows={3}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="checkout-comment"
              ></textarea>
              <p className="total-amount">Vaš račun je: {total} dinara</p>
              <div className="checkout-buttons">
                <Button
                  onClick={handleCheckout}
                  className="checkout-button w-100"
                >
                  Poruci sa pouzecem
                </Button>
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "ASKivSyljrEX6uH_G44ZhkU3UPkBauRXav3sW-8ufZDjcgE7WESD--KcFIfHJ4pXbppKX8H6w6Ac8A12",
                  }}
                >
                  <PayPalButtons
                    className="w-100"
                    forceReRender={[address]}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: (total / 100).toString(),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order
                        .capture()
                        .then((details) => {
                          console.log(details);
                          handleCheckout();
                        })
                        .catch((error) => {
                          setMessage(
                            "Nemate dovoljno sredstava da izvršite kupovinu!"
                          );
                          setIsModalOpen(true);
                        });
                    }}
                    onError={(err) => {
                      console.log(err);
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          ) : (
            <p className="empty-cart-message">Vaša korpa je prazna.</p>
          )}
        </Col>
      </Row>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="modal">
          <h3>{message}</h3>
        </div>
      )}
    </div>
  );
}

export default CustomerNewOrder;
