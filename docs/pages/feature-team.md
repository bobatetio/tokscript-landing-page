# Team Collaboration Feature Page Documentation

**URL:** https://tokscript.com/features/team

**Source Files:**
- src/app/features/team/page.js
- src/app/features/team/PageData.js

## Metadata

- **Title:** Team Transcript Library - Shared Workspaces for Agencies & Teams | TokScript
- **Description:** Share transcript libraries with your team. Create workspaces for clients, collaborate on research, and stop duplicating effort. Built for agencies and content teams.
- **Canonical:** https://tokscript.com/features/team
- **Keywords:** team transcript tool, shared transcript library, agency video tools, collaborative content research, team swipe file, shared video research, agency tiktok tools
- **OpenGraph Title:** Team Transcript Library | TokScript
- **OpenGraph Description:** Share transcript libraries with your team. Built for agencies and content teams.
- **OpenGraph URL:** https://tokscript.com/features/team

## Page Sections

### Header Component
- Standard TokScript header navigation

### Hero Section
- **Kicker Badge:**
  - Icon: Users icon
  - Text: "TEAM WORKSPACES"
- **H1 Title:** "One Library. Zero Duplicated Work."
  - Subtitle gradient: linear-gradient(135deg, #ffffff 0%, #99f6e4 100%)
- **Description:** "Create shared workspaces where your team accesses the same transcript library. Research once, benefit everyone. Stop pinging Slack asking 'did anyone already transcribe that video?'"
- **CTA Button:**
  - Text: "Start Your Team Workspace" with ArrowRight icon
  - Link: "/"
  - Background: #14b8a6 (teal)
  - Shadow: 0 4px 14px rgba(20, 184, 166, 0.4)
- **Visual:** Animated workspace switcher showing "SELECT WORKSPACE" dropdown with two workspaces: "Acme Agency" (14 members, 4.2k videos) with teal gradient, and "Stark Fitness" (3 members, 840 videos) with purple gradient

### Core Value Section
- **Title:** "Stop paying for the same research twice."
- **Subtitle:** "Monday: Sarah transcribes 30 videos. Tuesday: Jake transcribes 25 videos, including 15 Sarah already captured. Wednesday: You ask for 'that hook' and get three Slack threads with no answers. Individual accounts mean individual libraries."

#### Comparison: Without Team Workspaces vs With Team Workspaces
**Without (Left side):**
- Label: "Individual Silos"
- Heading: "Fragmented Intelligence"
- Copy: "Your team's collective research intelligence stays fragmented across personal accounts nobody else can search. You're paying for the same work twice."
- Visual: Faux UI panel showing problems (Fragmented libraries, Duplicated transcriptions, Research lost when staff leaves) with red bullet points

**With (Right side - Hover Interactive):**
- Label: "TokScript Teams"
- Heading: "Collective Brainpower"
- Copy: "Every transcript your team extracts saves to the shared workspace. Individual research becomes searchable by the whole team. No more siloed lookups."
- Visual: Animated team activity feed showing recent additions with user avatars (Sarah J. imported 50 videos, Mike T. extracted transcript, Alex R. created new folder)

### Timeline Section: How Team Workspaces Work
**Section Title:** "How Team Workspaces Work"
**Subtitle:** "Set up in minutes. Add members as you grow."

#### Three Steps

1. **Create Your Team Workspace**
   - Watermark: "01"
   - Title: "Create Your Team Workspace"
   - Description: "Set up a shared workspace and invite your team members. Choose a name, add collaborators by email, assign roles. Takes about 2 minutes."

2. **Build Shared Libraries Together**
   - Watermark: "02"
   - Title: "Build Shared Libraries Together"
   - Description: "Every transcript your team extracts can save to the shared library. See what teammates have already captured before duplicating effort."

3. **Search Across Everything**
   - Watermark: "03"
   - Title: "Search Across Everything"
   - Description: "Need a specific hook? Search the entire team library, not just your own extractions. Find research you didn't even know existed."

### Bento Grid Section: Collaboration Built for Agencies
**Section Title:** "Collaboration Built for Agencies"
**Subtitle:** "The features that matter when you're handling multiple clients at once."

#### Five Feature Cards

1. **Multiple Workspaces** (spans 2 columns on desktop)
   - Kicker: "Multiple Workspaces" (color: #5eead4)
   - Heading: "Separate Spaces for Each Client"
   - Copy: "Create distinct workspaces for different clients, projects, or teams. Client A's research stays in Client A's workspace. No accidental cross-posting, no confidentiality concerns."
   - Visual: Animated workspace switcher showing two workspace options with teal and purple gradients and member/video counts

2. **Role-Based Permissions** (1 column)
   - Heading: "Role-Based Permissions"
   - Copy: "Assign roles: Admins manage, Editors organize, Viewers can search but not modify. Protect your research from accidents."
   - Visual: Animated permission roles visualization showing Admin, Editor, Viewer rows with glowing color animations on hover

3. **Activity Tracking** (1 column)
   - Heading: "Activity Tracking"
   - Copy: "Activity feed shows recent additions across the workspace. Know what's being researched without asking. Spot patterns in team behavior."
   - Visual: Animated team activity feed showing three recent activities with user initials in colored circles and timestamps

4. **Billing for the Whole Team** (spans 2 columns on desktop)
   - Heading: "Billing for the Whole Team"
   - Copy: "No juggling individual subscriptions. Team workspaces run on one invoice, one payment. Add or remove seats as your team changes."
   - Visual: Animated billing visualization showing three individual invoice cards collapsing/merging into one unified company card with credit card icon and glow effect

### FAQ Section
**Section Title:** "Got questions?"

#### FAQ Items (5 total)

1. **Q:** "How many team members can I add?"
   **A:** "Pro plans support unlimited team members at $39/year per seat. Add as many people as your team needs, no per-seat limits on features. Everyone gets full access to shared workspaces."

2. **Q:** "Can I have multiple workspaces?"
   **A:** "Yes. Create as many workspaces as you need: one per client, one per project, one for internal research. Each workspace has its own library and access controls."

3. **Q:** "What happens when someone leaves the team?"
   **A:** "Their contributions stay in the workspace. Remove their access, and they can no longer view or add to the library, but everything they added remains. Your team's research is preserved."

4. **Q:** "Can team members have personal libraries too?"
   **A:** "Yes. Team members can have both personal libraries and shared workspace access. Extract to your personal library for individual projects, or to the team workspace for collaborative research."

5. **Q:** "How does billing work for teams?"
   **A:** "Team plans are billed centrally: one invoice for all seats. The workspace admin manages billing. Add or remove seats anytime; billing adjusts automatically."

### Final CTA Section
- **Background:** #020617
- **Heading:** "Stop Paying for the Same Research Twice."
- **Copy:** "Your team's best research shouldn't live in personal silos. Create a shared workspace where everyone contributes."
- **CTA Button:** "Start Your Team Workspace →"
  - Link: "/"
  - Background: #14b8a6 (teal)
  - Text color: #000

### Footer Component
- Standard TokScript footer

## Technical Implementation

- Client-side rendered component ("use client")
- Uses Framer Motion for animations
- Interactive state management for FAQ accordion
- Multiple animated component visualizations including:
  - Workspace switcher with cycling animation between two workspaces (Acme Agency and Stark Fitness)
  - Team activity feed with staggered opacity and translateX animations on hover
  - Permission roles with color-changing background animation and glow effects cycling through Admin (red), Editor (blue), and Viewer (green)
  - Billing visualization with individual invoice cards moving/fading out while merged company card scales up and glows on hover
  - HoverStateWrapper component for interactive hover effects
- Hover-triggered animations on feature cards
- Responsive grid layout (3 columns desktop, adapts mobile)
- Noise overlay SVG effect
- Glass-panel design for hero visual
- Timeline line with gradient (teal #14b8a6 to cyan #0ea5e9)
- Color-coded accent elements matching feature theme (teal #14b8a6, with secondary cyan #5eead4 accents)
