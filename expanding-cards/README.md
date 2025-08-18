# Expanding Cards

This is a Next.js project that demonstrates an interactive "Expanding Cards" UI component. Built with TypeScript and modern CSS, the project showcases a set of cards that expand when clicked, providing a visually engaging way to highlight content.

## Features

- **Expanding Cards UI:** Click on a card to expand it and reveal more information.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.
- **TypeScript Support:** Ensures type safety and better developer experience.
- **Modular Components:** Clean separation of logic and styles using CSS modules.
- **Next.js App Directory:** Utilizes the latest Next.js features for routing and layouts.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Goutamsahu23/Frontend_Hub/tree/master/expanding-cards
   
   cd expanding-cards
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
    globals.css           # Global styles
    layout.tsx            # Root layout
    page.module.css       # Page-specific styles
    page.tsx              # Main page
  components/
    ExpandingCards.tsx    # Expanding Cards component
  styles/
    ExpandingCards.module.css # Component-specific styles
public/
  # Static assets
```

## Customization

- To modify the cards, edit `src/components/ExpandingCards.tsx`.
- To update styles, use the CSS modules in `src/styles/ExpandingCards.module.css` or global styles in `src/app/globals.css`.



---

**Enjoy building interactive UIs with Next.js and TypeScript!**
