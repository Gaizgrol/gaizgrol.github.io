<script lang="ts">
    import * as d3 from 'd3'
	import { onMount } from 'svelte';

    onMount(() => {
        const svg = d3.select('#svg-background')
        for(let i=0; i<200; i++) {
            svg.append('circle')
                .attr('cx', Math.random() * 100)
                .attr('cy', Math.random() * 100)
                .attr('r', 0.05 + Math.random() * 0.15)
                .attr('fill', 'white')
        }
        for(let i=0; i<400; i++) {
            svg.append('circle')
                .attr('cx', Math.random() * 100)
                .attr('cy', Math.random() * 100)
                .attr('r', 0.05 + Math.random() * 0.05)
                .attr('fill', 'white')
        }
    })
</script>

<svg id="svg-background" viewBox="0 0 100 100" class="background"></svg>

<style style="scss">
    .background {
        position: absolute;
        z-index: -100;
    }

    @media (min-aspect-ratio: 1/1) {
        .background {
            width: 100%
        }
    }
    @media (max-aspect-ratio: 1/1) {
        .background {
            height: 100%
        }
    }
</style>