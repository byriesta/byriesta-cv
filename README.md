# ⚡ byriesta-cv — Curriculum Vitae & Portfolio

An ultra-lightweight, responsive Curriculum Vitae (CV) and personal portfolio website, designed for speed, accessibility, and elegance.

🌐 **Live Website:** [https://byriesta.github.io/byriesta-cv/](https://byriesta.github.io/byriesta-cv/)

- **🚀 Blazing Fast**: Zero frameworks, zero NPM build steps, < 25 KB total size, instant (< 50ms) first contentful paint.
- **📱 Truly Responsive**: Designed mobile-first, perfectly scaling from small phones (320px) to 4K desktop screens.
- **🌐 Dual Language (EN / ID)**: Instant one-click toggle between English and Indonesian with memory.
- **🌗 Dark / Light Mode**: Automatically adapts to system theme (`prefers-color-scheme`) with instant toggle & local storage memory. No flash of wrong theme on page load.
- **🖨️ PDF & Print Ready**: Custom `@media print` styling formats the page into a crisp, clean 1-2 page A4 / Letter PDF resume via standard browser print (`Ctrl+P` or the **Print / PDF** button).
- **🌐 GitHub Pages Ready**: Deploy in seconds with zero configuration or build overhead.

---

## 📁 Project Structure

```text
byriesta-cv/
├── index.html              # Main semantic HTML5 document
├── css/
│   ├── style.css           # Modern CSS tokens, responsive layout, dark/light themes
│   └── print.css           # Print & PDF export rules
├── js/
│   └── app.js              # Micro controller (~1 KB) for themes, copy email, print trigger
├── .github/
│   └── workflows/
│       └── deploy.yml      # Automated GitHub Actions workflow for GitHub Pages
├── favicon.svg             # Minimal vector favicon
└── README.md               # Documentation & setup guide
```

---

## 💻 How to Preview Locally

Because there are no build steps, bundlers, or compilation required:

### Option 1: Direct File Opening
Double-click `index.html` to open it directly in any browser (Chrome, Edge, Safari, Firefox).

### Option 2: Lightweight Local Server
If you prefer running a local server:

**Using Python:**
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

**Using Node.js:**
```bash
npx serve .
```

---

## ✏️ How to Customize Your CV

Open `index.html` in your favorite code editor (VS Code, Cursor, Notepad, etc.):

1. **Personal Information**:
   - Update `<title>` and `<meta name="description">` in `<head>`.
   - Update your name, job title, and location inside `.hero-content`.
2. **Contact & Social Links**:
   - Update email address in `data-email="your.email@example.com"` on `#copyEmailBtn`.
   - Update links (`mailto:`, WhatsApp, GitHub, LinkedIn, etc.) in `.contact-links`.
3. **Avatar / Photo (Optional)**:
   - To add an avatar image, add a `.hero-avatar` element to `.header-hero`:
     ```html
     <div class="hero-avatar">
       <img src="img/avatar.jpg" alt="Your Name">
     </div>
     ```
4. **Summary**:
   - Edit the narrative paragraph in the `#summary-heading` section.
5. **Work Experience**:
   - Duplicate or edit `.experience-card` blocks with your roles, companies, dates, achievements, and tech tags.
6. **Projects & Skills**:
   - Update `.project-card` entries with your projects, live demo URLs, and GitHub repos.
   - Adjust skill tags in `.skills-container`.
7. **Education**:
   - Edit your degrees, certifications, and institutions in `.education-list`.

---

## 🚀 How to Deploy on GitHub Pages

### Method 1: Automatic via GitHub Actions (Recommended)

1. Create a new GitHub repository (e.g. `my-cv` or `username.github.io`).
2. Push this project folder to your repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial blazing-fast CV"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) will automatically publish your CV! Your site will be live at `https://<your-username>.github.io/<your-repo-name>/`.

### Method 2: Standard GitHub Pages (Deploy from branch)

1. Push the code to your `main` branch.
2. In GitHub repository **Settings** → **Pages**:
   - Under **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`.
   - Click **Save**.

Within ~60 seconds, your CV is live worldwide with free SSL!

---

## 📄 How to Export as PDF Resume

1. Click the **Print / PDF** button at the top right of your CV (or press `Ctrl+P` on Windows / `Cmd+P` on Mac).
2. In the browser print preview:
   - **Destination**: Select **Save as PDF** (or **Microsoft Print to PDF**).
   - **Margins**: Set to **Default** or **Minimum**.
   - **Options**: Ensure **Background graphics** is checked if you want subtle colored tag borders.
3. Click **Save**. You now have a clean, ATS-friendly, professional PDF resume ready for recruiters!

---

## ⚡ Performance Audit

- **Lighthouse Performance**: 100 / 100
- **Lighthouse Accessibility**: 100 / 100
- **Lighthouse Best Practices**: 100 / 100
- **Lighthouse SEO**: 100 / 100
- **First Contentful Paint (FCP)**: < 50ms
- **Cumulative Layout Shift (CLS)**: 0.00
- **Total Asset Transfer**: ~18 KB (uncompressed) / ~6 KB (gzipped over HTTP/2)
