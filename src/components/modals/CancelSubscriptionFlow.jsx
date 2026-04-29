"use client";

import "@/assets/scss/modal.scss";
import "@/assets/scss/cancel-flow.scss";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { CircleCheck, Check, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import aiDashboardImg from "@/assets/images/ai-dashboard.webp";

export default function CancelSubscriptionFlow({
  show,
  onHide,
  planName,
  billingEndDate,
  onConfirmCancel,
  onAcceptDiscount,
}) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const autoAdvanceRef = useRef(null);

  const isAnnual = planName && planName.toLowerCase().includes("annual");
  const discountedPrice = isAnnual ? "$23.40" : "$6";
  const pricePeriod = isAnnual ? "per year" : "per month";
  const priceDisplay = `${discountedPrice} ${pricePeriod}`;

  // Reset to step 1 whenever the modal opens
  useEffect(() => {
    if (show) {
      setStep(1);
      setIsLoading(false);
    }
  }, [show]);

  // Auto-advance from step 3 to step 4 after 3s
  useEffect(() => {
    if (step === 3) {
      autoAdvanceRef.current = setTimeout(() => {
        setStep(4);
      }, 3000);
    }
    return () => {
      if (autoAdvanceRef.current) {
        clearTimeout(autoAdvanceRef.current);
      }
    };
  }, [step]);

  const handleConfirmCancel = async () => {
    setIsLoading(true);
    try {
      await onConfirmCancel();
    } finally {
      setIsLoading(false);
      setStep(3);
    }
  };

  const handleAcceptDiscount = async () => {
    setIsLoading(true);
    try {
      await onAcceptDiscount();
    } finally {
      setIsLoading(false);
      setStep(5);
    }
  };

  // Each step is its own full page
  const motionKey = `step-${step}`;

  return (
    <Modal
      show={show}
      onHide={onHide}
      className="cancel-flow-modal cancel-flow-modal--fullpage"
      fullscreen
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <AnimatePresence mode="wait">
          <motion.div
            key={motionKey}
            className={`cancel-flow-step cancel-flow-step--${step}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Step 1: Save Offer — Evernote-mirrored full page */}
            {step === 1 && (
              <>
                <span className="cancel-flow-offer-badge">SAVE WITH PRO</span>
                <h2 className="cancel-flow-title">Keep your benefits for just {priceDisplay}.</h2>
                <p className="cancel-flow-subtitle cancel-flow-subtitle--wide">
                  Looking to keep TokScript at a better price point? Stay on Pro to enjoy AI Agents, unlimited transcripts, and all export formats for {discountedPrice}/{isAnnual ? "year" : "month"}.
                </p>
                <p className="cancel-flow-learn-more">Want to know the full list of what's included in the plan? <a href="/pricing" target="_blank" rel="noopener noreferrer">Learn more.</a></p>

                <div className="cancel-flow-product-image">
                  <Image src={aiDashboardImg} alt="TokScript Pro Dashboard" width={480} height={160} style={{ objectFit: "cover", objectPosition: "top" }} />
                </div>

                <div className="cancel-flow-cta-group">
                  <button
                    className="cancel-flow-btn cancel-flow-btn--primary cancel-flow-btn--auto"
                    onClick={handleAcceptDiscount}
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 size={16} className="cancel-flow-spinner" />}
                    Continue with Pro
                  </button>
                  <p className="cancel-flow-price-below">{discountedPrice} / {isAnnual ? "year" : "month"}</p>
                </div>

                <hr className="cancel-flow-divider" />

                <div className="cancel-flow-cta-group">
                  <button className="cancel-flow-btn cancel-flow-btn--outline cancel-flow-btn--auto" onClick={onHide}>
                    Keep my current plan
                  </button>
                  <button
                    className="cancel-flow-btn cancel-flow-btn--outline cancel-flow-btn--auto"
                    onClick={() => setStep(2)}
                  >
                    Cancel and lose all benefits
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Are You Sure? — Impact review */}
            {step === 2 && (
              <>
                <span className="cancel-flow-step-label">CURRENT PLAN</span>
                <h2 className="cancel-flow-title">Are you sure you want to cancel?</h2>
                <p className="cancel-flow-subtitle">Your Pro plan benefits end on {billingEndDate}.</p>
                <p className="cancel-flow-subtitle cancel-flow-subtitle--small">Here's what changes on your account.</p>

                <div className="cancel-flow-impact-card">
                  <div className="cancel-flow-impact-left">
                    <span className="cancel-flow-pro-badge">PRO</span>
                    <h3>Your Pro plan includes AI Agents, unlimited transcripts, and more.</h3>
                    <p>On the Free plan, you'll have 5 transcripts and 5 translations per day, with basic export options.</p>
                  </div>
                  <div className="cancel-flow-impact-right">
                    <h4>If you cancel, these limits apply:</h4>
                    <ul className="cancel-flow-limits-list">
                      {[
                        "No AI Agents",
                        "5 transcripts per day",
                        "5 translations per day",
                        "No bulk import",
                        "Watermarked exports only",
                        "Export limited to .txt",
                      ].map((item, i) => (
                        <li key={i} style={{ "--index": i }}>
                          <span className="cancel-flow-limit-icon"><X size={12} /></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="cancel-flow-learn-more">Want to see everything included? <a href="/pricing" target="_blank" rel="noopener noreferrer">Compare all plans</a></p>

                <div className="cancel-flow-actions cancel-flow-actions--row">
                  <button
                    className="cancel-flow-btn cancel-flow-btn--outline"
                    onClick={handleConfirmCancel}
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 size={16} className="cancel-flow-spinner" />}
                    I still want to cancel
                  </button>
                  <button
                    className="cancel-flow-btn cancel-flow-btn--primary"
                    onClick={onHide}
                  >
                    Keep my current plan
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Cancelled — full page */}
            {step === 3 && (
              <>
                <h2 className="cancel-flow-title">Your plan has been cancelled</h2>
                <p className="cancel-flow-subtitle">Your account will switch to TokScript Free.</p>
                <p className="cancel-flow-subtitle cancel-flow-subtitle--small">Your new plan starts on {billingEndDate}.</p>

                <div className="cancel-flow-decorative cancel-flow-decorative--large">
                  <div className="cancel-flow-brand-circle">
                    <span>T</span>
                  </div>
                </div>

                <div className="cancel-flow-cta-group">
                  <button className="cancel-flow-btn cancel-flow-btn--primary cancel-flow-btn--auto" onClick={onHide}>
                    Continue to Dashboard
                  </button>
                  <button className="cancel-flow-btn cancel-flow-btn--outline cancel-flow-btn--auto" onClick={onHide}>
                    See all plans
                  </button>
                </div>
              </>
            )}

            {/* Step 4: Win-back — full page */}
            {step === 4 && (
              <>
                <span className="cancel-flow-offer-badge">LAST CHANCE</span>
                <h2 className="cancel-flow-title">Before you go: 40% off TokScript Pro</h2>
                <p className="cancel-flow-subtitle cancel-flow-subtitle--wide">
                  Your Pro features, 40% less per month. No strings attached.
                </p>

                <div className="cancel-flow-pricing-card">
                  <span className="cancel-flow-discount-badge">40% OFF</span>
                  <div className="cancel-flow-pricing">
                    <span className="cancel-flow-price-old">{isAnnual ? "$39/yr" : "$10/mo"}</span>
                    <span className="cancel-flow-price-new">{discountedPrice}/{isAnnual ? "yr" : "mo"}</span>
                    {isAnnual && <span className="cancel-flow-price-per">($1.95/mo)</span>}
                  </div>
                  <p className="cancel-flow-pricing-dates">
                    Starting from {billingEndDate}
                  </p>
                </div>

                <p className="cancel-flow-fine-print">
                  Renews automatically at {discountedPrice}/{isAnnual ? "yr" : "mo"}. Manage anytime from Settings.
                </p>

                <div className="cancel-flow-cta-group">
                  <button
                    className="cancel-flow-btn cancel-flow-btn--primary cancel-flow-btn--auto"
                    onClick={handleAcceptDiscount}
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 size={16} className="cancel-flow-spinner" />}
                    Reactivate Pro at 40% Off
                  </button>

                  <button
                    className="cancel-flow-btn cancel-flow-btn--ghost"
                    onClick={onHide}
                  >
                    No thanks, keep my cancellation
                  </button>
                </div>
              </>
            )}

            {/* Step 5: Congratulations! — Celebration */}
            {step === 5 && (
              <>
                <div className="cancel-flow-icon-wrap cancel-flow-icon-wrap--cyan">
                  <CircleCheck size={48} />
                </div>
                <h2 className="cancel-flow-title cancel-flow-title--gradient">You're all set</h2>
                <p className="cancel-flow-body">
                  Your Pro plan continues at {priceDisplay}.
                  <br />
                  This rate applies to your next billing cycle starting {billingEndDate}.
                </p>
                <button className="cancel-flow-btn cancel-flow-btn--primary cancel-flow-btn--auto" onClick={onHide}>
                  Continue to Dashboard
                </button>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </Modal.Body>
    </Modal>
  );
}
