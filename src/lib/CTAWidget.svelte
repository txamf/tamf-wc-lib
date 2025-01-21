<svelte:options
  customElement={{
    tag: "cta-widget",
    props: {
      ctaHeading: { type: 'String' },
      ctaText: { type: 'String' },
      ctaButton: { type: 'String' },
      targetURL: { type: 'String' },
      secondaryCtaText: { type: 'String' },
      secondaryCtaButton: { type: 'String' },
      secondaryTargetURL: { type: 'String' }
    }
  }}
/>

<script lang="ts">
    import { getContext } from 'svelte';
    
    let { 
        ctaHeading = 'Download a Giving Guide',
        ctaText = 'Download our complimentary Giving Guide to explore giving methods and learn more about campus areas you can support with an endowment', 
        ctaButton = 'Click here to download',
        targetURL = 'https://www.txamfoundation.com/contact-us/request-a-giving-guide.aspx',
        secondaryCtaText = 'Ready to start a gift conversation instead?',
        secondaryCtaButton = 'Send us a message',
        secondaryTargetURL = 'https://www.txamfoundation.com/contact-us.aspx'
    } = $$props;
    
    function handleClick() {
        window.open(targetURL, '_blank', 'noopener,noreferrer');
    }

    function handleSecondaryClick() {
        window.open(secondaryTargetURL, '_blank', 'noopener,noreferrer');
    }
</script>

<div 
    class="trigger-cta"
>   
    <div class="cta-outline"></div>
    <div class="cta-content">
        <h3>{ctaHeading}</h3>
        <p>{ctaText}</p>
    </div>
    <button class="trigger-button"
    type="button"
    on:click={handleClick}
    aria-label={ctaText}>{ctaButton}</button>
    {#if secondaryCtaText !== 'none' && secondaryCtaText !== 'hide'}
    <div class="secondary-cta">
        <p>{secondaryCtaText}
            <button class="secondary-button"
        type="button"
        on:click={handleSecondaryClick}
        aria-label={secondaryCtaText}>{secondaryCtaButton}</button>
        </p>
        
    </div>
    {/if}
</div>

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
        font-size: 1.5rem;
        line-height: 1.4;
        font-family: inherit;
    }

    .secondary-cta {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .secondary-cta p {
        margin: 20px 0 0 0;
        max-width: 600px;
        font-size: 1.2rem;
        line-height: 1.3;
        font-family: inherit;
    }

    .secondary-button {
        margin: 3px auto 0px auto;
        background: none;
        border: none;
        color: #3D87CB;
        cursor: pointer;
        padding: 0;
        font-size: 1.2rem;
        font-family: inherit;
        text-decoration: underline;
        text-underline-offset: 4px;
        transition: color 0.3s ease;
    }

    .secondary-button:hover {
        color: #3d86cbb5;
    }

    .secondary-button:focus-visible {
        outline: 2px solid #500000;
        outline-offset: 2px;
    }

    @media (max-width: 768px) {
        .trigger-cta p {
            font-size: 1.2rem;
        }
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
    }

    .trigger-button:hover {
        background: #3d86cbb5;
    }

    .trigger-cta:focus-visible {
        outline: 2px solid #500000;
        outline-offset: 2px;
    }
</style>