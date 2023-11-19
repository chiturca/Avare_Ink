"use client";
import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const sendEmail = (templateParams, setNotification, onClose) => {
  emailjs
    .send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        setNotification(() => "Email sent successfully!");
        onClose();
      },
      (error) => {
        console.log("FAILED...", error);
        setNotification(() => "Failed to send email. Please try again.");
        onClose();
      }
    );
};

export default function Client() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [notification, setNotification] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onOpen();
    sendEmail(formData, setNotification, onClose);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        onClose();
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <div>
      <form className="flex flex-col" onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
        />
        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
        />
        <input
          type="submit"
          value="Send"
          className="px-7 py-2.5 bg-sky-200 text-sky-900 font-medium text-xl text-shadow-[0 0 50px #bae6fd] 
             rounded-full shadow-md ease-in duration-300 hover:bg-sky-900 hover:text-sky-200 hover:shadow-lg hover:scale-110"
        />
      </form>
      {notification && (
        <Modal isOpen={isOpen} onClose={onClose} className="bg-sky-900">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Message</ModalHeader>
            <ModalBody>
              {" "}
              <p>{notification}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
