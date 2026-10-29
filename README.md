# Kritheka's portfolio — frontend + Flask backend

This package contains the readable portfolio frontend and its Flask contact-form API. The frontend is served by GitHub Pages; Flask and PostgreSQL must be hosted separately (Render is configured in the root `render.yaml`).

## 1. Replace the files in the existing GitHub repository

1. Download and extract this ZIP on your computer.
2. Open the existing repository: https://github.com/kritheka2005-ship-it/kritheka-portfolio
3. Upload/replace `index.html`, `style.css`, and `script.js` in the repository root.
4. Upload the `backend` folder with all its files, and upload the root `render.yaml` too. Keep the backend files inside the `backend` folder; do not put `app.py` in the repository root.
5. Commit the changes to `main`. GitHub Pages will continue serving the frontend from the repository root.

Do not upload the ZIP file itself. Upload the extracted files and folders.

## 2. Deploy the backend on Render after the GitHub update

1. Sign in to Render and choose **New → Blueprint**.
2. Connect the same `kritheka-portfolio` GitHub repository.
3. Render will read the root `render.yaml`, create the Flask web service and request a PostgreSQL database. Review any charges/plan limits shown by Render before confirming.
4. After deployment, open the service URL and check `/api/health`; it should return `{"status":"ok"}`.
5. Copy the real service URL (for example, `https://your-service.onrender.com`).
6. In `script.js`, replace `https://YOUR-FLASK-BACKEND.onrender.com` with the real service URL, commit the change, and wait for GitHub Pages to update.

## 3. Test

Submit a test message through the live portfolio. A success message means the API accepted and saved it. This starter does not send email notifications; it stores messages in the database. Do not add an admin/list-messages endpoint without authentication.

## Local development (optional)

```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

The frontend API URL should be set to `http://127.0.0.1:5000` for local testing.
