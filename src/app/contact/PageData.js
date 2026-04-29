"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import envelopeIcon from "../../assets/images/icons/envelope-icon.svg";
import userIcon from "../../assets/images/icons/user-icon.svg";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
const Footer = dynamic(() => import("@/components/Footer"));
import Image from "next/image";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  subject: Yup.string()
    .min(5, "Subject must be at least 5 characters")
    .required("Subject is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

export default function PageData() {
  const [toast, setToast] = useState({
    message: "",
    type: "",
    title: "",
    isVisible: false,
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setToast({
        message:
          "Thank you for your message! We'll get back to you within 24 hours.",
        type: "success",
        title: "Message Sent!",
        isVisible: true,
      });

      resetForm();
    } catch (error) {
      setToast({
        message: "Failed to send message. Please try again later.",
        type: "error",
        title: "Error",
        isVisible: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="contact-page">
      <Header />
      <div className="inner-page">
        <div className="container">
          <div className="page-wrapper">
            <div className="heading-wrapper">
              <div className="badge-wrapper gradient-border d-inline-flex">
                <strong className="text-gradient w-600">CONTACT US</strong>
              </div>
              <h1>Get in Touch</h1>
              <p>
                Have questions about TokScript? We&apos;re here to help you get
                the most out of our AI-powered transcription service.
              </p>
            </div>

            <div className="contact-content">
              <div className="row">
                <div className="col-lg-8">
                  <div className="form-wrapper">
                    <Formik
                      initialValues={{
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form className="form">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <div className="input-wrapper">
                                  <div className="icon">
                                    <Image src={userIcon} alt="" />
                                  </div>
                                  <Field
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    className="form-control"
                                  />
                                </div>
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="error-msg"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <div className="input-wrapper">
                                  <div className="icon">
                                    <Image src={envelopeIcon} alt="" />
                                  </div>
                                  <Field
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    className="form-control"
                                  />
                                </div>
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="error-msg"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <Field
                              type="text"
                              name="subject"
                              placeholder="Subject"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="subject"
                              component="div"
                              className="error-msg"
                            />
                          </div>

                          <div className="form-group">
                            <Field
                              as="textarea"
                              name="message"
                              placeholder="Your Message"
                              className="form-control textarea"
                              rows="6"
                            />
                            <ErrorMessage
                              name="message"
                              component="div"
                              className="error-msg"
                            />
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="contact-info">
                    <div className="info-item">
                      <h4>Email Support</h4>
                      <p>support@tokscript.com</p>
                      <span>We respond within 24 hours</span>
                    </div>

                    <div className="info-item">
                      <h4>Business Inquiries</h4>
                      <p>business@tokscript.com</p>
                      <span>Partnership and enterprise solutions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
