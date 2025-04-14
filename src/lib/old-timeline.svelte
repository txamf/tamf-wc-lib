<svelte:options 
  customElement={{
    tag: "timeline-slider",
    props: {
      events: { type: 'Array' }
    },
    shadow: "open"
  }}
  css="injected"
/>
<script lang="ts">
  
  let currentIndex = $state(0);
  let scrollContainer = $state<HTMLDivElement | null>(null);
  let touchStartX = $state(0);
  
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
  
  let containerWidth = $state(0);
  
  $effect(() => {
    if (!scrollContainer) return;
    
    // Update container width when scroll container changes
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        containerWidth = entry.contentRect.width;
      }
    });

    resizeObserver.observe(scrollContainer);
    
    return () => resizeObserver.disconnect();
  });

  function selectEvent(index: number): void {
    console.log('Selecting event at index:', index);
    currentIndex = index; // Just update the index, no scrolling
  }
  
  function handleKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectEvent(index);
    }
  }
  
  function handleTouchStart(event: TouchEvent): void {
    touchStartX = event.touches[0].clientX;
  }
  
  function handleTouchEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    const MIN_SWIPE_DISTANCE = 50;
  
    if (Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
      if (deltaX < 0 && currentIndex < events.length - 1) {
        scrollToEvent(currentIndex + 1);
      } else if (deltaX > 0 && currentIndex > 0) {
        scrollToEvent(currentIndex - 1);
      }
    }
  }

  function scrollToEvent(index: number): void {
    currentIndex = index;
  }
  
  function scrollNext(): void {
    if (currentIndex < events.length - 1) {
      selectEvent(currentIndex + 1);
    } else {
      selectEvent(0); // Loop back to the beginning
    }
  }
  
  function scrollPrev(): void {
    if (currentIndex > 0) {
      selectEvent(currentIndex - 1);
    } else {
      selectEvent(events.length - 1); // Loop to the end
    }
  }
</script>
  
<div class="timeline">
  <div class="timeline-title">Remembering Mom's Life</div>
  <div class="timeline-container">
    <button 
      type="button" 
      class="nav-arrow nav-prev" 
      onclick={scrollPrev}
      aria-label="View previous events"
    >
      ←
    </button>
    
    <div 
      bind:this={scrollContainer}
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
      onclick={scrollNext}
      aria-label="View next events"
    >
      →
    </button>
  </div>
</div>
  
<style>
  .timeline {
    width: 100%;
    margin: 2rem 0; /* Reduced margin (was 3rem 0 5rem) */
    font-family: var(--font-family, serif);
    position: relative;
    /* Ensure no overflow */
    overflow: visible;
    max-height: 400px; /* Set maximum height */
  }

  .timeline-title {
    text-align: center;
    font-size: 1.75rem;
    font-weight: bold;
    color: #500000;
    margin-bottom: 1rem; /* Reduced from 2rem */
  }

  .timeline-container {
    position: relative;
    width: 100%;
    max-width: 100%;
    display: flex;
    align-items: center;
    /* Set fixed height for container */
    height: 320px; /* Limited height */
  }
  
  .scroll-container {
    overflow-x: auto;
    overflow-y: hidden; /* Explicitly prevent vertical scrolling */
    width: 100%;
    padding: 0;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;
    position: relative;
    /* Set fixed height for container */
    height: 100%;
    /* Ensure consistent positioning */
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
    top: 80px; /* Position line explicitly */
    left: 0;
    right: 0;
    z-index: 1;
    /* Add hardware acceleration */
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
    /* Basic styles only */
  }
  
  .event-item {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 150px;
    min-width: 150px;
    max-width: 150px; /* Added max-width for consistency */
    margin: 0;
    /* More specific transition property to avoid layout shifts */
    transition: transform 0.3s ease, color 0.3s ease;
    will-change: transform;
    transform: translateZ(0); /* Hardware acceleration */
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
    /* Add transition for smoother hover effects */
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
    margin-top: 80px; /* Position the vertical line at the bottom of the year area */
  }
  
  .vertical-line {
    width: 2px;
    height: 15px; /* Shortened vertical line (was 42px) */
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
    top: 20px; /* Position year text at the top */
    width: 100%;
    text-align: center;
  }
  
  .active .year {
    color: #500000;
    font-size: 2rem;
  }
  
  /* Description container styles */
  .description-container {
    position: relative;
    width: 100%;
    text-align: center;
    vertical-align: top;
    margin-top: 20px;
    height: 180px; /* Fixed height that fits within the timeline-container */
    padding: 0;
    z-index: 10;
    overflow: visible;
    /* Help prevent shifting */
    will-change: opacity;
    transform: translateZ(0);
  }
  
  .event-content {
    width: 100%;
    height: 180px; /* Match container height */
    margin: 0;
    padding: 0.5rem 1rem; /* Reduced top/bottom padding */
    background-image: url('/src/assets/old-background.webp');
    background-size: 100% 100%; /* Cover the entire area */
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
    align-items: center; /* Center content vertically */
    opacity: 0;
    /* Only animate opacity to prevent layout shifts */
    transition: opacity 0.3s ease;
    pointer-events: none;
    /* Help prevent shifting */
    will-change: opacity;
  }
  
  .event-content.visible {
    opacity: 1;
    pointer-events: auto;
  }
  
  /* Content wrapper to ensure proper centering */
  .content-wrapper {
    max-width: 680px; /* Slightly reduced (was 700px) */
    width: 100%;
    text-align: center;
    padding: 0.25rem; /* Reduced padding (was 0.5rem) */
    background-color: transparent;
    display: block; /* Ensure block display */
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
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.9), 0 0 10px rgba(255, 255, 255, 0.7);
  }

  .desc-year::before {
    content: '— ';
    }
 .desc-year::after {
    content: ' —';
    }

  .title {
    font-size: 1.3rem;
    color: #500000;
    margin: 0;
    font-weight: bold;
    line-height: 1.2;
    font-family: 'Georgia', serif;
    text-align: center;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.9), 0 0 10px rgba(255, 255, 255, 0.7);
    display: block;
  }
  
  .description {
    font-size: 1rem; /* Slightly reduced from 1.1rem */
    color: #48453c;
    line-height: 1.2;
    margin: 0.5rem auto 0;
    max-width: 630px;
    max-height: 80px; /* Limit description height */
    overflow-wrap: break-word;
    font-family: 'Georgia', serif;
    text-align: center;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.9), 0 0 10px rgba(255, 255, 255, 0.7);
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
    margin-top: 40px; /* Align with the horizontal line */
  }
  
  .nav-arrow:hover {
    opacity: 1;
  }
  
  /* Media queries for font adjustments */
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
    .event-item {
      min-width: 70px;
      margin: 0 0.25rem;
    }
    
    .year {
      font-size: 1.25rem;
    }
    
    .active .year {
      font-size: 1.5rem;
    }
    
    .title {
      font-size: 1rem;
    }
    
    .description {
      font-size: 0.875rem;
    }
    
    .nav-arrow {
      font-size: 1.5rem;
      width: 30px;
    }
  }
</style>
