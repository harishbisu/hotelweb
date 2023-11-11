import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating"

function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs content">
      <div className="col-md-4">
        <img src={room.imageurls[0]} alt="loading.." className="smallimg" />
      </div>
      <div className="col-md-7 ">
        <h1>{room.name}</h1>
        <b>
          {" "}
          <p><Rating roomId={room._id}></Rating></p>
          <p>Phone Number : {room.phonenumber}</p>
          <p>Type : {room.type}</p>
        </b>
        <div style={{ float: "right" }}>
          {JSON.parse(localStorage.getItem("currentUser")) &&
            fromdate &&
            todate && (
              <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                <button className="btn btn-primary m-2">Book Now</button>
              </Link>
            )}
          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        {/* <Modal.Header closeButton> */}
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map((url) => (
              <Carousel.Item key={url}>
                <img className="d-block w-100 bigimg" src={url} alt="slide" />
                <Carousel.Caption>
                  <h3>Room Details</h3>
                  <p>Type : {room.type}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Room;
