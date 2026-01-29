# Circle 22 - Private Invitation Website

A cinematic, scroll-based single-page website for Circle 22, featuring an elegant narrative journey from elevator to invitation.

## 🎬 Features

- **Scroll-based narrative**: Five cinematic scenes that tell a story
- **Interactive elevator button**: Press to begin the journey
- **Opt-in audio**: Toggle ambient sound (no autoplay)
- **Responsive design**: Beautiful on all devices
- **Accessibility-focused**: Keyboard navigation, reduced motion support, high contrast
- **Fast loading**: Pure HTML/CSS/JS with no build tools required
- **Free hosting ready**: Optimized for GitHub Pages

## 📁 Project Structure

```
circle22/
├── index.html          # Main HTML structure
├── styles.css          # All styles and animations
├── script.js           # Interactive functionality
├── assets/             # Media files (you need to add these)
│   ├── wax-seal.png    # Red wax seal image (100x100px recommended)
│   └── ambient-room.mp3 # Ambient sound (optional)
└── README.md           # This file
```

## 🚀 Quick Start

### Option 1: View Locally

1. Download all files to a folder called `circle22`
2. Open `index.html` in your web browser
3. That's it! The site works completely offline.

### Option 2: Deploy to GitHub Pages (Free Hosting)

#### Step-by-Step Deployment:

1. **Create a GitHub account** (if you don't have one)
   - Go to github.com and sign up

2. **Create a new repository**
   - Click the "+" icon → "New repository"
   - Name it `circle22` (or any name you prefer)
   - Make it **Public**
   - Don't initialize with README (we have our own files)
   - Click "Create repository"

3. **Upload your files**
   - On the repository page, click "uploading an existing file"
   - Drag and drop all files: `index.html`, `styles.css`, `script.js`, `README.md`
   - Add a commit message like "Initial commit"
   - Click "Commit changes"

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages (in the left sidebar)
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
   - Wait 1-2 minutes for deployment

5. **Access your site**
   - Your site will be live at: `https://[your-username].github.io/circle22/`
   - GitHub will show you the URL at the top of the Pages settings

6. **Optional: Use a custom domain**
   - In Settings → Pages, add your custom domain
   - Follow GitHub's instructions for DNS configuration

## 🎨 Customizing Assets

### 1. Wax Seal Image

**Recommended specs:**
- **Format**: PNG with transparency
- **Size**: 100x100px (retina: 200x200px)
- **Style**: Red wax seal with "22" or circular design
- **File**: `assets/wax-seal.png`

**Where to get one:**
- Create in Canva (free): Use circular shape + texture + "22" text
- Commission on Fiverr ($5-20)
- Use AI image generation (DALL-E, Midjourney, Leonardo.ai)
- Design in Figma/Illustrator

**Fallback**: If no image is provided, the site uses a CSS-generated seal automatically.

**How to add:**
1. Create an `assets` folder in your project
2. Save your image as `assets/wax-seal.png`
3. Upload to GitHub along with other files

### 2. Ambient Sound (Optional)

**Recommended specs:**
- **Format**: MP3 (best browser support)
- **Duration**: 30-60 seconds (loops automatically)
- **Style**: Muffled voices, room ambience, subtle
- **Volume**: Mixed at -12dB to -18dB (script sets volume to 30%)
- **File size**: Under 500KB for fast loading
- **File**: `assets/ambient-room.mp3`

**Where to get ambient sound:**
- **Free sources**:
  - Freesound.org (search "ambient room" or "muffled conversation")
  - Pixabay Music (free, no attribution)
  - YouTube Audio Library
- **Paid**:
  - Epidemic Sound
  - Artlist
  - AudioJungle

**How to add:**
1. Place MP3 file in `assets/ambient-room.mp3`
2. Upload to GitHub
3. Audio toggle will work automatically

**Without audio**: The site works perfectly without audio. The toggle simply won't play anything.

### 3. Changing Colors

Edit the `:root` variables in `styles.css`:

```css
:root {
    --color-parchment: #F5F1E8;  /* Background */
    --color-charcoal: #2A2A2A;   /* Text */
    --color-oxblood: #8B2E2E;    /* Accent/button */
}
```

### 4. Changing Fonts

In `index.html`, replace the Google Fonts link:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

Then update the CSS variables:

```css
:root {
    --font-serif: 'YOUR_SERIF', serif;
    --font-sans: 'YOUR_SANS', sans-serif;
}
```

**Recommended font pairings:**
- Playfair Display + Source Sans Pro
- Lora + Open Sans
- Crimson Text + Lato
- Libre Baskerville + Raleway

### 5. Editing Copy

All text content is in `index.html` in the Scene 5 section (`.invitation-content`).

Simply edit the text between the HTML tags:
- `<h1>` - Main title
- `<p>` - Body paragraphs
- Update sections as needed

### 6. Changing the CTA Link

In `index.html`, find the CTA button:

```html
<a href="https://example.com" class="cta-button">Request an Invitation</a>
```

Replace `https://example.com` with your form URL:
- Google Forms
- Typeform
- Airtable Form
- Tally.so
- JotForm

## ⚙️ Technical Details

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile: iOS Safari 14+, Chrome Android 90+

### Performance
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices)

### Accessibility Features
- Semantic HTML5
- ARIA labels on interactive elements
- Keyboard navigation (Arrow keys, Enter, Space, Escape)
- High contrast ratios (WCAG AA compliant)
- Reduced motion support (`prefers-reduced-motion`)
- Screen reader friendly
- Focus indicators on all interactive elements

### No JavaScript Fallback
- Site content is fully accessible without JavaScript
- Animations simply won't play
- All content remains readable

## 🔧 Troubleshooting

### Wax seal isn't showing
1. Check that `assets/wax-seal.png` exists
2. Verify file path is correct
3. Check browser console for errors (F12)
4. The CSS fallback seal should appear if image fails

### Audio isn't playing
1. Check that `assets/ambient-room.mp3` exists
2. Try a different browser (some block autoplay)
3. Make sure audio toggle shows "On"
4. Check browser console for errors
5. Audio will only play after user interaction

### GitHub Pages isn't working
1. Verify repository is public
2. Check that `index.html` is in the root directory
3. Wait 2-5 minutes after enabling Pages
4. Check Settings → Pages for error messages
5. Ensure branch is set to "main" or "master"

### Site looks broken on mobile
1. Clear browser cache
2. Check that `viewport` meta tag exists in HTML
3. Test in different mobile browsers
4. Use Chrome DevTools mobile emulation for debugging

### Animations are too slow/fast
Edit timing in `styles.css`:

```css
:root {
    --transition-smooth: 0.6s; /* Adjust duration */
}
```

Or edit specific animations:
```css
@keyframes doorApproach {
    /* Change animation duration here */
}
```

## 📝 Customization Ideas

### Add your logo
In `scene5`, add before `.invitation-title`:
```html
<img src="assets/logo.png" alt="Circle 22" class="logo">
```

### Add social media links
In `.invitation-footer`:
```html
<p>
    <a href="https://instagram.com/circle22">Instagram</a> •
    <a href="https://twitter.com/circle22">Twitter</a>
</p>
```

### Add video instead of CSS scenes
Replace scene content with:
```html
<video autoplay muted loop playsinline>
    <source src="assets/elevator.mp4" type="video/mp4">
</video>
```

### Add parallax scrolling
Uncomment parallax CSS or add libraries like:
- Rellax.js (lightweight)
- Locomotive Scroll (smooth scrolling)

### Add email collection
Replace CTA with embedded form from:
- ConvertKit
- Mailchimp
- Substack
- EmailOctopus

## 🎯 SEO & Meta Tags

Add these to `<head>` for better sharing:

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://yoursite.com/">
<meta property="og:title" content="Circle 22 - Private Invitation">
<meta property="og:description" content="A private gathering for intentional connection">
<meta property="og:image" content="https://yoursite.com/assets/social-share.png">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://yoursite.com/">
<meta property="twitter:title" content="Circle 22 - Private Invitation">
<meta property="twitter:description" content="A private gathering for intentional connection">
<meta property="twitter:image" content="https://yoursite.com/assets/social-share.png">
```

Create a `social-share.png` (1200x630px) with your brand visuals.

## 🔒 Privacy & Security

This site:
- Uses no cookies
- Collects no personal data
- Makes no external API calls (except fonts)
- Stores only audio preference in localStorage (non-identifying)

For production, consider adding:
- Privacy policy link
- Cookie consent (if you add analytics later)
- HTTPS (GitHub Pages provides this automatically)

## 📊 Adding Analytics (Optional)

To track visits, add Google Analytics or Plausible:

**Google Analytics:**
```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Plausible (privacy-focused):**
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## 📞 Support

For questions or issues:
1. Check the Troubleshooting section above
2. Review browser console for errors (F12 → Console)
3. Test in a different browser
4. Verify all files are uploaded correctly

## 📜 License

This code is provided as-is for Circle 22. You may modify and use it as needed for your project.

## 🎨 Credits

- Fonts: Google Fonts (Cormorant Garamond, Inter)
- Built with: HTML5, CSS3, Vanilla JavaScript
- Hosted on: GitHub Pages (free)

---

**Ready to launch?** Follow the deployment steps above and your elegant invitation will be live in minutes.
