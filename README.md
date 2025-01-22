# Web Components Library

## Building Components

### Setup

```bash
npm install
```

### Build Commands

#### Build All

```bash
npm run build
```

#### Build a Single Component

```bash
npm run build:component --name=cta-widget
npm run build:component --name=CTAWidget
npm run build:component --name=Sidebar
npm run build:component --name=SidebarTrigger
npm run build:component --name=Timeline
```


### Available Components

The following components can be built individually:

| Component Name | Build Command | Output File |
|---------------|---------------|-------------|
| CTA Widget | `npm run build:component --name=CTAWidget` | `dist/cta-widget.iife.js` |
| Sidebar | `npm run build:component --name=Sidebar` | `dist/sliding-sidebar.iife.js` |
| Sidebar Trigger | `npm run build:component --name=SidebarTrigger` | `dist/sidebar-trigger.iife.js` |
| Timeline | `npm run build:component --name=Timeline` | `dist/timeline-slider.iife.js` |

### Component Configuration

Component configurations are defined in `build.config.ts`. To add a new component:

1. Create your component in `src/lib/`
2. Add its configuration to `build.config.ts`:
```ts
typescript
export const components = {
NewComponent: {
entry: 'src/lib/NewComponent.svelte',
fileName: 'new-component'
}
}
```

3. Build using the commands above

This documentation references your build configuration from:

```js
export const components = {
  CTAWidget: {
    entry: 'src/lib/CTAWidget.svelte',
    fileName: 'cta-widget'
  },
  Sidebar: {
    entry: 'src/lib/Sidebar.svelte',
    fileName: 'sliding-sidebar'
  },
  SidebarTrigger: {
    entry: 'src/lib/SidebarTrigger.svelte',
    fileName: 'sidebar-trigger'
  },
  Timeline: {
    entry: 'src/lib/Timeline.svelte',
    fileName: 'timeline-slider'
  }
};
```
And your package.json scripts from:
```
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json && tsc -p tsconfig.node.json",
    "build:component": "cross-env COMPONENT=$npm_config_name vite build"
  },
```

## Usage via jsDelivr

```html
<!-- Latest version from main branch -->
<script src="https://cdn.jsdelivr.net/gh/txamf/tamf-wc-lib@main/dist/cta-widget.iife.js"></script>
<script src="https://cdn.jsdelivr.net/gh/txamf/tamf-wc-lib@main/dist/sliding-sidebar.iife.js"></script>
<script src="https://cdn.jsdelivr.net/gh/txamf/tamf-wc-lib@main/dist/sidebar-trigger.iife.js"></script>
<script src="https://cdn.jsdelivr.net/gh/txamf/tamf-wc-lib@main/dist/timeline-slider.iife.js"></script>

<!-- Or specific version/tag -->
<script src="https://cdn.jsdelivr.net/gh/txamf/tamf-wc-lib@v1.0.0/dist/cta-widget.iife.js"></script>
```

## Component Usage
### CTA Widget
```html
    <cta-widget
        ctaHeading="Download a Giving Guide"
        ctaText="Download our complimentary Giving Guide to explore giving methods and learn more about campus areas you can support with an endowment. Ready to start a gift conversation instead? Send us a message at info@txamfoundation.com."
        ctaButton="Click here to download"
        targetURL="https://www.txamfoundation.com/contact-us/request-a-giving-guide.aspx"
    ></cta-widget>    
    <script src="https://cdn.jsdelivr.net/gh/txamf/tamf-wc-lib@main/dist/cta-widget.iife.js"></script>
```

npm run build:component --name=CTAWidget
npm run build:component --name=Sidebar
npm run build:component --name=SidebarTrigger

