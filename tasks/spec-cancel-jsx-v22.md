# Spec: cancel-jsx-v22 — All JSX Changes

## File: `src/components/modals/CancelSubscriptionFlow.jsx`

## Import Changes
- Replace `ShieldAlert` with `Info` from lucide-react
- Line 5 currently: `import { CircleCheck, Check, Loader2, ShieldAlert, X } from "lucide-react";`
- Change to: `import { CircleCheck, Check, Info, Loader2, X } from "lucide-react";`

## Modal Props Change
- On the `<Modal>` component (around line 70), add `backdrop="static"` and `keyboard={false}` props

## Auto-advance Timing Change
- Line 35: change `1500` to `3000` in the setTimeout

## STEP 1 (lines ~97-148)

Replace the entire Step 1 block `{step === 1 && ( ... )}` with:

```jsx
{step === 1 && (
  <>
    <span className="cancel-flow-step-label">CURRENT PLAN</span>
    <h2 className="cancel-flow-title">Are you sure you want to cancel?</h2>
    <p className="cancel-flow-subtitle">Your Pro plan benefits end on {billingEndDate}.</p>
    <p className="cancel-flow-subtitle cancel-flow-subtitle--small">Here's what changes on your account.</p>

    <div className="cancel-flow-impact-card">
      <div className="cancel-flow-impact-left">
        <div className="cancel-flow-impact-icon">
          <Info size={20} />
        </div>
        <h3>Your Pro plan includes AI Agents, unlimited transcripts, and more.</h3>
        <p>On the Free plan, you'll have 5 transcripts and 5 translations per day, with basic export options.</p>
      </div>
      <div className="cancel-flow-impact-right">
        <h4>If you cancel, these limits apply:</h4>
        <ul className="cancel-flow-limits-list">
          {[
            "No access to AI Agents",
            "5 transcripts per day",
            "5 translations per day",
            "No bulk video import",
            "Watermarked exports at standard quality",
            "Limited export formats (.txt only)",
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
        onClick={() => setStep(2)}
      >
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
```

## STEP 2 (lines ~150-189)

Replace the entire Step 2 block `{step === 2 && ( ... )}` with:

```jsx
{step === 2 && (
  <>
    <h2 className="cancel-flow-title">Keep TokScript Pro at 40% off.</h2>
    <p className="cancel-flow-subtitle">
      Get 40% off your next billing cycle and keep full access to AI Agents, unlimited transcripts, and all export formats.
    </p>

    <div className="cancel-flow-pricing-card">
      <span className="cancel-flow-discount-badge">40% OFF</span>
      <div className="cancel-flow-pricing">
        <span className="cancel-flow-price-old">{isAnnual ? "$39/yr" : "$10/mo"}</span>
        <span className="cancel-flow-price-new">{discountedPrice}</span>
      </div>
    </div>

    <ul className="cancel-flow-retain-list">
      <li><span className="cancel-flow-check-icon"><Check size={12} /></span><span>Unlimited access to AI Agents</span></li>
      <li><span className="cancel-flow-check-icon"><Check size={12} /></span><span>Unlimited transcripts and translations</span></li>
      <li><span className="cancel-flow-check-icon"><Check size={12} /></span><span>All export formats, plus bulk import</span></li>
    </ul>

    <button
      className="cancel-flow-btn cancel-flow-btn--primary"
      onClick={handleAcceptDiscount}
      disabled={isLoading}
    >
      {isLoading && <Loader2 size={16} className="cancel-flow-spinner" />}
      Claim My Discount
    </button>

    <button className="cancel-flow-btn cancel-flow-btn--outline" onClick={onHide}>
      Keep my plan at full price
    </button>

    <hr className="cancel-flow-divider" />

    <button
      className="cancel-flow-btn cancel-flow-btn--ghost"
      onClick={handleConfirmCancel}
      disabled={isLoading}
    >
      {isLoading && <Loader2 size={16} className="cancel-flow-spinner" />}
      No thanks, cancel my plan
    </button>
  </>
)}
```

## STEPS 3+4 (lines ~192-263)

Replace the entire Steps 3+4 block `{(step === 3 || step === 4) && ( ... )}` with:

```jsx
{(step === 3 || step === 4) && (
  <>
    <h2 className="cancel-flow-title">Your plan has been cancelled</h2>
    <p className="cancel-flow-subtitle">
      Your account will switch to TokScript Free on {billingEndDate}.
    </p>

    <div className="cancel-flow-decorative cancel-flow-decorative--large">
      <div className="cancel-flow-brand-circle">
        <span>T</span>
      </div>
    </div>

    <button className="cancel-flow-btn cancel-flow-btn--primary" onClick={onHide}>
      Continue to Dashboard
    </button>
    <button className="cancel-flow-btn cancel-flow-btn--outline" onClick={onHide}>
      See all plans
    </button>

    {/* Win-back overlay -- only on step 4 */}
    {step === 4 && (
      <motion.div
        className="cancel-flow-winback-overlay"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="cancel-flow-winback-card">
          <div className="cancel-flow-winback-header">
            <h2>Before you go: 40% off TokScript Pro</h2>
            <button
              className="cancel-flow-close-btn cancel-flow-close-btn--card"
              onClick={onHide}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
          <p className="cancel-flow-subtitle">
            Your Pro features, 40% less per month. No strings attached.
          </p>

          <div className="cancel-flow-pricing-card">
            <span className="cancel-flow-discount-badge">40% OFF</span>
            <div className="cancel-flow-pricing">
              <span className="cancel-flow-price-old">{isAnnual ? "$39/yr" : "$10/mo"}</span>
              <span className="cancel-flow-price-new">{discountedPrice}</span>
              {isAnnual && <span className="cancel-flow-price-per">($1.95/mo)</span>}
            </div>
            <p className="cancel-flow-pricing-dates">
              Starting from {billingEndDate}
            </p>
          </div>

          <p className="cancel-flow-fine-print">
            Renews automatically at {discountedPrice}. Manage anytime from Settings.
          </p>

          <button
            className="cancel-flow-btn cancel-flow-btn--primary"
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
      </motion.div>
    )}
  </>
)}
```

## STEP 5 (lines ~266-280)

Replace the entire Step 5 block `{step === 5 && ( ... )}` with:

```jsx
{step === 5 && (
  <>
    <div className="cancel-flow-icon-wrap cancel-flow-icon-wrap--cyan">
      <CircleCheck size={48} />
    </div>
    <h2 className="cancel-flow-title cancel-flow-title--gradient">You're all set</h2>
    <p className="cancel-flow-body">
      Your Pro plan continues at {discountedPrice}. This rate applies to your next billing cycle starting {billingEndDate}.
    </p>
    <button className="cancel-flow-btn cancel-flow-btn--primary" onClick={onHide}>
      Continue to Dashboard
    </button>
  </>
)}
```

## CRITICAL RULES
- NO em dashes or en dashes anywhere in copy
- Keep all existing state logic, hooks, and event handlers EXACTLY as they are (except the timeout change)
- Keep the AnimatePresence, motionKey, and stepClass logic EXACTLY as it is
- Keep the close button outside AnimatePresence EXACTLY as it is
- Do NOT change any prop names or the component signature
