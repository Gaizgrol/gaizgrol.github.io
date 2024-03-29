<script lang="ts">
	import type { HasImage } from "$lib/types";
	import { degToBoxPercentage, getCircleSliceAngle } from "$lib/util/math";
    import Satellite from "./Satellite.svelte";

    export let size: string = "48px"
    export let satteliteSize: string = "48px"
    export let color: string = "cornflowerblue"
    export let img: string | undefined = undefined
    export let imgWidth: string = "50%"
    export let orbits: HasImage[][] = []
    export let orbitSpacing: string = "50%"
</script>

<div class="container" style:width={size} style:height={size}>
    <svg style:width={size} style:height={size} xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
        <path fill={color} d="M96.85 286.62a8 8 0 00-12.53 8.25C102.07 373.28 172.3 432 256 432a175.31 175.31 0 0052.41-8 8 8 0 00.79-15 1120 1120 0 01-109.48-55.61 1126.24 1126.24 0 01-102.87-66.77zM492.72 339.51c-4.19-5.58-9.11-11.44-14.7-17.53a15.83 15.83 0 00-26.56 5.13c0 .16-.11.31-.17.47a15.75 15.75 0 003.15 16.06c22.74 25 26.42 38.51 25.48 41.36-2 2.23-17.05 6.89-58.15-3.53q-8.83-2.24-19.32-5.46-6.76-2.08-13.79-4.49a176.76 176.76 0 0019.54-27.25c.17-.29.35-.58.52-.88A175.39 175.39 0 00432 256a178.87 178.87 0 00-1-19c-9.57-88.17-84.4-157-175-157a175.37 175.37 0 00-106.4 35.89 177.4 177.4 0 00-45.83 51.84c-.16.29-.34.58-.51.87a175.48 175.48 0 00-13.83 30.52q-5.59-4.87-10.79-9.67c-5.39-5-10.17-9.63-14.42-14-29.57-30.26-33.09-45.61-32.16-48.45 2-2.23 15.54-5.87 48.62 1.31A15.82 15.82 0 0096.22 123l.36-.44a15.74 15.74 0 00-8.67-25.43A237.38 237.38 0 0064.13 93c-30.72-3.53-50.83 2.52-59.78 18-3.24 5.58-6.35 15.09-2.72 28.6C7 159.66 26.14 184 53.23 209.5c8.63 8.13 18.06 16.37 28.12 24.64 7.32 6 15 12.06 22.9 18.08q7.91 6 16.15 12T137.1 276c25.41 17.61 52.26 34.52 78.59 49.69q14.34 8.26 28.64 16t28.37 14.81c21.9 11 43.35 20.92 63.86 29.43q13.19 5.48 25.81 10.16c11.89 4.42 23.37 8.31 34.31 11.59l1.1.33c25.73 7.66 47.42 11.69 64.48 12H464c21.64 0 36.3-6.38 43.58-19 9.09-15.62 4.08-36.32-14.86-61.5z"/>
    </svg>
    <div class="orbits">
        {#each orbits as orbit, i}
        {#if orbit.length}
        {@const randomDuration = 15+Math.random()*15}
        <div
            class="orbit"
            style:width={`calc(${size} + ${orbitSpacing} * ${i})`}
            style:height={`calc(${size} + ${orbitSpacing} * ${i})`}
            style:animation-duration={randomDuration+'s'}
            style:border-color={color}
        >
            {#each orbit as satellite, index}
            {@const angleDiff = getCircleSliceAngle(orbit.length)}
            {@const startingPos = degToBoxPercentage(angleDiff*index)}
            <div
                class="satellite"
                style:animation-duration={randomDuration+'s'}
                style:left={startingPos[0]}
                style:top={startingPos[1]}
            >
                <Satellite size={satteliteSize} bgColor={satellite.backgroundColor} {color} img={satellite.image}/>
            </div>
            {/each}
        </div>
        {/if}
        {/each}
    </div>
    {#if img}
        <img style:width={imgWidth} class="cover-img" src={img} alt="Imagem do planeta"/>
    {/if}
</div>

<style lang="scss">
    .container {
        position: relative;

        .cover-img, .ionicon {
            position: absolute;
        }
        .ionicon {
            top: 0;
            left: 0;
        }
        .cover-img {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .orbits {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            .orbit {
                width: calc(100% + 50%);
                height: 100%;
                top: 50%;
                left: 50%;
                position: absolute;
                border-radius: 50%;
                border: 2px dashed red;
                animation: spin-left 30s linear infinite;
            }
        }
        .satellite {
            position: absolute;
            top: 50%;
            left: 0%;
            animation: spin-right 30s linear infinite;
        }
    }
    

    @keyframes spin-right {
        0% {
            transform: translate(-50%, -50%) rotateZ(0deg);
        }
        100% {
            transform: translate(-50%, -50%) rotateZ(360deg);
        }
    }

    @keyframes spin-left {
        0% {
            transform: translate(-50%, -50%) rotateZ(0deg);
        }
        100% {
            transform: translate(-50%, -50%) rotateZ(-360deg);
        }
    }
</style>