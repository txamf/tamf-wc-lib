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

export type ComponentName = keyof typeof components; 