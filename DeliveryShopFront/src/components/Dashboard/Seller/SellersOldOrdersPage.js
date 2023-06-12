import React, { useEffect, useState, useContext } from "react";
import {
  DocumentCard,
  DocumentCardTitle,
  DocumentCardDetails,
  PrimaryButton,
  Image,
  Dialog,
  DialogType,
  DialogFooter,
  Stack,
  Text,
} from "@fluentui/react";
import { AuthContext } from "../../AuthContext";
import { Row, Col } from "react-bootstrap";
import SellerTopBar from "./SellerTopBar";
import { Button } from "react-bootstrap";
import "./SellersOldOrdersPage.css";
import { sellersOldOrders } from "../../../hooks/ApiService";
import TopBar from "../Admin/AdminTopBar";
import SellerSideBar from "./SellerSideBar";

function SellersOldOrdersPage() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sellersOldOrders(token);
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
      <TopBar />
      <Row>
        <Col md={3}>
          <SellerSideBar />
        </Col>
        <Col md={9}>
          <div className="card-container">
            {orders.map((order) => (
              <DocumentCard
                key={order.id}
                className="order-card delivered document-card"
              >
                <div className="order-info">
                  <div className="order-details">
                    <div className="document-card-div">
                      <span>
                        Address: <strong>{order.address}</strong>
                      </span>
                      <span>
                        Comment: <strong>{order.comment}</strong>
                      </span>
                      <span>
                        Total Price: <strong>{order.totalPrice}</strong>
                      </span>
                      <span>
                        Delivery Time: <strong>Delivered</strong>
                      </span>
                    </div>
                  </div>
                  <div className="order-items">
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item">
                        <Image
                          src={item.product.imgSrc || "placeholder-image-url"}
                          alt="Product Image"
                          width={100}
                          height={100}
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
                <Button
                  onClick={() => handleViewDetails(order)}
                  className="view-details-button"
                >
                  {" "}
                  View Details
                </Button>
              </DocumentCard>
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
              <span>
                Comment: <strong>{selectedOrder.comment}</strong>
              </span>
              <span>
                Total Price: <strong>{selectedOrder.totalPrice}</strong>
              </span>
              <span>
                Delivery Time:{" "}
                <strong>
                  {formatDeliveryTime(selectedOrder.deliveryTime)}
                </strong>
              </span>
            </div>
            <div className="dialog-items">
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="dialog-item">
                  <Image
                    src={item.product.imgSrc || "placeholder-image-url"}
                    alt="Product Image"
                    width={80}
                    height={80}
                  />
                  <div className="item-details">
                    <div>{item.product.name}</div>
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
          <Button onClick={() => setIsDialogVisible(false)}>Close</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default SellersOldOrdersPage;
