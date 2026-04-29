"use client";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { X } from "lucide-react";

import envelopeIcon from "../../assets/images/icons/envelope-icon.svg";
import keyIcon from "../../assets/images/icons/key-icon.svg";
import googleIcon from "../../assets/images/icons/google-icon.svg";
// Google Icon SVG
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function AuthModal({ show, onHide, initialMode = "signin" }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Add your authentication logic here
    try {
      if (mode === "signin") {
        // Handle sign in
        console.log("Sign in:", { email, password });
      } else {
        // Handle sign up
        console.log("Sign up:", { email, password, confirmPassword });
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    // Add your Google authentication logic here
    console.log("Google auth");
  };

  const switchMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Modal
      // show={true}
      show={show}
      onHide={onHide}
      centered
      className="auth-modal"
      backdrop="static"
    >
      <div className="auth-modal-content">
        {/* Close Button */}
        <button className="close-btn" onClick={onHide}>
          <X size={20} />
        </button>

        {/* Badge */}
        <div className="heading-wrapper">
          <div className="badge-wrapper gradient-border d-inline-flex">
            <strong className="text-gradient w-600">
              {mode === "signin" ? "SIGN IN" : "SIGN UP"}
            </strong>
          </div>
          {/* Heading */}
          <h1 className="auth-heading">
            {mode === "signin" ? (
              "Log In to Your Workspace"
            ) : (
              <>
                Sign up free and start
                <br />
                optimizing your TikTok content.
              </>
            )}
          </h1>
          {/* Subheading for Sign In */}
          {mode === "signin" && (
            <p className="light">
              Access your scripts, hooks, and frameworks instantly.
            </p>
          )}
        </div>

        {/* Form Card */}
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="form">
            {mode === "signup" && (
              <p className="form-label">Let's get to know you</p>
            )}

            {/* Email Field */}
            <div className="form-group has-left-icon">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Image
                src={envelopeIcon}
                alt=""
                className="input-icon"
              />
            </div>

            {mode === "signup" && (
              <p className="form-label">Let's protect your account</p>
            )}

            {/* Password Field */}
            <div className="form-group has-left-icon">
              <input
                type="password"
                className="form-control"
                placeholder={
                  mode === "signin" ? "Enter your password here" : "Password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Image src={keyIcon} alt="" className="input-icon" />
            </div>

            {/* Confirm Password Field (Sign Up only) */}
            {mode === "signup" && (
              <div className="form-group has-left-icon">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Image src={keyIcon} alt="" className="input-icon" />
              </div>
            )}

            {/* Forgot Password Link (Sign In only) */}
            {mode === "signin" && (
              <div className="form-text text-end form-group">
                <p className="white">
                  Forgot your password?{" "}
                  <a href="#" className="pink underline">
                    Reset it here
                  </a>
                </p>
              </div>
            )}
            <div className="sign-in-wrapper">
              <button
                type="submit"
                className="btn-style w-600 full-width btn btn-primary"
                disabled={isLoading}
              >
                {isLoading
                  ? "Loading..."
                  : mode === "signin"
                    ? "Sign In"
                    : "Sign up"}
              </button>
              <p className="m-0">or</p>
              <ul className="register-options">
                <li>
                  <button
                    type="button"
                    className="google-btn"
                    onClick={handleGoogleAuth}
                  >
                    <Image src={googleIcon} alt="Sign in with Google" />
                  </button>
                </li>
              </ul>
            </div>

            <div className="account-text-wrapper">
              {mode === "signin" ? (
                <p className="white m-0">
                  I don't have an account{" "}
                  <a href="#" onClick={switchMode} className="pink underline">
                    Sign Up
                  </a>
                </p>
              ) : (
                <p className="white m-0">
                  Already have an account?{" "}
                  <a href="#" onClick={switchMode} className="pink underline">
                    Sign In
                  </a>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
