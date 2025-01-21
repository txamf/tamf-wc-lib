<svelte:options
  customElement={{
    tag: "sliding-sidebar",
    props: {
      width: { type: 'String', reflect: true },
      isOpen: { type: 'Boolean', reflect: true },
      sidebarHeading: { type: 'String' },
      sidebarBody: { type: 'String' },
      sidebarCTA: { type: 'String' },
      id: { type: 'String', reflect: true }
    }
  }}
/>

<script lang="ts">
    let { 
        width = '300px',
        isOpen = $bindable(false),
        sidebarHeading = '',
        sidebarBody = '',
        sidebarCTA = '',
        id = 'main-sidebar'
    } = $props();
    
    function toggleHeader(show: boolean) {
        const header = document.querySelector('.spirit-header');
        if (!(header instanceof HTMLElement)) return;
        
        header.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
        header.style.transform = show ? 'translateY(0)' : 'translateY(-100%)';
        header.style.opacity = show ? '1' : '0';
    }
    
    function processElement(el: Element, isOpen: boolean) {
        if (!(el instanceof HTMLElement)) return;
        
        const SIDEBAR_Z_INDEX = 1000;
        const CONTENT_Z_INDEX = 1;
        
        if (el.tagName.toLowerCase() === 'sliding-sidebar' || 
            el.closest('sliding-sidebar')) {
            if (isOpen) {
                el.style.position = 'relative';
                el.style.zIndex = String(SIDEBAR_Z_INDEX);
            } else {
                el.style.position = '';
                el.style.zIndex = '';
            }
            return;
        }
    
        if (isOpen) {
            if (!el.dataset.originalPosition) {
                el.dataset.originalPosition = el.style.position || '';
                el.dataset.originalZIndex = el.style.zIndex || '';
            }
            
            el.style.position = 'relative';
            el.style.zIndex = String(CONTENT_Z_INDEX);
        } else {
            el.style.position = el.dataset.originalPosition || '';
            el.style.zIndex = el.dataset.originalZIndex || '';
            
            delete el.dataset.originalPosition;
            delete el.dataset.originalZIndex;
        }
    }
    
    function adjustContentZIndex(isOpen: boolean) {
        const storyContainer = document.querySelector('.spirit-story');
        if (!storyContainer) return;
    
        processElement(storyContainer, isOpen);
    
        const allElements = storyContainer.getElementsByTagName('*');
        Array.from(allElements).forEach(el => processElement(el, isOpen));
    
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    
    function toggleSidebar() {
        isOpen = !isOpen;
        toggleHeader(!isOpen);
        adjustContentZIndex(isOpen);
    }

    function handleWheel(event: WheelEvent) {
        if (!isOpen) return;
        const sidebar = document.querySelector('.sidebar');
        if (!(sidebar instanceof HTMLElement)) return;
        
        event.preventDefault();
        sidebar.scrollTop += event.deltaY;
    }
    
    // Listen for toggle events
    $effect(() => {
        function handleToggle() {
            toggleSidebar();
        }

        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('toggle-sidebar', handleToggle);
            return () => {
                element.removeEventListener('toggle-sidebar', handleToggle);
            };
        }
    });

    $effect(() => {
        if (!isOpen) return;

        function handleEscapeKey(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                toggleSidebar();
            }
        }

        document.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('keydown', handleEscapeKey);
    
        const storyContainer = document.querySelector('.spirit-story');
        const observer = storyContainer ? new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node instanceof HTMLElement) {
                        processElement(node, isOpen);
                    }
                });
            });
        }) : null;
    
        if (storyContainer && observer) {
            observer.observe(storyContainer, { 
                childList: true, 
                subtree: true 
            });
        }
    
       const sidebar = document.querySelector('.sidebar');
        if (sidebar instanceof HTMLElement) {
            const focusableElements = sidebar.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
    
            function handleTab(e: KeyboardEvent) {
                if (e.key !== 'Tab') return;
    
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        if (lastFocusable instanceof HTMLElement) {
                            lastFocusable.focus();
                        }
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        if (firstFocusable instanceof HTMLElement) {
                            firstFocusable.focus();
                        }
                    }
                }
            }
    
            sidebar.addEventListener('keydown', handleTab);
            if (firstFocusable instanceof HTMLElement) {
                firstFocusable.focus();
            }
    
            return () => {
                document.removeEventListener('wheel', handleWheel);
                document.removeEventListener('keydown', handleEscapeKey);
                sidebar.removeEventListener('keydown', handleTab);
                observer?.disconnect();
                toggleHeader(true);
                adjustContentZIndex(false);
                document.body.style.overflow = '';
            };
        }
    });
</script>

<!-- Overlay -->
{#if isOpen}
    <div 
        class="overlay"
        onclick={toggleSidebar}
        role="presentation"
    ></div>
{/if}

<!-- Sidebar -->
<aside 
    {id}
    class="sidebar" 
    style:width={width} 
    class:open={isOpen}
    aria-label="Sidebar"
    aria-hidden={!isOpen}
>
    <button 
        type="button"
        class="close-button" 
        onclick={toggleSidebar}
        aria-label="Close sidebar"
    >
        ×
    </button>

    <div class="sidebar-content">
        <h3>{sidebarHeading}</h3>
        <div class="sidebarUnderline"></div>
        <div class="sidebarUnderlineBold"></div>
        {@html sidebarBody}
        <div class="sidebarUnderline"></div>
        <div class="sidebarUnderlineBold"></div>
        <p class="sidebarCTA">{@html sidebarCTA}</p>
    </div>
</aside>

<style>
    :host {
        display: contents;
        --sidebar-z-index: 100000;
        font-family: var(--font-family, inherit);
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: var(--sidebar-z-index);
        border: none;
        cursor: pointer;
        padding: 0;
        margin: 0;
        transition: opacity 0.3s ease-in-out;
    }

    .sidebar {
        text-align: left;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        background: white;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
        z-index: calc(var(--sidebar-z-index) + 1);
        overflow-y: auto;
        overscroll-behavior: contain;
        font-family: inherit;
    }

    .sidebar.open {
        transform: translateX(0);
    }

    .close-button {
        position: absolute;
        right: 10px;
        top: 10px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 10px 20px;
        z-index: calc(var(--sidebar-z-index) + 2);
        transition: background-color 0.2s ease;
        font-family: inherit;
    }

    .close-button:hover {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }

    .close-button:focus-visible {
        outline: 2px solid #500000;
        outline-offset: 2px;
        border-radius: 4px;
    }

    .sidebar-content {
        position: relative;
        padding: 20px;
        padding-top: 30px;
        display: inline-block;
        font-family: inherit;
    }
    
    .sidebar-content h3 {
        margin-bottom: 4px;
        font-size: 2.5rem;
        color: #500000;
        font-family: inherit;
    }

    .sidebarUnderline {
        margin-top: 4px;
        border-bottom: 1px solid #000;
        width: 100%;
    }
    
    .sidebarUnderlineBold {
        border-bottom: 5px solid #000;
        width: 25%;
        margin-bottom: 20px;
    }

    .sidebar::-webkit-scrollbar {
        display: none;
    }

    .sidebar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .sidebarCTA {
        font-style: italic;
        font-size: 1.4rem;
        line-height: 1.4;
        font-family: inherit;
    }

    :global(body.sidebar-open) {
        overflow: hidden;
    }
</style>