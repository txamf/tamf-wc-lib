<svelte:options 
  customElement={{
    tag: "tamf-timeline",
    props: {
      events: { type: 'Array' }
    },
    shadow: "open"
  }}
  css="injected"
/>
<script lang="ts">
  import { onMount } from 'svelte';
  
  // State variables
  let currentIndex = $state(0);
  let touchStartX = $state(0);
  let isSwiping = $state(false);
  let isMobile = $state(false);
  let scrollContainer = $state<HTMLDivElement | null>(null);
  
  // Handle responsive behavior
  let containerWidth = $state(0);
  let resizeObserver: ResizeObserver;
  
  // Default events data
  const defaultEvents = [
    {
      year: "1889",
      title: "Hello, World!",
      description: "Irene is born in Columbiana, Alabama. Her family later moves to Texas, where she graduates from Mexia High School."
    },
    {
      year: "1917",
      title: "At Your Service",
      description: "She enters the Army Nurse Corps after her husband passes away while serving in World War I."
    },
    {
      year: "1918",
      title: "Bedside Care",
      description: "Irene begins her career on campus and works around the clock to care for hundreds of Aggies during the Spanish flu pandemic."
    },
    {
      year: "1920s",
      title: "The Nickname Sticks",
      description: "She cares for football player Hershel Burgess '29 after a game-related injury, and he nicknames her \"Mom.\""
    },
    {
      year: "1949",
      title: "Seamstress Talent",
      description: "Mom sews the first iconic red sashes for the Ross Volunteers."
    },
    {
      year: "1956",
      title: "Outpouring of Love",
      description: "After suffering serious injuries from a car accident, Mom receives overwhelming support from current and former students via notes and telegrams."
    },
    {
      year: "1957",
      title: "Close to Home",
      description: "Three former students buy Mom a house on Gilchrist Avenue, close to campus. The Brazos County A&M Club furnishes her new home."
    },
    {
      year: "1974",
      title: "Fond Farewell",
      description: "Mom passes away on Nov. 10, 1974, at age 85. A well-attended funeral saw her buried in the College Station Cemetery."
    }
  ];

  let { events = defaultEvents } = $props();
  
  // Mobile specific - Computed transform style for slider
  let transformStyle = $derived(`translateX(-${currentIndex * 100}%)`);
  
  // Check if running in browser environment (for SSR compatibility)
  const isBrowser = typeof window !== 'undefined';
  
  onMount(() => {
    // Initialize mobile detection
    checkMobile();
    
    // Setup resize observer for container
    if (scrollContainer) {
      resizeObserver = new ResizeObserver(() => {
        checkMobile();
      });
      resizeObserver.observe(scrollContainer);
    }
    
    // Global resize event listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener('resize', checkMobile);
    };
  });
  
  function checkMobile(): void {
    if (isBrowser) {
      const width = window.innerWidth;
      isMobile = width < 768; // Standard breakpoint for mobile devices
      
      // Update container width when element is available
      if (scrollContainer) {
        containerWidth = scrollContainer.clientWidth;
      }
    }
  }
  
  // Common functions for both mobile and desktop
  function selectEvent(index: number): void {
    if (index >= 0 && index < events.length) {
      console.log('Selecting event at index:', index);
      currentIndex = index;
    }
  }
  
  function handleKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectEvent(index);
    }
  }
  
  function nextEvent(): void {
    if (currentIndex < events.length - 1) {
      selectEvent(currentIndex + 1);
    }
  }
  
  function prevEvent(): void {
    if (currentIndex > 0) {
      selectEvent(currentIndex - 1);
    }
  }
  
  // Touch handling for mobile swipe navigation
  function handleTouchStart(event: TouchEvent): void {
    touchStartX = event.touches[0].clientX;
    isSwiping = true;
  }
  
  function handleTouchMove(event: TouchEvent): void {
    if (!isSwiping) return;
    // Prevent default to stop scrolling while swiping
    event.preventDefault();
  }
  
  function handleTouchEnd(event: TouchEvent): void {
    if (!isSwiping) return;
    
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    const MIN_SWIPE_DISTANCE = 50;
    
    if (Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
      if (deltaX < 0) {
        // Swipe left - go to next
        nextEvent();
      } else {
        // Swipe right - go to previous
        prevEvent();
      }
    }
    
    isSwiping = false;
  }
</script>

<div class="timeline" bind:this={scrollContainer}>
  <div class="timeline-title">Remembering Mom's Life</div>
  
  {#if isMobile}
    <!-- Mobile Timeline Layout -->
    <div 
      class="event-content-container"
      ontouchstart={handleTouchStart}
      ontouchmove={handleTouchMove}
      ontouchend={handleTouchEnd}
    >
      <div class="slider-track" style="transform: {transformStyle}">
        {#each events as event, i}
          <div class="event-slide">
            <div class="event-content">
              <div class="content-wrapper">
                <div class="year-text">{event.year}</div>
                <h3 class="title">{event.title}</h3>
                <p class="description">{event.description}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
      
      <!-- Swipe instruction -->
      <div class="swipe-instruction">
        <span class="swipe-icon">←</span>
        Swipe right to go back, left for next
        <span class="swipe-icon">→</span>
      </div>
    </div>
    
    <!-- Mobile Timeline Indicator Dots -->
    <div class="timeline-indicator">
      {#each events as _, i}
        <div 
          class="indicator-dot" 
          class:active={currentIndex === i}
          onclick={() => selectEvent(i)}
          role="button"
          tabindex="0"
          onkeydown={(e) => handleKeyDown(e, i)}
          aria-label={`Go to event from ${events[i].year}`}
        ></div>
      {/each}
    </div>
  {:else}
    <!-- Desktop Timeline Layout -->
    <div class="timeline-container">
      <button 
        type="button" 
        class="nav-arrow nav-prev" 
        onclick={prevEvent}
        aria-label="View previous events"
      >
        ←
      </button>
      
      <div 
        class="scroll-container"
        ontouchstart={handleTouchStart}
        ontouchend={handleTouchEnd}
        role="region" 
        aria-label="Timeline events"
      >
        <div class="events-container">
          {#each events as event, i}
            <div 
              class="event-item"
              class:active={currentIndex === i}
            >
              <button
                type="button"
                class="year-button"
                onclick={() => selectEvent(i)}
                onkeydown={(e) => handleKeyDown(e, i)}
                role="tab"
                aria-selected={currentIndex === i}
                aria-label="{event.year}: {event.title}"
              >
                <div class="year-marker">
                  <div class="vertical-line"></div>
                </div>
                <div class="year">{event.year}</div>
              </button>
            </div>
          {/each}
        </div>
        
        <div class="years-line"></div>
        
        <!-- Description container below the timeline -->
        <div class="description-container">
          <div class="event-content" class:visible={currentIndex >= 0 && currentIndex < events.length}>
            <div class="content-wrapper">
              {#if currentIndex >= 0 && currentIndex < events.length}
                <div class="title-year">
                  <span class="desc-year">{events[currentIndex].year}</span>
                  <h3 class="title">{events[currentIndex].title}</h3>
                </div>
                <p class="description">{events[currentIndex].description}</p>
              {/if}
            </div>
          </div>
        </div>
      </div>
      
      <button 
        type="button" 
        class="nav-arrow nav-next" 
        onclick={nextEvent}
        aria-label="View next events"
      >
        →
      </button>
    </div>
  {/if}
</div>

<style>
  /* Common styles for both mobile and desktop */
  .timeline {
    width: 100%;
    margin: 2rem 0;
    font-family: var(--font-family, serif);
    position: relative;
    overflow: visible;
  }

  .timeline-title {
    text-align: center;
    font-size: 1.75rem;
    font-weight: bold;
    color: #500000;
    margin-bottom: 1rem;
  }
  
  /* DESKTOP STYLES */
  .timeline-container {
    position: relative;
    width: 100%;
    max-width: 100%;
    display: flex;
    align-items: center;
    height: 320px;
  }
  
  .scroll-container {
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    padding: 0;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;
    position: relative;
    height: 100%;
    will-change: transform;
    transform: translateZ(0);
  }
  
  .scroll-container::-webkit-scrollbar {
    display: none;
  }
  
  .years-line {
    position: absolute;
    height: 2px;
    background-color: #e6e6e6;
    top: 80px;
    left: 0;
    right: 0;
    z-index: 1;
    will-change: transform;
    transform: translateZ(0);
  }
  
  .events-container {
    display: flex;
    position: relative;
    padding: 0 1rem;
    min-width: max-content;
    width: max-content;
    gap: 1rem;
  }
  
  .event-item {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 150px;
    min-width: 150px;
    max-width: 150px;
    margin: 0;
    transition: transform 0.3s ease, color 0.3s ease;
    will-change: transform;
    transform: translateZ(0);
  }
  
  .year-button {
    background: none;
    border: none;
    cursor: pointer;
    text-align: center;
    padding: 0;
    position: relative;
    z-index: 2;
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s ease;
  }
  
  .year-button:hover {
    transform: translateY(-2px);
  }
  
  .year-marker {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 80px;
  }
  
  .vertical-line {
    width: 2px;
    height: 15px;
    background-color: #500000;
    position: absolute;
    bottom: 0px;
  }
  
  .active .vertical-line {
    width: 2.5px;
  }
  
  .year {
    font-size: 1.5rem;
    font-weight: bold;
    color: #500000;
    position: absolute;
    top: 20px;
    width: 100%;
    text-align: center;
  }
  
  .active .year {
    color: #500000;
    font-size: 2rem;
  }
  
  /* Desktop description styles */
  .description-container {
    position: relative;
    width: 100%;
    text-align: center;
    vertical-align: top;
    margin-top: 20px;
    height: 180px;
    padding: 0;
    z-index: 10;
    overflow: visible;
    will-change: opacity;
    transform: translateZ(0);
  }
  
  .event-content {
    width: 100%;
    height: 180px;
    margin: 0;
    padding: 0.5rem 1rem;
    background-image: url('/src/assets/old-background.webp');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: scroll;
    border: none;
    box-shadow: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: none;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    will-change: opacity;
  }
  
  .event-content.visible {
    opacity: 1;
    pointer-events: auto;
  }
  
  .content-wrapper {
    max-width: 680px;
    width: 100%;
    text-align: center;
    padding: 0.25rem;
    background-color: transparent;
    display: block;
  }

  /* Title and year container */
  .title-year {
    display: block;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .desc-year {
    font-size: 1rem;
    font-weight: bold;
    color: #500000;
    font-family: 'Georgia', serif;
    padding: 0;
    margin-bottom: 0.25rem;
    display: block;
  }

  .desc-year::before {
    content: '— ';
  }
  
  .desc-year::after {
    content: ' —';
  }
  
  .nav-arrow {
    flex: 0 0 auto;
    background: none;
    border: none;
    font-size: 2rem;
    color: #500000;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    margin-top: 40px;
  }
  
  .nav-arrow:hover {
    opacity: 1;
  }
  
  /* MOBILE STYLES */
  .event-content-container {
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    touch-action: pan-x;
    overflow: hidden;
    margin: 0 0.5rem 1rem;
    border-radius: 8px;
  }
  
  .slider-track {
    display: flex;
    width: 100%;
    transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
    will-change: transform;
  }
  
  .event-slide {
    flex: 0 0 100%;
    width: 100%;
    padding: 0 0.5rem;
    box-sizing: border-box;
  }
  
  /* Mobile event content */
  .event-slide .event-content {
    background-image: url('/src/assets/old-background.webp');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 8px;
    padding: 2rem 1rem;
    min-height: 240px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: relative;
    height: 100%;
    opacity: 1;
    pointer-events: auto;
  }
  
  .event-slide .content-wrapper {
    padding-top: 1.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  
  .event-slide .year-text {
    font-size: 1.2rem;
    font-weight: bold;
    color: #500000;
    font-family: 'Georgia', serif;
    margin-bottom: 1rem;
  }
  
  .event-slide .year-text::before {
    content: '— ';
  }
  
  .event-slide .year-text::after {
    content: ' —';
  }
  
  .title {
    font-size: 1.5rem;
    color: #500000;
    margin: 0 0 1rem;
    font-weight: bold;
    line-height: 1.2;
    font-family: serif;
    text-align: center;
  }
  
  .description {
    font-size: 1.1rem;
    color: #48453c;
    line-height: 1.4;
    margin: 0;
    font-family: serif;
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .swipe-instruction {
    text-align: center;
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 1rem;
    font-style: italic;
  }
  
  .swipe-icon {
    display: inline-block;
    margin: 0 0.5rem;
    animation: swipe-hint 1.5s infinite;
  }
  
  @keyframes swipe-hint {
    0% { transform: translateX(0); }
    50% { transform: translateX(3px); }
    100% { transform: translateX(0); }
  }
  
  .timeline-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0.5rem 1rem;
  }
  
  .indicator-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #ddd;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .indicator-dot.active {
    width: 16px;
    height: 16px;
    background-color: #500000;
  }
  
  /* Responsive styles */
  @media (min-width: 768px) {
    .timeline {
      margin: 4rem 0 6rem;
    }
    
    .year {
      font-size: 1.75rem;
    }
    
    .active .year {
      font-size: 2rem;
    }
    
    .title {
      font-size: 1.6rem;
    }
    
    .description {
      font-size: 1.2rem;
    }
  }
  
  /* For very small screens */
  @media (max-width: 480px) {
    .timeline-title {
      font-size: 1.25rem;
    }
  }
  
  @media (max-width: 360px) {
    .event-slide .event-content {
      padding: 1.5rem 1rem;
      min-height: 200px;
    }
    
    .event-slide .content-wrapper {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    
    .event-slide .year-text {
      font-size: 1rem;
    }
    
    .title {
      font-size: 1.2rem;
    }
    
    .description {
      font-size: 0.9rem;
    }
  }
</style> 