"use client";

import React, { useState } from "react";
import CancelSubscriptionFlow from "./CancelSubscriptionFlow";

export default function CancelFlowDemo() {
  const [showModal, setShowModal] = useState(false);
  const [planName, setPlanName] = useState("Pro Annual");

  const mockCancel = async () =>
    new Promise((r) => setTimeout(r, 1000));

  const mockDiscount = async () =>
    new Promise((r) => setTimeout(r, 1000));

  const openMonthly = () => {
    setPlanName("Pro Monthly");
    setShowModal(true);
  };

  const openAnnual = () => {
    setPlanName("Pro Annual");
    setShowModal(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0d0d0d",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "700",
            color: "#ffffff",
            marginBottom: "0.75rem",
          }}
        >
          Cancellation Flow Demo
        </h1>
        <p style={{ color: "#7a7a7a" }}>
          Trigger the cancellation modal in different plan states.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          onClick={openMonthly}
          style={{
            backgroundColor: "rgba(58, 58, 58, 0.2)",
            border: "1px solid rgba(58, 58, 58, 0.3)",
            color: "#ffffff",
            padding: "1.5rem 2rem",
            borderRadius: "0.75rem",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "1rem",
            transition: "all 0.2s",
          }}
        >
          Cancel Monthly
        </button>

        <button
          onClick={openAnnual}
          style={{
            backgroundColor: "rgba(0, 217, 180, 0.1)",
            border: "1px solid rgba(0, 217, 180, 0.3)",
            color: "#ffffff",
            padding: "1.5rem 2rem",
            borderRadius: "0.75rem",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "1rem",
            transition: "all 0.2s",
          }}
        >
          Cancel Annual
        </button>
      </div>

      <CancelSubscriptionFlow
        show={showModal}
        onHide={() => setShowModal(false)}
        planName={planName}
        billingEndDate="March 15, 2026"
        onConfirmCancel={mockCancel}
        onAcceptDiscount={mockDiscount}
      />
    </div>
  );
}
