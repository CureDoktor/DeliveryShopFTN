import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  DocumentCard,
  DocumentCardTitle,
  DocumentCardDetails,
  PrimaryButton,
  Image,
  Modal,
} from "@fluentui/react";
import { AuthContext } from "../../AuthContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./SellersProducts.css";
import SellerTopBar from "./SellerTopBar";
import { apiProduct, deleteProduct } from "../../../hooks/ApiService";
import TopBar from "../Admin/AdminTopBar";
import SellerSideBar from "./SellerSideBar";
import { Row, Col } from "react-bootstrap";

function SellersProducts() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await apiProduct(token);
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token, fetchProducts]);

  const handleEditProduct = (product) => {
    navigate(`/seller-dashboard/update-product/${product.id}`, {
      state: { product },
    });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await deleteProduct(productId, token);

      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          fetchProducts();
        }, 3000);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleAddProduct = () => {
    navigate("/seller-dashboard/new-product");
  };

  return (
    <div className="container">
      <TopBar />
      <Row>
        <Col md={3}>
          <SellerSideBar />
        </Col>
        <Col md={9}>
          <div className="add-product-container">
            <Button
              onClick={handleAddProduct}
              className="add-product-button primary-button"
            >
              {" "}
              Add item
            </Button>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card document-card">
                <div className="product-info">
                  <div className="product-image">
                    <Image
                      src={product.imgSrc || "placeholder-image-url"}
                      alt="Product Image"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="product-details">
                    <h3>{product.name}</h3>
                    <div className="document-card-div">
                      <p>Price: {product.price}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Description: {product.description}</p>
                    </div>
                  </div>
                </div>
                <div className="product-actions">
                  <Button
                    onClick={() => handleEditProduct(product)}
                    className="edit-button primary-button"
                  >
                    Ažuriraj
                  </Button>
                  <Button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="delete-button secondary-button"
                  >
                    Obriši
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Modal
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
        isBlocking={false}
      >
        <div className="modal-content">
          <h3 className="modal-text">Item deleted!</h3>
        </div>
      </Modal>
    </div>
  );
}

export default SellersProducts;
