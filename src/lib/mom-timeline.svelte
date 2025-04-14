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
  
  let currentIndex = $state(0);
  let touchStartX = $state(0);
  let isSwiping = $state(false);
  
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
  
  // Computed style for slider transform (mobile view)
  let transformStyle = $derived(`translateX(-${currentIndex * 100}%)`);
  
  function selectEvent(index: number): void {
    if (index >= 0 && index < events.length) {
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
  
  // Touch handling for swipe navigation
  function handleTouchStart(event: TouchEvent): void {
    touchStartX = event.touches[0].clientX;
    isSwiping = true;
  }
  
  function handleTouchMove(event: TouchEvent): void {
    if (!isSwiping) return;
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

<div class="timeline">
  <div class="timeline-title">Remembering Mom's Life</div>
  
  <!-- Timeline Navigation -->
  <div class="timeline-nav">
    <button 
      type="button" 
      class="nav-arrow nav-prev" 
      onclick={prevEvent}
      disabled={currentIndex === 0}
      aria-label="View previous events"
    >
      ←
    </button>
    
    <!-- Years Timeline (visible on desktop) -->
    <div class="years-timeline">
      <div class="years-line"></div>
      <div class="years-container">
        {#each events as event, i}
          <button
            type="button"
            class="year-marker"
            class:active={currentIndex === i}
            onclick={() => selectEvent(i)}
            onkeydown={(e) => handleKeyDown(e, i)}
            aria-selected={currentIndex === i}
            aria-label="{event.year}: {event.title}"
          >
            <div class="year">{event.year}</div>
            <div class="vertical-line"></div>
          </button>
        {/each}
      </div>
    </div>
    
    <button 
      type="button" 
      class="nav-arrow nav-next" 
      onclick={nextEvent}
      disabled={currentIndex === events.length - 1}
      aria-label="View next events"
    >
      →
    </button>
  </div>
  
  <!-- Content Area -->
  <div 
    class="content-area"
    ontouchstart={handleTouchStart}
    ontouchmove={handleTouchMove}
    ontouchend={handleTouchEnd}
  >
    <!-- Content Slider -->
    <div class="content-slider" style="transform: {transformStyle}">
      {#each events as event, i}
        <div class="event-content">
          <div class="content-card">
            <div class="year-text">{event.year}</div>
            <h3 class="title">{event.title}</h3>
            <p class="description">{event.description}</p>
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Indicator Dots (mobile only) -->
    <div class="indicator-dots">
      {#each events as _, i}
        <button 
          class="indicator-dot" 
          class:active={currentIndex === i}
          onclick={() => selectEvent(i)}
          aria-label={`Go to event from ${events[i].year}`}
        ></button>
      {/each}
    </div>
    
    <!-- Swipe Instruction (mobile only) -->
    <div class="swipe-instruction">
      <span class="swipe-icon">←</span>
      Swipe right to go back, left for next
      <span class="swipe-icon">→</span>
    </div>
  </div>
</div>

<style>
  /*
   * Core styles for all screen sizes
   */
  .timeline {
    width: 100%;
    font-family: var(--font-family, Georgia, serif);
    color: #48453c;
    margin: 2rem auto;
    overflow: hidden;
    position: relative;
  }
  
  .timeline-title {
    text-align: center;
    font-size: clamp(1.25rem, 4vw, 1.75rem);
    font-weight: bold;
    color: #500000;
    margin-bottom: 1.5rem;
  }
  
  /* Navigation */
  .timeline-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    width: 100%;
  }
  
  .nav-arrow {
    background: none;
    border: none;
    padding: 0.5rem;
    color: #500000;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    transition: opacity 0.2s;
    z-index: 5;
  }
  
  .nav-arrow:hover:not(:disabled) {
    opacity: 1;
  }
  
  .nav-arrow:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  /* Years Timeline (desktop) */
  .years-timeline {
    flex: 1;
    position: relative;
    display: none; /* Hidden on mobile by default */
    height: 80px; /* Increased height for better spacing */
    overflow: visible;
  }
  
  .years-line {
    position: absolute;
    height: 2px;
    background-color: #e6e6e6;
    top: 50px; /* Positioned lower to allow years above */
    left: 0;
    right: 0;
    z-index: 1;
  }
  
  .years-container {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;
  }
  
  .year-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    position: relative;
    flex: 1;
    height: 80px; /* Match container height */
  }
  
  .year {
    font-size: 1rem;
    font-weight: bold;
    color: #500000;
    position: absolute;
    top: 15px; /* Positioned above the line */
    transition: font-size 0.2s ease, top 0.2s ease;
  }
  
  .vertical-line {
    width: 2px;
    height: 15px;
    background-color: #500000;
    position: absolute;
    top: 35px; /* Connects from year down to the horizontal line */
    transition: height 0.2s ease, width 0.2s ease;
  }
  
  .year-marker.active .year {
    font-size: 1.2rem;
    top: 10px; /* Move up slightly when active */
  }
  
  .year-marker.active .vertical-line {
    height: 20px; /* Longer when active */
    width: 3px;
  }
  
  /* Content Area */
  .content-area {
    position: relative;
    overflow: hidden;
    width: 100%;
    border-radius: 8px;
  }
  
  .content-slider {
    display: flex;
    width: 100%;
    transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
    will-change: transform;
  }
  
  .event-content {
    flex: 0 0 100%;
    width: 100%;
    padding: 0 0.5rem;
    box-sizing: border-box;
  }
  
  .content-card {
    background-image: url('/src/assets/old-background.webp');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 8px;
    width: 100%;
    min-height: 240px;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    position: relative; /* For the background overlay */
  }
  
  /* Semi-transparent background to improve text readability */
  .content-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.75); /* Increased opacity for better contrast */
    border-radius: 8px;
    z-index: 0;
  }
  
  .year-text, .title, .description {
    position: relative;
    z-index: 1; /* Above the overlay */
  }
  
  .year-text {
    font-size: 1.2rem;
    font-weight: bold;
    color: #500000;
    margin-bottom: 1rem;
    font-family: Georgia, serif;
    text-shadow: 0 0 5px white; /* Text shadow for readability */
  }
  
  .year-text::before {
    content: '— ';
  }
  
  .year-text::after {
    content: ' —';
  }
  
  .title {
    font-size: 1.4rem;
    font-weight: bold;
    color: #500000;
    margin: 0 0 1rem;
    text-align: center;
    line-height: 1.3;
    text-shadow: 0 0 5px white; /* Text shadow for readability */
  }
  
  .description {
    font-size: 1.1rem;
    color: #48453c;
    line-height: 1.5;
    margin: 0 auto; /* Center the text */
    text-align: center;
    max-width: 700px; /* Limit width on desktop */
    text-shadow: 0 0 3px white; /* Text shadow for readability */
  }
  
  /* Mobile Specific Elements */
  .indicator-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin: 1rem 0;
  }
  
  .indicator-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #ddd;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .indicator-dot.active {
    width: 16px;
    height: 16px;
    background-color: #500000;
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
  
  /* 
   * Responsive Adjustments 
   */
  
  /* Mobile-first design - small screens */
  @media (max-width: 480px) {
    .content-card {
      padding: 2rem 1.5rem; /* Increased padding */
      min-height: 280px; /* Taller card */
    }
    
    .year-text {
      font-size: 1.5rem; /* Larger year text */
      margin-bottom: 1.2rem;
    }
    
    .title {
      font-size: 1.6rem; /* Larger title */
      margin-bottom: 1.5rem;
      font-weight: 800; /* Bolder text */
    }
    
    .description {
      font-size: 1.3rem; /* Larger description */
      line-height: 1.5;
      padding: 0 0.5rem;
      font-weight: 500; /* Slightly bolder for better visibility */
    }
    
    .nav-arrow {
      font-size: 1.5rem; /* Larger navigation arrows */
      padding: 0.75rem; /* Bigger touch target */
    }
    
    .indicator-dot {
      width: 16px; /* Larger indicator dots */
      height: 16px;
    }
    
    .indicator-dot.active {
      width: 20px; /* Larger active dot */
      height: 20px;
    }
    
    .swipe-instruction {
      font-size: 1rem; /* Larger instruction text */
      margin: 1.2rem 0;
    }
  }
  
  /* Tablets and small desktops */
  @media (min-width: 768px) {
    .timeline {
      margin: 3rem auto 4rem;
    }
    
    /* Show years timeline on larger screens */
    .years-timeline {
      display: block;
      margin: 0 1rem;
    }
    
    .nav-arrow {
      font-size: 1.8rem;
    }
    
    .content-card {
      min-height: 200px; /* Slightly taller than before */
      padding: 1.75rem 2.5rem 2.25rem;
      margin-top: 1.5rem;
    }
    
    /* Hide mobile-only elements on larger screens */
    .swipe-instruction {
      display: none;
    }
    
    .indicator-dots {
      margin-top: 0.5rem;
    }
    
    .year-text {
      display: none; /* Hide year text in content because it's shown in timeline */
    }
    
    .title {
      margin-top: 0;
    }
    
    .description {
      max-width: 500px; /* More constrained on tablets */
    }
  }
  
  /* Larger desktops */
  @media (min-width: 1024px) {
    .timeline {
      max-width: 1000px;
      margin: 4rem auto 5rem;
    }
    
    .years-container {
      padding: 0 2rem;
    }
    
    .year {
      font-size: 1.2rem;
    }
    
    .year-marker.active .year {
      font-size: 1.5rem;
    }
    
    .content-card {
      min-height: 200px;
      padding: 2rem 3rem;
    }
    
    .title {
      font-size: 1.6rem;
    }
    
    .description {
      font-size: 1.2rem;
      max-width: 700px;
    }
    
    /* Hide indicator dots on large screens */
    .indicator-dots {
      display: none;
    }
  }
</style> 