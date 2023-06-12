import React, { useEffect, useState, useContext } from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../AuthContext";
import AdminTopBar from "../Admin/AdminTopBar";
import "./OrdersPage.css";
import { apiOrders } from "../../../hooks/ApiService";
import { Row, Col } from "react-bootstrap";
import AdminSideBar from "./AdminSideBar";

function OrdersPage() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiOrders(token);
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDialogVisible(true);
  };

  const formatDeliveryTime = (deliveryTime) => {
    const hours = Math.floor(deliveryTime);
    const minutes = Math.round((deliveryTime - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="container">
      <AdminTopBar />
      <Row>
        <Col md={3}>
          <AdminSideBar />
        </Col>
        <Col md={9}>
          <div className="card-container">
            {orders.map((order) => (
              <div key={order.id} className="order-card document-card">
                <div className="order-info">
                  <div className="order-details">
                    <div className="document-card-div">
                      <Row>
                        <Col>Address:</Col>
                        <Col md={6}>{order.address}</Col>
                      </Row>
                      <Row className="py-3">
                        <Col>Comment:</Col>
                        <Col md={6}>{order.comment}</Col>
                      </Row>
                      <Row>
                        <Col>Total Price: </Col>
                        <Col md={6}>{order.totalPrice}</Col>
                      </Row>
                      <Row className="py-3">
                        <Col>Delivery Time:</Col>
                        <Col md={6}>
                          {formatDeliveryTime(order.deliveryTime)}
                        </Col>
                      </Row>
                      <Row>
                        <Col></Col>
                        <Col md={6}></Col>
                      </Row>
                    </div>
                  </div>
                  <div className="w-100">
                    {order.items.map((item) => (
                      <div key={item.id} className="">
                        <div className="d-block mx-auto text-center">
                          <img
                            src={item.product.imgSrc || "placeholder-image-url"}
                            alt="Product Image"
                            width={100}
                            className="d-block mx-auto mb-4"
                            height={100}
                          />
                        </div>
                        <div className="item-details text-center">
                          <h3 className="text-center">{item.product.name}</h3>
                          <div className="document-card-div">
                            <span>
                              Quantity: <strong>{item.quantity}</strong>
                            </span>
                            <br />
                            <span>
                              Price: <strong>{item.price}</strong>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => handleViewDetails(order)}
                  className="view-details-button primary-button"
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Dialog
        hidden={!isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Order Details",
        }}
      >
        {selectedOrder && (
          <div className="dialog-content">
            <div className="document-card-div">
              <span>
                Address: <strong>{selectedOrder.address}</strong>
              </span>
              <br />
              <span>
                Comment: <strong>{selectedOrder.comment}</strong>
              </span>
              <br />
              <span>
                Total Price: <strong>{selectedOrder.totalPrice}</strong>
              </span>
              <br />
              <span>
                Delivery Time:{" "}
                <strong>
                  {formatDeliveryTime(selectedOrder.deliveryTime)}
                </strong>
              </span>
            </div>
            <div className="dialog-items">
              {selectedOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="dialog-item text-center margin-auto"
                >
                  <img
                    src={item.product.imgSrc || "placeholder-image-url"}
                    alt="Product Image"
                    width={80}
                    className="mx-auto d-block"
                    height={80}
                  />
                  <div className="item-details">
                    <h3>{item.product.name}</h3>
                    <div className="document-card-div">
                      <span>
                        Quantity: <strong>{item.quantity}</strong>
                      </span>
                      <span>
                        Price: <strong>{item.price}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            className="primary-button"
            onClick={() => setIsDialogVisible(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default OrdersPage;
