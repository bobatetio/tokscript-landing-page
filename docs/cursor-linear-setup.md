# Connect Linear to Cursor

Setup guide for the official Cursor ↔ Linear integration. Lets you delegate Linear issues to Cursor’s cloud agent and get PRs/updates back in Linear.

## Requirements

- **Cursor**: Pro or Ultra plan (uses Cursor’s cloud/background agents).
- **Permissions**: A workspace admin must enable the integration from the Cursor dashboard.

---

## 1. Enable in Cursor (admin)

1. Open **Cursor Dashboard → Background agents**:  
   https://cursor.com/dashboard?tab=background-agents
2. Install or enable the **Linear** integration for your workspace.

---

## 2. Use in Linear

- In any Linear issue:
  - **Assign** the issue to **Cursor** from the assignee menu, or
  - **Mention** `@cursor` in a comment.
- The first time you delegate, you may be prompted to **link your Cursor account** to Linear; follow the in-product prompts.

---

## 3. Optional

- Configure **triaging rules** in Linear so certain issues (e.g. bugs) are auto-assigned to the Cursor agent.

---

## Summary

| Step | Where | Action |
|------|--------|--------|
| 1 | [Cursor → Background agents](https://cursor.com/dashboard?tab=background-agents) | Install/enable Linear |
| 2 | Linear: any issue | Assign to Cursor or comment `@cursor` |
| 3 | One-time | Link Cursor account when prompted in Linear |

No code changes are required in this repo; setup is account/product only.
