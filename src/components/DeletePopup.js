import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function DeletePopup() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
}
