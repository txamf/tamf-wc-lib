<svelte:options
  customElement={{
    tag: "sidebar-trigger",
    props: {
      ctaHeading: { type: 'String' },
      ctaText: { type: 'String' },
      ctaButton: { type: 'String' },
      targetId: { type: 'String', reflect: true }
    }
  }}
/>

<script lang="ts">
    let { 
        ctaHeading = 'Learn more here',
        ctaText = 'Open Sidebar', 
        ctaButton = 'Click Here',
        targetId = 'main-sidebar'
    } = $props();
    
    function toggleSidebar() {
        const sidebar = document.getElementById(targetId);
        if (sidebar instanceof HTMLElement) {
            const event = new CustomEvent('toggle-sidebar');
            sidebar.dispatchEvent(event);
        }
    }
</script>

<button 
    type="button"
    class="trigger-cta"
    onclick={toggleSidebar}
    aria-expanded="false"
    aria-controls={targetId}
    style="font-family: inherit;"
>   
    <div class="cta-outline"></div>
    <div class="cta-content">
        <h3>{ctaHeading}</h3>
        <p>{ctaText}</p>
    </div>
    <div class="trigger-button">{ctaButton}</div>
</button>

<style>
    :host {
        display: contents;
        font-family: var(--font-family, inherit);
    }

    .trigger-cta {
        position: relative;
        text-align: center;
        padding: 30px 20px;
        background: #e6e6e641;
        color: black;
        cursor: pointer;
        width: 100%;
        border: none;
        margin: 20px -15px 40px;
        transition: background-color 0.3s ease;
        font-family: inherit;
    }

    .cta-outline {
        position: absolute;
        top: -20px;
        left: 5%;
        right: 5%;
        bottom: -20px;
        border: 2px solid #3D87CB;
        pointer-events: none;
    }

    @media (max-width: 768px) {
        .cta-outline {
            left: 2%;
            right: 2%;
        }
        .trigger-cta {
            margin: 20px -10px 40px;
        }
        .trigger-cta p {
            font-size: 1.8rem;
        }
    }

    .cta-content {
        max-width: 500px;
        margin-right: auto;
        margin-left: auto;
    }

    .trigger-cta:hover {
        background: #e6e6e670;
    }

    .trigger-cta h3 {
        font-size: 2.5rem;
        margin: 0 0 5px 0;
        color: #500000;
        font-family: inherit;
    }
    
    .trigger-cta p {
        margin: 10px 0 10px 0;
        max-width: 600px;
        font-size: 1.8rem;
        line-height: 1.4;
        font-family: inherit;
    }

    .trigger-button {
        padding: 10px 20px;
        background: #3D87CB;
        color: white;
        border: none;
        cursor: pointer;
        display: inline-block;
        margin: 10px auto 0px auto;
        transition: background-color 0.3s ease;
        font-weight: bold;
        font-family: inherit;
        font-size: 1.8rem;
    }

    .trigger-button:hover {
        background: #3d86cbb5;
    }

    .trigger-cta:focus-visible {
        outline: 2px solid #500000;
        outline-offset: 2px;
    }
</style>