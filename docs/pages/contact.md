# TokScript Contact Page Documentation

## URL
https://tokscript.com/contact

## Source Files
- `src/app/contact/page.js` - Entry point with metadata
- `src/app/contact/PageData.js` - Main contact page component with form

---

## Metadata

### Title
"Contact Us | TokScript"

### Description
"Get in touch with TokScript's support team. We're here to help with questions about transcription, AI features, and more."

### Keywords
- contact TokScript
- TikTok support
- Instagram transcription help
- YouTube captions support
- TokScript email

### Canonical URL
https://tokscript.com/contact

### Open Graph
- Inherits from root layout (no custom OG tags on this page)

### Twitter Card
- Inherits from root layout (no custom Twitter tags on this page)

---

## Schema Markup

- **No custom JSON-LD schema markup on this page**
- Inherits organization schema from root layout

---

## Page Structure

### Header
- Standard site header navigation
- Links to main sections of the site

### Main Content Area

#### Page Heading Section
- Badge: "CONTACT US" (with gradient border styling)
- Main heading: "Get in Touch"
- Subheading: "Have questions about TokScript? We're here to help you get the most out of our AI-powered transcription service."

### Contact Content Layout
- Two-column responsive grid layout
- Left column (col-lg-8): Contact form
- Right column (col-lg-4): Contact information

---

## Contact Form

### Form Framework
- **Library:** Formik (form state management)
- **Validation:** Yup schema validation
- **Submission Handling:** Async form submission with error handling

### Form Fields

#### 1. Name Field
- **Type:** Text input
- **Placeholder:** "Your Name"
- **Icon:** User icon (user-icon.svg)
- **Validation Rules:**
  - Required field
  - Minimum 2 characters
  - Error message: "Name must be at least 2 characters"
- **CSS Class:** form-control
- **Column Width:** col-md-6 (half width on medium screens and up)

#### 2. Email Field
- **Type:** Email input
- **Placeholder:** "Your Email"
- **Icon:** Envelope icon (envelope-icon.svg)
- **Validation Rules:**
  - Required field
  - Valid email format
  - Error message: "Invalid email address"
- **CSS Class:** form-control
- **Column Width:** col-md-6 (half width on medium screens and up)
- **Layout:** Appears on same row as Name field on medium+ screens

#### 3. Subject Field
- **Type:** Text input
- **Placeholder:** "Subject"
- **Validation Rules:**
  - Required field
  - Minimum 5 characters
  - Error message: "Subject must be at least 5 characters"
- **CSS Class:** form-control
- **Full Width:** Full width across both columns
- **Layout:** Full width on all screen sizes

#### 4. Message Field
- **Type:** Textarea input
- **Placeholder:** "Your Message"
- **Rows:** 6 rows tall
- **Validation Rules:**
  - Required field
  - Minimum 10 characters
  - Error message: "Message must be at least 10 characters"
- **CSS Class:** form-control textarea
- **Full Width:** Full width across both columns

#### Submit Button
- **Text:** "Send Message" (normal state) or "Sending..." (loading state)
- **Type:** Submit button
- **CSS Class:** btn btn-primary w-100
- **Behavior:** Disabled while form is submitting (isSubmitting state)
- **Full Width:** w-100 (100% width)

### Form Validation
All fields use Yup validation schema with specific rules:
```
Name: min 2 chars, required
Email: valid email format, required
Subject: min 5 chars, required
Message: min 10 chars, required
```

### Form States

#### Initial State
- All fields empty
- Submit button enabled and shows "Send Message"
- No error messages displayed

#### Submitting State
- Submit button disabled
- Submit button text changes to "Sending..."
- Form fields remain interactive but submission is prevented

#### Success State
- Toast notification appears:
  - Title: "Message Sent!"
  - Message: "Thank you for your message! We'll get back to you within 24 hours."
  - Type: success
- Form resets to empty state
- Toast notification auto-dismisses or can be manually closed

#### Error State
- Toast notification appears:
  - Title: "Error"
  - Message: "Failed to send message. Please try again later."
  - Type: error
- Form data is retained for correction
- User can resubmit

### Form Submission Handling
- **Async operation:** 1000ms simulated delay (placeholder for actual API call)
- **Success message:** Displays toast with success confirmation
- **Error handling:** Catches errors and displays error toast
- **Form reset:** Clears all fields on successful submission
- **User feedback:** Toast notifications for success/error states

---

## Contact Information Section

Located in right column (col-lg-4)

### Email Support
- **Contact Type:** Email Support
- **Address:** support@tokscript.com
- **Description:** "Customer Support. Get help within 24 hours."
- **Response Time:** Within 24 hours

### Business Inquiries
- **Contact Type:** Business Inquiries
- **Address:** business@tokscript.com
- **Description:** "Business & Partnerships. For enterprise, partnership, and integration inquiries."
- **Purpose:** Enterprise solutions, partnerships, integrations

---

## Footer
- Standard site footer with links and company information

---

## Key Page Features

### Responsive Design
- Mobile-first responsive layout
- Column widths adjust based on screen size:
  - col-lg-8 for form (two-thirds width on large screens)
  - col-lg-4 for contact info (one-third width on large screens)
  - Full stacked layout on small screens

### Form Styling
- Icon support for name and email fields (image SVGs displayed)
- Error messages displayed below each field
- Input wrapper contains icon and input field together
- Consistent styling across all form controls

### Visual Elements
- Gradient border on page badge
- Text gradient styling on badge text
- Form icons: user-icon.svg, envelope-icon.svg
- Bootstrap grid system for responsive layout

### User Experience
- Inline field validation with clear error messages
- Real-time validation feedback
- Toast notifications for form submission status
- Disabled submit button prevents duplicate submissions
- Loading state provides visual feedback during submission
- Form auto-resets on success

---

## Copy and Messaging

### Heading Copy
- "Get in Touch" - Simple, friendly call-to-action
- Subheading emphasizes quick help availability and service quality

### Form Labels/Placeholders
- "Your Name" - Personal touch
- "Your Email" - Clear field purpose
- "Subject" - Topic specification
- "Your Message" - Space for detailed inquiry

### Contact Info Headings
- "Email Support" - Customer support emphasis
- "Business Inquiries" - Enterprise/partnership focus

### Success Message
- "Thank you for your message! We'll get back to you within 24 hours." - Sets expectations and provides reassurance

### Error Message
- "Failed to send message. Please try again later." - Clear, actionable feedback

---

## Form Integration

### Data Flow
1. User fills form fields
2. Formik tracks form state
3. Yup validates on submission
4. Form submits async to server (or simulated)
5. Toast notification displays result
6. Form resets on success

### Toast Notification Structure
```javascript
{
  message: "string",
  type: "success | error",
  title: "string",
  isVisible: boolean
}
```

### Validation Schema Structure
```javascript
{
  name: string (min 2 chars, required),
  email: email (valid format, required),
  subject: string (min 5 chars, required),
  message: string (min 10 chars, required)
}
```

---

## Important Notes

- **No FAQ section** on this page (differs from homepage and other marketing pages)
- **No schema markup** beyond what's inherited from root layout
- **Form submission is currently simulated** with 1000ms delay (no actual backend call shown in code)
- **Two distinct email channels** allow proper routing of inquiries
- **Support SLA of 24 hours** set on support@tokscript.com
- **Responsive layout** ensures good UX on mobile and desktop
- **Accessibility:** All form fields have proper labels, icons, and error messaging
- **No JavaScript** required in email templates or other areas (follows email best practices)
