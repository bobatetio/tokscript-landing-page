"use client";

import "@/assets/scss/modal.scss";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import {
  Check,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  X,
  Play,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "@/components/Icons";
// Styles are in /src/assets/scss/modal.scss

// Validation schemas
const signInSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

const signUpSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

export default function CheckoutOverlay({
  isOpen,
  onClose,
  plan = null,
  isLogin = false,
  checkoutUrl = null,
  onAuthSuccess = null,
  aff = null,
  t,
}) {
  const [mode, setMode] = useState(isLogin ? "signin" : "signup");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    type: "",
    isVisible: false,
  });

  // Reset mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(isLogin ? "signin" : "signup");
      setToast({ message: "", type: "", isVisible: false });
    }
  }, [isOpen, isLogin]);

  const showToast = (message, type) => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 5000);
  };

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email: values.email,
          password: values.password,
        },
      );

      if (response.data?.tokens && response.data?.user) {
        const { accessToken, refreshToken } = response.data.tokens;
        const user = response.data.user;

        // Store auth data
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        showToast(t?.checkoutOverlay?.toasts?.loginSuccess || "Login successful!", "success");

        // Close modal and trigger callback
        setTimeout(() => {
          onClose();
          if (onAuthSuccess) {
            onAuthSuccess(user);
          } else if (checkoutUrl) {
            redirectToCheckout(user, checkoutUrl, aff);
          }
        }, 500);
      }
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        t?.checkoutOverlay?.toasts?.loginError ||
        "Invalid email or password. Please check your credentials and try again.";
      showToast(errorMessage, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      const registrationData = {
        name: values.email.split("@")[0],
        email: values.email,
        password: values.password,
      };

      const registerResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        registrationData,
      );

      if (registerResponse.data) {
        showToast(t?.checkoutOverlay?.toasts?.accountCreated || "Account created successfully! Logging you in...", "success");

        // Auto-login after registration
        try {
          const loginResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              email: values.email,
              password: values.password,
            },
          );

          if (loginResponse.data?.tokens && loginResponse.data?.user) {
            const { accessToken, refreshToken } = loginResponse.data.tokens;
            const user = loginResponse.data.user;

            // Store auth data
            localStorage.setItem("authToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("user", JSON.stringify(user));

            // Close modal and trigger callback
            setTimeout(() => {
              onClose();
              if (onAuthSuccess) {
                onAuthSuccess(user);
              } else if (checkoutUrl) {
                redirectToCheckout(user, checkoutUrl);
              }
            }, 1000);
          }
        } catch (loginError) {
          console.error("Auto-login failed:", loginError);
          showToast(t?.checkoutOverlay?.toasts?.accountCreatedSignIn || "Account created! Please sign in.", "success");
          setMode("signin");
        }
      }
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        t?.checkoutOverlay?.toasts?.registrationError ||
        "Something went wrong during registration. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const redirectToCheckout = (user, buyUrl, aff) => {
    if (!buyUrl) return;

    // Only redirect to checkout if user is on free plan or pro without active subscription
    if (
      user?.plan === "free" ||
      (user?.plan === "pro" && user?.subscription?.status !== "active")
    ) {
      const checkoutUrlWithUser =
        buyUrl +
        `?checkout[email]=${encodeURIComponent(user.email)}` +
        `&checkout[name]=${encodeURIComponent(user.name || user.email)}` +
        `&checkout[custom][user_id]=${user?.id || user._id}` + (aff ? `&aff=${aff}` : '');

      window.location.href = checkoutUrlWithUser;
    } else {
      // User already has active subscription, just reload
      window.location.reload();
    }
  };

  const handleGoogleAuth = () => {
    // Store the checkout URL for after Google auth callback
    if (checkoutUrl) {
      localStorage.setItem("googleAuthReturnUrl", checkoutUrl);
    }

    // Redirect to Google OAuth endpoint
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${apiBaseUrl}/auth/google/simple`;
  };

  const switchMode = (e) => {
    e.preventDefault();
    setMode(mode === "signin" ? "signup" : "signin");
    setToast({ message: "", type: "", isVisible: false });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    window.location.href = "/app/forgot-password";
  };

  const currentIsLogin = mode === "signin";

  return (
    <Modal
      show={isOpen}
      // show={true}
      onHide={onClose}
      centered
      dialogClassName="checkout-overlay-modal"
      contentClassName="checkout-modal-content"
      backdrop="static"
    >
      <Modal.Body>
        {/* Close Button (Mobile) */}
        <button
          onClick={onClose}
          className="checkout-close-btn mobile-only"
          type="button"
        >
          <X size={16} />
        </button>

        {/* --- LEFT PANEL: Branding & Value --- */}
        <div className="checkout-left-panel">
          {/* Logo */}
          {/* <div className="checkout-logo">
            <div className="logo-icon">
              <Play size={16} fill="currentColor" />
            </div>
            <span className="logo-text">TokScript</span>
          </div> */}

          {/* Content */}
          <div className="checkout-content">
            {currentIsLogin ? (
              // LOGIN MODE CONTENT
              <>
                <h2 className="checkout-welcome-title">{t?.checkoutOverlay?.login?.title || "Welcome back"}</h2>
                <p className="checkout-welcome-subtitle">
                  {t?.checkoutOverlay?.login?.subtitle || "Your transcripts are waiting for you."}
                </p>

                <div className="checkout-divider"></div>

                <div className="checkout-features-list">
                  <div className="checkout-feature-item">
                    <Check size={20} className="feature-icon" strokeWidth={3} />
                    <span className="feature-text">
                      {t?.checkoutOverlay?.login?.feature1 ? (
                        `${t.checkoutOverlay.login.feature1} - ${t.checkoutOverlay.login.feature1Detail}`
                      ) : (
                        <><strong>Instant access</strong>, pick up where you left off</>
                      )}
                    </span>
                  </div>
                  <div className="checkout-feature-item">
                    <Check size={20} className="feature-icon" strokeWidth={3} />
                    <span className="feature-text">
                      {t?.checkoutOverlay?.login?.feature2 ? (
                        `${t.checkoutOverlay.login.feature2} - ${t.checkoutOverlay.login.feature2Detail}`
                      ) : (
                        <><strong>Synced library</strong>, all your saved transcripts</>
                      )}
                    </span>
                  </div>
                  <div className="checkout-feature-item">
                    <Check size={20} className="feature-icon" strokeWidth={3} />
                    <span className="feature-text">
                      {t?.checkoutOverlay?.login?.feature3 ? (
                        `${t.checkoutOverlay.login.feature3} - ${t.checkoutOverlay.login.feature3Detail}`
                      ) : (
                        <><strong>AI Agents ready</strong>, create your next viral hit</>
                      )}
                    </span>
                  </div>
                </div>

                <div className="checkout-trust-section login-trust">
                  <div className="checkout-avatars">
                    <div className="avatars-stack">
                      <img className="avatar" src="https://i.pravatar.cc/48?img=12" alt="" width="48" height="48" loading="lazy" />
                      <img className="avatar" src="https://i.pravatar.cc/48?img=32" alt="" width="48" height="48" loading="lazy" />
                      <img className="avatar" src="https://i.pravatar.cc/48?img=47" alt="" width="48" height="48" loading="lazy" />
                      <div className="avatar avatar-count">+41K</div>
                    </div>
                    <div className="trust-text">
                      {t?.checkoutOverlay?.login?.trustText ? t.checkoutOverlay.login.trustText.replace("{count}", "41,000+") : <>Trusted by <span>41,000+</span> users</>}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // CHECKOUT MODE CONTENT
              <>
                <div className="mb-2 text-center">
                  <div className="plan-wrapper d-flex align-items-center justify-content-between w-100 mb-2">
                    <div className="checkout-selecting-label">
                      {t?.checkoutOverlay?.signup?.orderSummary || "Order Summary"}
                    </div>
                    {/* <div className="checkout-badge">save</div> */}
                    {plan?.badge && (
                      <div className="checkout-badge">{plan.badge}</div>
                    )}
                  </div>
                  <div className="plan-info-wrapper d-flex align-items-baseline">
                    <h2 className="checkout-plan-name">{plan?.name || ""}</h2>
                    {plan?.price && (
                      <div className="checkout-price-row">
                        <span className="price-value">{plan?.price}</span>
                        <span className="price-period">{plan?.period}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="checkout-divider my-divider"></div>

                <div className="checkout-features-list">
                  {plan?.features &&
                    plan.features.map((feature, idx) => (
                      <div key={idx} className="checkout-feature-circle">
                        <div className="feature-icon-circle">
                          <Check size={10} strokeWidth={4} />
                        </div>
                        <span className="feature-text">{feature}</span>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>

          {/* Trust Section (Checkout Only) */}
          {!currentIsLogin && (
            <div className="checkout-trust-section">
              <div className="checkout-avatars">
                <div className="avatars-stack small">
                  <img className="avatar" src="https://i.pravatar.cc/40?img=32" alt="" width="40" height="40" loading="lazy" />
                  <img className="avatar" src="https://i.pravatar.cc/40?img=47" alt="" width="40" height="40" loading="lazy" />
                  <div className="avatar avatar-count">+41K</div>
                </div>
                <div className="trust-text small">
                  {t?.checkoutOverlay?.signup?.trustText || "Join 41,000+ users using TokScript"}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- RIGHT PANEL: Form (White) --- */}
        <div className="checkout-right-panel">
          {/* Close Button (Desktop) */}
          <button
            onClick={onClose}
            className="checkout-close-btn desktop-only"
            type="button"
          >
            <X size={20} />
          </button>

          {/* Toast Message */}
          {toast.isVisible && (
            <div
              className={`checkout-toast ${toast.type}`}
              style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: toast.type === "error" ? "#fee2e2" : "#d1fae5",
                color: toast.type === "error" ? "#dc2626" : "#059669",
                fontSize: "14px",
                fontWeight: 500,
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              {toast.type === "error" ? (
                <AlertCircle size={16} />
              ) : (
                <CheckCircle size={16} />
              )}
              {toast.message}
            </div>
          )}

          <div className="checkout-form-container">
            <div className="checkout-form-header">
              <h3 className="checkout-form-title">
                {currentIsLogin ? (t?.checkoutOverlay?.form?.welcomeBack || "Welcome back") : (t?.checkoutOverlay?.form?.createAccount || "Create your account")}
              </h3>
              {!isLogin && (
                <div className="checkout-steps">
                  <div className="step-dot active"></div>
                  <div className="step-dot inactive"></div>
                  <span className="step-text">{t?.checkoutOverlay?.form?.step1of2 || "Step 1 of 2"}</span>
                </div>
              )}{" "}
              *
            </div>

            <p className="checkout-form-subtitle">
              {currentIsLogin ? (
                t?.checkoutOverlay?.form?.loginSubtitle || "Enter your details to access your workspace."
              ) : (
                t?.checkoutOverlay?.form?.signupSubtitle ? (
                  <>{t.checkoutOverlay.form.signupSubtitle} <strong>{plan?.name || "Pro Plan"}</strong>.</>
                ) : (
                  <>
                    Set up your login details for your{" "}
                    <strong>{plan?.name || "Pro Plan"}</strong>.
                  </>
                )
              )}
            </p>

            <Formik
              key={mode}
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={currentIsLogin ? signInSchema : signUpSchema}
              onSubmit={currentIsLogin ? handleLogin : handleRegister}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="checkout-form">
                  {/* Email */}
                  <div className="checkout-field">
                    <label className="checkout-label">{t?.checkoutOverlay?.form?.emailLabel || "Email"}</label>
                    <div className="checkout-input-wrapper">
                      <Mail className="input-icon" size={18} />
                      <Field
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        className="checkout-input"
                        autoFocus
                      />
                    </div>
                    {errors.email && touched.email && (
                      <div
                        className="checkout-error"
                        style={{
                          color: "#dc2626",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="checkout-field">
                    <div className="checkout-label-row">
                      <label className="checkout-label">{t?.checkoutOverlay?.form?.passwordLabel || "Password"}</label>
                      {currentIsLogin && (
                        <a
                          href="#"
                          onClick={handleForgotPassword}
                          className="checkout-forgot-link"
                        >
                          {t?.checkoutOverlay?.form?.forgotPassword || "Forgot?"}
                        </a>
                      )}
                    </div>
                    <div className="checkout-input-wrapper">
                      <Lock className="input-icon" size={18} />
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder={
                          currentIsLogin
                            ? (t?.checkoutOverlay?.form?.passwordPlaceholderLogin || "Enter your password")
                            : (t?.checkoutOverlay?.form?.passwordPlaceholderSignup || "Create a password")
                        }
                        className="checkout-input has-toggle"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="checkout-password-toggle"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.password && touched.password && (
                      <div
                        className="checkout-error"
                        style={{
                          color: "#dc2626",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="checkout-submit-btn"
                  >
                    {isSubmitting ? (
                      <Loader2 className="spinner" size={20} />
                    ) : (
                      <>
                        {currentIsLogin
                          ? (t?.checkoutOverlay?.form?.signIn || "Sign In")
                          : plan?.buttonText || t?.checkoutOverlay?.form?.continue || "Continue"}{" "}
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="checkout-divider-row">
                    <div className="divider-line"></div>
                    <span className="divider-text">{t?.checkoutOverlay?.form?.or || "or"}</span>
                    <div className="divider-line"></div>
                  </div>

                  {/* Social Auth */}
                  <button
                    type="button"
                    className="checkout-google-btn"
                    onClick={handleGoogleAuth}
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      width="20"
                      height="20"
                    />
                    {t?.checkoutOverlay?.form?.continueWithGoogle || "Continue with Google"}
                  </button>

                  {/* Footer */}
                  {currentIsLogin ? (
                    <div className="checkout-footer login-footer">
                      {t?.checkoutOverlay?.form?.noAccount || "Don't have an account?"}{" "}
                      <a href="#" onClick={switchMode}>
                        {t?.checkoutOverlay?.form?.signUp || "Sign up"}
                      </a>
                    </div>
                  ) : (
                    <div className="checkout-footer checkout-footer-secure">
                      <div
                        className="checkout-footer login-footer"
                        style={{ marginBottom: "12px" }}
                      >
                        {t?.checkoutOverlay?.form?.hasAccount || "Already have an account?"}{" "}
                        <a href="#" onClick={switchMode}>
                          {t?.checkoutOverlay?.form?.signInLink || "Sign in"}
                        </a>
                      </div>
                      <div className="checkout-secure-text">
                        <Lock size={12} /> {t?.checkoutOverlay?.form?.secureCheckout || "Secure 256-bit encrypted checkout"}
                      </div>
                      <div className="checkout-payment-icons">
                        <FaCcVisa className="payment-icon" />
                        <FaCcMastercard className="payment-icon" />
                        <FaCcAmex className="payment-icon" />
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
