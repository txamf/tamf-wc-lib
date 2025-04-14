<svelte:options 
  customElement={{
    tag: "mobile-timeline-slider",
    props: {
      events: { type: 'Array' }
    },
    shadow: "open"
  }}
  css="injected"
/>
<script lang="ts">
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
  
  // Computed style for the slider transform
  let transformStyle = $derived(`translateX(-${currentIndex * 100}%)`);
  
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
  
  // Improved touch handling for swipe navigation
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

<div class="mobile-timeline">
  <div class="timeline-title">Remembering Mom's Life</div>
  
  <!-- Swipeable Event Content -->
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
  
  <!-- Timeline Indicator Dots -->
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
</div>

<style>
  .mobile-timeline {
    width: 100%;
    margin: 1rem 0;
    font-family: var(--font-family, serif);
    position: relative;
    max-width: 100%;
    overflow: hidden;
  }

  .timeline-title {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #500000;
    margin-bottom: 1rem;
  }
  
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
  
  .event-content {
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
  }
  
  .content-wrapper {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    padding-top: 1.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  
  .year-text {
    font-size: 1.2rem;
    font-weight: bold;
    color: #500000;
    font-family: 'Georgia', serif;
    margin-bottom: 1rem;
  }
  
  .year-text::before {
    content: '— ';
  }
  
  .year-text::after {
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
  
  @media (max-width: 360px) {
    .timeline-title {
      font-size: 1.25rem;
    }
    
    .event-content {
      padding: 1.5rem 1rem;
      min-height: 200px;
    }
    
    .content-wrapper {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    
    .year-text {
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