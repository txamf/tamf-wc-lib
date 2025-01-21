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
<script>
  
  let currentIndex = $state(0);
  let scrollContainer = $state(null);
  let touchStartX = $state(0);
  
  const CARD_WIDTH = 300;
  const CARD_GAP = 30;
  
  // Default events data
  const defaultEvents = [
    {
      year: "1981",
      title: "Auspicious Beginnings",
      description: "Began playing classical violin at age 3",
      icon: "🎻"
    },
    {
      year: "1991",
      title: "From Violin to Fiddle",
      description: "Switched musical styles, trading classical aspirations for high school garage bands",
      icon: "🎤"
    },
    {
      year: "1995",
      title: "Texas A&M Enrollment",
      description: "Worked toward a political science degree while continuing music as a hobby",
      icon: "📓"
    },
    {
      year: "1996",
      title: "Stage Presence",
      description: "Played fiddle with the likes of Jack Ingram, Roger Creager '93 and Corey Morrow",
      icon: "🎵"
    },
    {
      year: "1996",
      title: "On the Road",
      description: "Balanced classes with traveling to gigs with Pat Green's band",
      icon: "🚌"
    },
    {
      year: "1999",
      title: "Graduation",
      description: "Graduated from Texas A&M while maintaining a busy touring schedule with Pat Green",
      icon: "🎓"
    },
    {
      year: "2010",
      title: "OneLive Media",
      description: "Helped start direct-to-fan marketing business in Austin, where he was head of e-commerce and of artist relations/logistics",
      icon: "💻"
    },
    {
      year: "2014",
      title: "Texas Music Office",
      description: "Appointed director of the Texas Music Office by Gov. Greg Abbott",
      icon: "🏛️"
    },
    {
      year: "2016",
      title: "Music Friendly Community Program",
      description: "Created a far-reaching program that fosters music industry connections across the state",
      icon: "🤝"
    },
    {
      year: "2023",
      title: "Advocate for Music Education",
      description: "Joined advisory board for Texas A&M University's College of Performance, Visualization and Fine Arts",
      icon: "📚"
    },
    {
      year: "2024",
      title: "Big Loud Texas",
      description: "Became vice president of the new Big Loud Texas, a division of the Big Loud record label",
      icon: "🎸"
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

  $effect(() => {
    if (!scrollContainer || !containerWidth) return;
    
    const cards = Array.from(scrollContainer.querySelectorAll('[data-card]'));
    const activeCard = cards[currentIndex];
    if (!activeCard) return;
  
    // Calculate scroll position based on dynamic container width
    const cardLeft = activeCard.offsetLeft;
    const scrollPosition = cardLeft - (containerWidth - CARD_WIDTH) / 2;
    
    scrollContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  });
  
  const canGoNext = $derived(currentIndex < events.length - 1);
  const canGoPrev = $derived(currentIndex > 0);
  
  function next() {
    if (canGoNext) currentIndex++;
  }
  
  function prev() {
    if (canGoPrev) currentIndex--;
  }
  
  function selectEvent(index) {
    currentIndex = index;
  }
  
  function handleKeyDown(event, index) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectEvent(index);
    }
  }
  
  let scrollAccumulator = $state(0);
  const SCROLL_THRESHOLD = 100;
  
  function handleWheel(event) {
    if (Math.abs(event.deltaX) > 0) {
      event.preventDefault();
      scrollAccumulator += event.deltaX;
  
      if (Math.abs(scrollAccumulator) >= SCROLL_THRESHOLD) {
        if (scrollAccumulator > 0 && canGoNext) {
          next();
          scrollAccumulator = 0;
        } else if (scrollAccumulator < 0 && canGoPrev) {
          prev();
          scrollAccumulator = 0;
        }
      }
    } else {
      scrollAccumulator = 0;
    }
  }
  
  $effect(() => {
    scrollAccumulator = 0;
  });
  
  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
  }
  
  function handleTouchEnd(event) {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    const MIN_SWIPE_DISTANCE = 50;
  
    if (Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
      if (deltaX < 0 && canGoNext) {
        next();
      } else if (deltaX > 0 && canGoPrev) {
        prev();
      }
    }
  }
  </script>
  
  <div class="timeline">
    <div class="timeline-container">
      <div 
        bind:this={scrollContainer}
        class="scroll-container"
        onwheel={handleWheel}
        ontouchstart={handleTouchStart}
        ontouchend={handleTouchEnd}
        role="region" 
        aria-label="Timeline events"
      >
        <div class="card-container">
          {#each events as event, i}
            <div 
              data-card
              class="card-wrapper"
              class:active={currentIndex === i}
              style="width: {CARD_WIDTH}px;"
            >
              <button
                type="button"
                class="card-button"
                onclick={() => selectEvent(i)}
                onkeydown={(e) => handleKeyDown(e, i)}
                role="tab"
                aria-selected={currentIndex === i}
                aria-label="{event.year}: {event.title}"
              >
                <div class="card">
                  <div class="card-header">
                  </div>
                  <div class="card-content">
                    <div class="icon">{event.icon}</div>
                    <h3 class="year">{event.year}</h3>
                    <h4 class="title">{event.title}</h4>
                    <p class="description">{event.description}</p>
                  </div>
                </div>
              </button>
            </div>
          {/each}
        </div>
      </div>
  
      <div class="navigation">
        <button 
          type="button"
          class="nav-button"
          class:disabled={!canGoPrev}
          onclick={prev}
          disabled={!canGoPrev}
          aria-label="Previous event"
        >
          ←
        </button>
  
        <button 
          type="button"
          class="nav-button"
          class:disabled={!canGoNext}
          onclick={next}
          disabled={!canGoNext}
          aria-label="Next event"
        >
          →
        </button>
      </div>
    </div>
  </div>
  
  <style>
   .timeline {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
    overflow-x: hidden;
    position: relative;
    left: 0;
    right: 0;
  }

  .timeline-container {
  position: relative;
  width: 100%;
}

.scroll-container {
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 100%;
}

.card-container {
  display: inline-flex;
  padding: 20px max(calc(50vw - 150px), 20px);
  position: relative;
  min-width: fit-content;
}
  
    .card-wrapper {
      flex: none;
      transition: all 0.5s;
      opacity: 0.6;
      transform: scale(0.9);
    }
  
    .card-wrapper:hover {
      opacity: 0.8;
    }
  
    .card-wrapper.active {
      opacity: 1;
      transform: scale(1);
    }
  
    .card-button {
      width: 100%;
      text-align: left;
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }
  
    .card {
      background: white;
      padding: 0px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      height: 300px;
      overflow: hidden;
      font-family: sans-serif;
    }
  
    .card-header {
      background-color: #e6e6e641;
      height: 6rem;
      width: 100%;/* padding: 1rem; */
    }
  
    .icon {
      font-size: 4.5rem;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin-bottom: 2rem;
      margin-top: -2.25rem;
      margin-left: 1rem;
    }
  
    .year {
      font-size: 5.5rem;
      color: #3D87CB;
      font-weight: 900;
      margin: 0;
      padding: 0;
      line-height: 1;
    }
  
    .card-content {
      padding: 1rem;
    }
  
    .title {
      font-size: 2rem;
    color: #373A36;
    margin: 0.5rem 0 0.25rem 0;
    padding-left: 1.3rem;
    margin-left: -1rem;
    border-left: 8px solid #500000;
    line-height: 1.2;
    font-weight: bold;
    margin-top: 1rem;
    }
  
    .description {
      color: #666;
    font-size: 1.5rem;
    line-height: 1.4;
    padding-left: 1rem;
    margin: 0;
    margin-left: .2rem;
    margin-top: .35rem;
    }
  
    .navigation {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top: 1rem;
    }
  
    .nav-button {
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      padding: 0.5rem;
      transition: color 0.3s;
      color: #333;
    }
  
    .nav-button:hover:not(.disabled) {
      color: #3D87CB;
    }
  
    .nav-button.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  </style>