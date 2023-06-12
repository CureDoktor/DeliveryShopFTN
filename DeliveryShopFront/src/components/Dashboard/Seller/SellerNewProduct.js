import React, { useState, useContext, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import SellerTopBar from "./SellerTopBar";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { PlusSquare } from "react-bootstrap-icons";
import "./SellerNewProduct.css";
import { AuthContext } from "../../AuthContext";
import { postProduct } from "../../../hooks/ApiService";
import TopBar from "../Admin/AdminTopBar";
import { Col, Row } from "react-bootstrap";
import SellerSideBar from "./SellerSideBar";

function NewProduct() {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imgSrc, setImgSrc] = useState(""); // Declare imgSrc state variable here
  const [quantityInStock, setQuantityInStock] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageUpload = () => {
    const file = fileInputRef.current.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImgSrc(reader.result);
    };

    reader.onerror = () => {
      console.error("An error occurred while reading the file");
      setImgSrc("");
      setError("Failed to read the file");
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImgSrc("");
    }
  };

  const handleSubmit = async () => {
    if (
      name.trim() === "" ||
      price.trim() === "" ||
      quantityInStock.trim() === ""
    ) {
      setError("Sva polja su obavezna!");
      return;
    }

    if (isNaN(Number(price)) || isNaN(Number(quantityInStock))) {
      setError("Cena i količina moraju biti brojevi!");
      return;
    }

    const formData = {
      name,
      price: Number(price),
      description,
      imgSrc,
      quantityInStock: Number(quantityInStock),
    };

    try {
      const response = await postProduct(token, formData);

      const data = await response.json();

      if (response.ok) {
        console.log("Product created:", data);
        setShowModal(true); // Show the success modal
        setTimeout(() => {
          setShowModal(false); // Hide the success modal after 3 seconds
          navigate("/seller-dashboard"); // Redirect to the desired page
        }, 3000);
      } else {
        console.log("Error:", data.statusCode);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container">
      <TopBar />
      <Row>
        <Col md={3}>
          <SellerSideBar />
        </Col>
        <Col md={9}>
          <div className="new-product-container">
            <h2>New Product</h2>
            <div className="form-fields">
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
                  isInvalid={
                    error && (isNaN(Number(price)) || price.trim() === "")
                  }
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
                  type="text"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
              </Form.Group>
              <div className="">
                <label htmlFor="productImageInput">
                  <div className="">
                    <PlusSquare />
                    <span>{imgSrc ? imgSrc.name : "Choose Image"}</span>
                  </div>
                </label>
                <input
                  id="productImageInput"
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
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
            </div>
            <div className="submit-button">
              <Button
                className="primary-button"
                onClick={handleSubmit}
                styles={{ width: "100%" }}
              >
                Create Product
              </Button>
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>
        </Col>
      </Row>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop={false}
      >
        <Modal.Body>
          <h3 className="modal-text">Product successfully created!</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewProduct;
