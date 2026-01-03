# Portfolio Website - Kurt Ian G. Bernaldez

A stunning single-page portfolio website featuring a dark cosmic theme with GSAP scroll animations.

## Features

- 🎨 **Dark Cosmic Theme** - Beautiful dark theme matching the nebula hero image
- ✨ **GSAP Animations** - Smooth scroll-triggered animations throughout
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🚀 **Modern Design** - Glass-morphism effects, gradients, and smooth transitions
- 📄 **Single Page** - All sections in one scrollable page (100vh each)

## Sections

1. **Hero** - Full-screen hero section with cosmic background
2. **Projects** - Featured projects showcase (A&G POS, TeaNuma, DateVoo)
3. **About** - Education, skills, and personal information
4. **Tools** - Technologies organized by Frontend, Backend, and Databases
5. **Contact** - Contact form and information

## Setup

1. Add your hero background image to the `images/` directory as `hero-bg.jpg`
   - Recommended size: 1920x1080 or larger
   - This should be the cosmic nebula image you provided

2. Optionally add:
   - Profile photo to the About section (add to `images/` folder)
   - Project screenshots (add to `images/` folder)

3. Open `index.html` in your browser or serve it using a local server

## Technologies Used

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript
- GSAP 3.12.5 (ScrollTrigger plugin)
- Google Fonts (Inter)

## Customization

All colors and styling are defined in CSS custom properties at the top of `styles/main.css`:

```css
:root {
    --primary-dark: #0a0e27;
    --secondary-dark: #1a1f3a;
    --accent-blue: #1e40af;
    --accent-teal: #06b6d4;
    /* ... */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contact Form

The contact form is currently set up with client-side validation. To make it functional, you'll need to:
1. Set up a backend endpoint to handle form submissions
2. Update the form submission handler in `scripts/main.js`

## License

© 2025 Kurt Ian G. Bernaldez. All rights reserved.

