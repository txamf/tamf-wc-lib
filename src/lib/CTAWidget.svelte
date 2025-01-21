<svelte:options
  customElement={{
    tag: "cta-widget",
    props: {
      ctaHeading: { type: 'String' },
      ctaText: { type: 'String' },
      ctaButton: { type: 'String' },
      targetURL: { type: 'String' }
    }
  }}
/>

<script lang="ts">
    import { getContext } from 'svelte';
    
    let { 
        ctaHeading = 'Learn more here',
        ctaText = 'Open Sidebar', 
        ctaButton = 'Click Here',
        targetURL = 'https://www.txamfoundation.com/contact-us/request-a-giving-guide.aspx'
    } = $$props;
    
    function handleClick() {
        window.open(targetURL, '_blank', 'noopener,noreferrer');
    }
</script>

<button 
    type="button"
    class="trigger-cta"
    on:click={handleClick}
    aria-label={ctaText}
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
    }
    
    .trigger-cta p {
        margin: 10px 0 10px 0;
        max-width: 600px;
        font-size: 1.5rem;
        line-height: 1.4;
    }

    .trigger-button {
        padding: 10px 20px;
        background: #3D87CB;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        display: inline-block;
        margin: 10px auto 0px auto;
        transition: background-color 0.3s ease;
        font-weight: bold;
    }

    .trigger-button:hover {
        background: #3d86cbb5;
    }

    .trigger-cta:focus-visible {
        outline: 2px solid #500000;
        outline-offset: 2px;
    }
</style>