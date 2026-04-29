import React, { useState } from "react";
import { motion } from "framer-motion";
// In your project, import from correct path:
import CheckoutOverlay from "./CheckoutOverlay";

// --- DATA: PLAN CONFIGURATIONS ---

const FREE_PLAN = {
  id: "free_tier",
  name: "Free Plan",
  price: "$0",
  period: "/forever",
  buttonText: "Create Free Account",
  features: [
    "3 Transcripts per day",
    "Standard Definition downloads",
    "Basic Chrome Extension",
    "Public video analysis",
    "Community Support",
  ],
};

const MONTHLY_PLAN = {
  id: "monthly_tier",
  name: "Monthly Plan",
  price: "$10",
  period: "/month",
  buttonText: "Continue to Payment",
  features: [
    "Unlimited Transcripts",
    "Viral Hook Generator",
    "Viral Script Writer",
    "HD Video Downloads",
    "Chrome Extension Pro",
    "Cancel anytime",
    "Private & Secure data",
  ],
};

const ANNUAL_PLAN = {
  id: "annual_tier",
  name: "Annual Plan",
  price: "$39",
  period: "/year",
  badge: "Save $81/year",
  buttonText: "Continue to Payment",
  features: [
    "Viral Hook Generator",
    "Viral Script Writer",
    "Unlimited Transcripts",
    "Bulk Import (50 Videos)",
    "HD Video Downloads",
    "Chrome Extension Pro",
    "All Export Formats",
    "Priority Support",
    "Commercial Use",
  ],
};

const LOGIN_PLAN = {
  id: "login_flow",
  name: "TokScript",
  features: [
    "Resume your research",
    "Access saved transcripts",
    "Manage your account",
    "View team settings",
  ],
  buttonText: "Log In",
};

export default function DemoPage() {
  const [activePlan, setActivePlan] = useState(null);
  const [isLoginMode, setIsLoginMode] = useState(false);

  const handlePlanSelect = (plan, loginMode = false) => {
    setActivePlan(plan);
    setIsLoginMode(loginMode);
  };

  const handleClose = () => {
    setActivePlan(null);
    setIsLoginMode(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">
          Checkout & Login Modal System
        </h1>
        <p className="text-zinc-400">
          Click a button below to trigger the modal in different states.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
        <button
          onClick={() => handlePlanSelect(FREE_PLAN)}
          className="bg-zinc-800 hover:bg-zinc-700 text-white p-6 rounded-xl border border-zinc-700 transition-all"
        >
          <div className="text-xs font-bold text-zinc-500 uppercase mb-2">
            Scenario 1
          </div>
          <div className="font-bold text-lg">Free Plan</div>
        </button>

        <button
          onClick={() => handlePlanSelect(MONTHLY_PLAN)}
          className="bg-indigo-900/20 hover:bg-indigo-900/40 text-white p-6 rounded-xl border border-indigo-500/30 transition-all"
        >
          <div className="text-xs font-bold text-indigo-400 uppercase mb-2">
            Scenario 2
          </div>
          <div className="font-bold text-lg">Monthly</div>
        </button>

        <button
          onClick={() => handlePlanSelect(ANNUAL_PLAN)}
          className="bg-emerald-900/20 hover:bg-emerald-900/40 text-white p-6 rounded-xl border border-emerald-500/30 transition-all"
        >
          <div className="text-xs font-bold text-emerald-400 uppercase mb-2">
            Scenario 3
          </div>
          <div className="font-bold text-lg">Annual</div>
        </button>

        <button
          onClick={() => handlePlanSelect(LOGIN_PLAN, true)}
          className="bg-white hover:bg-zinc-200 text-zinc-900 p-6 rounded-xl border border-zinc-200 transition-all"
        >
          <div className="text-xs font-bold text-zinc-500 uppercase mb-2">
            Scenario 4
          </div>
          <div className="font-bold text-lg">Login</div>
        </button>
      </div>

      {/* THE COMPONENT INSTANCE */}
      {activePlan && (
        <CheckoutOverlay
          isOpen={!!activePlan}
          onClose={handleClose}
          plan={activePlan}
          isLogin={isLoginMode}
        />
      )}
    </div>
  );
}
