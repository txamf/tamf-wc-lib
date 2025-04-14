<script lang="ts">
  import { onMount } from 'svelte';
  import UnifiedTimeline from './lib/timeline.svelte';
  
  // Default timeline events
  const timelineEvents = [
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
</script>

<main>
  <h1>Mom Claghorn's Life Timeline</h1>
  
  <div class="timeline-container">
    <UnifiedTimeline events={timelineEvents} />
  </div>
</main>

<style>
  :global(:root) {
    /* Define global CSS variables for font sizing */
    --font-base-size: 16px;
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
    /* Heading sizes */
    --h1-size: 2.25rem;
    --h2-size: 1.5rem;
    --h3-size: 1.25rem;
    --h4-size: 1rem;
    
    /* Text sizes */
    --text-lg: 1.125rem;
    --text-md: 1rem;
    --text-sm: 0.875rem;
    --text-xs: 0.75rem;
    
    /* Brand colors */
    --primary-color: #500000;
    --secondary-color: #3D87CB;
    --text-color: #373A36;
    --text-light: #666;
    --background-light: #f9f9f9;
  }

  :global(body) {
    font-family: var(--font-family);
    font-size: var(--font-base-size);
    line-height: 1.5;
    color: var(--text-color);
    margin: 0;
    padding: 0;
  }
  
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 2rem;
  }
  
  .timeline-container {
    width: 100%;
  }
</style>
