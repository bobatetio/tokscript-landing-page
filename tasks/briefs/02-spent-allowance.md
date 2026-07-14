# UX-54 / 02: the returning visitor whose allowance is spent (built + written decisions)

Built as working code in the live landing page. No em dashes, no en dashes, no red or pink.

## The core fix: using the product is not a mistake

Before, a spent allowance was pushed through the same `error` state as a broken link, so the paste box
turned red (`.has-error`, a red border and a red placeholder). That told a returning visitor they had
done something wrong. Removed. Spent allowance is now completely separate from `error`, so the paste box
never turns red for an expected limit. All three places that detect a spent allowance (the daily gate,
the localStorage guard, and the server `bulk_already_used` response) route through one helper,
`flagAllowanceSpent`, so the behavior is identical everywhere.

Review URLs: `/?demo=guest-spent` and `/?demo=free-spent`.

## Written decision: the spent state uses the paywall popup, not an inline notice

An earlier pass surfaced the spent state as a calm inline notice under the paste box. Per review, the
spent state now uses the site's existing paywall popup (the same two panel model as the "unlock this
feature" popup: pitch and image on the left, action on the right). This keeps one upgrade surface across
the whole product instead of a second, bespoke one. The inline notice component was removed.

Guest and free are two paths inside that one popup, which the popup already handles:

- Guest (no account) sees the sign up path: "You've Used Your 3 Free Transcripts Today", with the sign
  up form on the right.
- Free (signed in, daily allowance spent) sees the upgrade path: "You've Hit Your Free Limit. Upgrade
  Today And Get Unlimited Plus More", with the pricing tiers on the right.

The copy is the popup's own daily-limit and free-limit copy, which already matches the intent. It can be
tuned to exact wording (for example "Upgrade for unlimited transcripts") if Michael wants.

## Written decision: does a returning guest still see the paste box

Yes. The paste box stays fully usable. Removing the product's one action from a returning visitor would
punish them for having used it, which is the exact mistake this ticket exists to undo. The popup is the
nudge; the box behind it is never taken away.

## No red or pink, confirmed

The spent state never applies `.has-error` to the paste box. Verified in code and on screen for both the
guest and the free paths.
