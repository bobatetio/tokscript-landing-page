# Agent: mcp-mobile-fix

## Mission
Apply 12 precise CSS-only fixes to `src/app/mcp/mcp.scss` to fix mobile responsive bugs on the MCP page.

## Assigned File
`src/app/mcp/mcp.scss`

## Status: DONE

## Files Modified
- `/Users/michaelsanchez/Desktop/Cursor Projects/PROJECTS/Tokscript/tokscript-landing-page/src/app/mcp/mcp.scss`

## Edits Applied
- [x] EDIT 1: #hero margin-top:0 + margin-bottom:0 (line 2185, 960px block)
- [x] EDIT 2: .hero-video position: relative (960px block)
- [x] EDIT 3: Added .hero-bottom-fade {display:none} + .hero-body h1 {font-size:42px} after .hero-video (960px block)
- [x] EDIT 4: .who-card position:relative + height:auto !important (960px block)
- [x] EDIT 5: Added .who-card-grid-bg, .who-card-title, .who-card-img, .who-card-desc rules (960px block)
- [x] EDIT 6: .setup-step margin-bottom: 20px (960px block)
- [x] EDIT 7: .setup-step-title padding-left:0 + margin-top:4px (960px block)
- [x] EDIT 8: .setup-step-body padding-left:0 + margin-top:4px (960px block)
- [x] EDIT 9: Added .url-bar-mini rule after .setup-step-body (960px block)
- [x] EDIT 10: Added .hiw-card-img-wrap {width:calc(100% - 30px)} after .hiw-card (960px block)
- [x] EDIT 11: Added #faq h2 {font-size:28px !important} (640px block)
- [x] EDIT 12: Added @media (max-width: 960px) .video-lightbox-dialog rule (outside .mcp-page)

## Verification
- Read back lines 2183–2562 to confirm all 12 edits are present and correctly placed
- No syntax errors found — braces are balanced
- All 960px block edits are inside `.mcp-page @media (max-width: 960px)`
- All 640px block edits are inside `.mcp-page @media (max-width: 640px)`
- Edit 12 is correctly outside `.mcp-page` scope
- No desktop styles were touched
- Zero JSX changes
