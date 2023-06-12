import React, { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import "./CustomerProducts.css";
import CustomerTopBar from "./CustomerTopBar";
import { PlusCircle } from "react-bootstrap-icons";
import CartContext from "./CartContext";
import TopBar from "../Admin/AdminTopBar";
import { Container, Row, Col } from "react-bootstrap";

import { apiProduct } from "../../../hooks/ApiService";
import CustomerSideBar from "./CustomerSideBar";

function CustomerDashboard() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { setCartItems } = useContext(CartContext);
  const [quantities, setQuantities] = useState([]); // Changed to an array of quantities

  const fetchProducts = useCallback(async () => {
    try {
      const response = await apiProduct(token);
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
        setQuantities(new Array(data.length).fill(1)); // Initialize quantities array with default value 1
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      setQuantities([]); // Initialize quantities as an empty array before fetching products
      fetchProducts();
    }
  }, [token, fetchProducts]);

  const handleAddToCart = (product, quantity) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [product.id]: {
        product,
        quantity: Number(quantity),
      },
    }));
  };

  const handleQuantityChange = (index, newValue) => {
    if (/^\d*$/.test(newValue) && Number(newValue) > 0) {
      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] = newValue;
        return newQuantities;
      });
    }
  };

  return (
    <div className="container">
      <TopBar />
      <Row>
        <Col md={3}>
          <CustomerSideBar />
        </Col>
        <Col md={9} className="pt-4">
          <div className="product-grid pt-5">
            {products.map((product, index) => (
              <div key={product.id} className="product-card product-dashboard">
                <div className="">
                  <div className="product-image">
                    <img
                      src={product.imgSrc || "placeholder-image-url"}
                      alt="Product Image"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="product-details">
                    <h2>{product.name}</h2>
                    <div className="product-details">
                      <p>Cena: {product.price}</p>
                      <p>Opis: {product.description}</p>
                      <div className="product-quantity mx-auto">
                        <span className="product-quantity-label">
                          Količina:
                        </span>
                        <input
                          className="product-quantity-field"
                          type="number"
                          value={quantities[index]?.toString() || ""}
                          min={1}
                          onChange={(event) =>
                            handleQuantityChange(index, event.target.value)
                          }
                        />
                      </div>
                      <PlusCircle
                        className="product-quantity-button mx-auto mt-3"
                        onClick={() =>
                          handleAddToCart(product, quantities[index])
                        } // Use the corresponding quantity from the array
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CustomerDashboard;
