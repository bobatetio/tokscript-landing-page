"use client";
import "@/assets/scss/modal.scss";
import React from "react";
import { Modal } from "react-bootstrap";

export default function ConfirmationModal({
  setShowConfirmation,
  handleConfirmation,
  showConfirmation,
  t,
}) {
  return (
    <div className="confirmation-modal-wrapper">
      <Modal
        show={showConfirmation}
        // show={true}
        onHide={() => setShowConfirmation(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="upgrade-package-modal dashboarmodald-download-modal custom-modal"
      >
        <Modal.Body>
          <p>
            {t?.confirmationModal?.paragraph1 || "You are about to upgrade your subscription plan. This will provide you with access to premium features and benefits."}
          </p>
          <p>{t?.confirmationModal?.paragraph2 || "Please note that you will be charged according to the new plan."}</p>
          <p>{t?.confirmationModal?.paragraph3 || "Are you sure you want to proceed with the upgrade?"}</p>
          <div className="btn-wrapper">
            <button
              onClick={() => handleConfirmation(false)}
              className="btn-style dark"
            >
              {t?.confirmationModal?.cancel || "Cancel"}
            </button>
            <button
              onClick={() => handleConfirmation(true)}
              className="btn-style "
            >
              {t?.confirmationModal?.upgrade || "Upgrade"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
