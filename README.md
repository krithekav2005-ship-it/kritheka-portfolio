# Kritheka V — Portfolio + Flask Contact Backend

This package contains the refreshed portfolio frontend and a separate Flask backend starter for the contact form. Portfolio wording has been updated using the resume provided.

## Frontend files
- `index.html` — portfolio content and page structure
- `style.css` — visual design and responsive layout
- `script.js` — navigation, theme toggle, project filters and contact form request

## Backend files
- `backend/app.py` — Flask API
- `backend/requirements.txt` — Python dependencies
- `backend/render.yaml` — Render deployment configuration
- `backend/README.md` — backend setup instructions

## Important before publishing
- The contact form is **not connected to a deployed backend yet**. Replace the placeholder API URL in `script.js` only after the Flask service has been deployed and tested.
- The inventory project link points to the previously provided GitHub repository. Breast Cancer Prediction and Expense Tracker links are intentionally omitted until verified project URLs are available.
- Confirm all personal details and claims are accurate before publishing.
- Never commit database credentials, API secrets, or `.env` files.

## GitHub Pages
GitHub Pages hosts only the static frontend. Deploy the `index.html`, `style.css`, and `script.js` files to your existing portfolio repository. Deploy `backend/` separately to a Python-capable host.
