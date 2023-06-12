import React, { useState, useContext, useEffect, useRef } from "react";
import { TextField, PrimaryButton, Modal } from "@fluentui/react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import SellerTopBar from "./SellerTopBar";
import { ArrowUpload16Filled } from "@fluentui/react-icons";
import "./UpdateProduct.css";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../AuthContext";
import { Button } from "react-bootstrap";
import { apiProductId, productUpdate } from "../../../hooks/ApiService";

function UpdateProduct() {
  const { token } = useContext(AuthContext);
  const { productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [quantityInStock, setQuantityInStock] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiProductId(productId, token);
        const data = await response.json();
        if (response.ok) {
          const { name, price, description, imgSrc, quantityInStock } = data;
          setName(name);
          setPrice(price.toString());
          setDescription(description);
          setQuantityInStock(quantityInStock.toString());
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token) {
      fetchProduct();
    }
  }, [token, productId]);

  const handleImageUpload = () => {
    const file = fileInputRef.current.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (
      name.trim() === "" ||
      price.trim() === "" ||
      quantityInStock.trim() === ""
    ) {
      setError("All fields are required");
      return;
    }

    if (isNaN(Number(price)) || isNaN(Number(quantityInStock))) {
      setError("Price and Quantity in Stock must be numbers");
      return;
    }

    const productData = {
      id: productId,
      name: name,
      price: Number(price),
      description: description,
      quantityInStock: Number(quantityInStock),
      imgSrc: imageSrc, // Include the base64 string of the image
    };

    try {
      const response = await productUpdate(token, productData);

      const data = await response.json();

      if (response.ok) {
        console.log("Product updated:", data);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/seller-dashboard/products");
        }, 3000);
      } else {
        console.log("Error:", data.statusCode);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <SellerTopBar />
      <div className="update-product-container">
        <h2>Update Product</h2>
        <Form className="form-fields">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              isInvalid={error && !name.trim()}
            />
            {error && !name.trim() && (
              <Form.Control.Feedback type="invalid">
                Name is required
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
              isInvalid={error && (isNaN(Number(price)) || price.trim() === "")}
            />
            {error && (isNaN(Number(price)) || price.trim() === "") && (
              <Form.Control.Feedback type="invalid">
                Price must be a number
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </Form.Group>
          <div className="">
            <Form.Group>
              <Form.Label>Choose Image</Form.Label>
              <div className="upload-label">
                <div className="upload-icon">
                  <ArrowUpload16Filled />
                </div>
                <Form.Control
                  type="text"
                  value={selectedFile ? selectedFile.name : "Choose Image"}
                  readOnly
                />
              </div>
              <Form.Control
                type="file"
                id="productImageInput"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Form.Group>
          </div>
          <Form.Group>
            <Form.Label>Quantity in Stock</Form.Label>
            <Form.Control
              type="number"
              value={quantityInStock}
              onChange={(event) => setQuantityInStock(event.target.value)}
              required
              isInvalid={
                error &&
                (isNaN(Number(quantityInStock)) ||
                  quantityInStock.trim() === "")
              }
            />
            {error &&
              (isNaN(Number(quantityInStock)) ||
                quantityInStock.trim() === "") && (
                <Form.Control.Feedback type="invalid">
                  Quantity in Stock must be a number
                </Form.Control.Feedback>
              )}
          </Form.Group>
        </Form>
        <div className="submit-button">
          <Button onClick={handleSubmit} styles={{ width: "100%" }}>
            Update Product{" "}
          </Button>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
        isBlocking={false}
      >
        <div className="modal-content">
          <h3 className="modal-text">Product successfully updated!</h3>
        </div>
      </Modal>
    </div>
  );
}

export default UpdateProduct;
