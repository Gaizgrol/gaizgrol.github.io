<script lang="ts">
    import { randomRange } from '$lib/util/math';

    const smallerStars = 1000
    const smallerStarsMinRadius = 0.05
    const smallerStarsMaxRadius = 0.10

    const farPlanets = 100
    const farPlanetsMinRadius = 0.10
    const farPlanetsMaxRadius = 0.30

    const greaterStars = 500
    const greaterStarsMinRadius = 0.05
    const greaterStarsMaxRadius = 0.20

    const randomPos = (radiusMin: number, radiusMax: number) => ({
        cx: randomRange(0, 100),
        cy: randomRange(0, 100),
        r: randomRange(radiusMin, radiusMax)
    })
</script>

<svg id="svg-background" viewBox="0 0 100 100" class="background">
    {#each Array(smallerStars) as _}
        <circle
            {...randomPos(smallerStarsMinRadius, smallerStarsMaxRadius)}
            fill="white"
        />
    {/each}
    {#each Array(greaterStars) as _}
        <circle
            {...randomPos(greaterStarsMinRadius, greaterStarsMaxRadius)}
            fill="white"
        />
    {/each}
    {#each Array(farPlanets) as _}
        <circle
            {...randomPos(farPlanetsMinRadius, farPlanetsMaxRadius)}
            fill={`hsl(${Math.round(Math.random()*255)}, 100%, 20%)`}
        />
    {/each}
</svg>

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