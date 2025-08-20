# Vertical Slider

This project is a Next.js application featuring a modern, interactive **Vertical Slider** component. Built with TypeScript and modular CSS, it demonstrates how to create a visually appealing vertical slider UI for showcasing images or content.

## Features

- **Vertical Sliding Animation:** Smooth transitions between slides in a vertical direction.
- **Responsive Design:** Works well on both desktop and mobile devices.
- **TypeScript Support:** Ensures type safety and better developer experience.
- **Modular CSS:** Uses CSS modules for scoped and maintainable styles.
- **Next.js App Directory:** Utilizes the latest Next.js features for routing and layouts.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Goutamsahu23/Frontend_Hub/tree/master/vertical-slider
   cd vertical-slider
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure

```
src/
  app/
    globals.css               # Global styles
    layout.tsx                # Root layout
    page.module.css           # Page-specific styles
    page.tsx                  # Main page
  components/
    VerticalSlider.tsx        # Vertical Slider component
  styles/
    VerticalSlider.module.css # Component-specific styles
public/
  # Static assets (SVGs, images)
```

## Customization

- To modify the slider content or logic, edit `src/components/VerticalSlider.tsx`.
- To update styles, use the CSS modules in `src/styles/VerticalSlider.module.css` or global styles in `src/app/globals.css`.


---

**Enjoy building interactive sliders with Next.js and TypeScript!**
