<script lang="ts">
    import Background from "$lib/components/Background.svelte";
    
    import Earth from "$lib/components/svg/icons/Earth.svelte";
    import Planet from "$lib/components/svg/icons/Planet.svelte";
    import Rocket from "$lib/components/svg/icons/Rocket.svelte";

	import { onMount } from "svelte";
	import { scrollSmoothlyTo } from "$lib/util/animation";

    import { sineInOut } from 'svelte/easing'

    import type { PageData } from "./$types";
    
    export let data: PageData;

    type Page = {
        title: string
        text: string
    }

    const contents: Page[] = [
        {
            title: 'Salve',
            text: 'Lorem ipsum dolor sit amet.'
        },
        {
            title: 'Salve2',
            text: 'Consectetur adipiscing elit.'
        },
        {
            title: 'Salve3',
            text: 'Duis vulputate eget urna id pellentesque.'
        }
    ]
    
    let page = 0

    let content: Page
    $: content = contents[page]

    let canGoFurther: boolean
    $: canGoFurther = page < contents.length-1

    let rocket: HTMLDivElement;
    let earth: HTMLDivElement;
    
    let actualPlanet: number = -1;
    let planets: HTMLDivElement[] = [];
    let journey: HTMLDivElement

    const pageNext = () => {
        if (actualPlanet < 0) {
            departure()
        } else {
            nextPlanet()
        }
    }

    const departure = () => {
        earth.style.transform = "translateY(100%)"
        actualPlanet = planets.length
        nextPlanet()
    }

    const nextPlanet = () => {
        actualPlanet = actualPlanet === 0 ? 0 : actualPlanet-1
        scrollSmoothlyTo(journey, planets[actualPlanet], 5, sineInOut)
    }

    const focusOnPlanet = () => {
        if (actualPlanet < 0) {
            planets.at(-1)?.scrollIntoView(false)
        } else {
            planets.at(actualPlanet)?.scrollIntoView(true)
        }
    }

    onMount(() => {
        focusOnPlanet()
        window.addEventListener('resize', () => {
            focusOnPlanet()
        })
    })
</script>

<div class="sections">
    <Background/>
    <div bind:this={journey} class="journey">
        <div>
            <div class="divider"></div>
        </div>
        {#each data.roles as {name, skillGroups, institution}, index}
        <div bind:this={planets[index]}>
            <Planet
                img={institution.logo.image}
                color={institution.logo.backgroundColor}
                orbits={Object.values(skillGroups)}
                size="20vw"
                satteliteSize="4vw"
            />
            <div class="divider"></div>
        </div>
        {/each}
        <div class="rocket" bind:this={rocket}>
            <Rocket/>
        </div>
        <div bind:this={earth} class="earth">
            <Earth size="40vw"/>
        </div>
    </div>
    <div class="pages">
        <div class="gradient"></div>
        <div class="content">
            <h2>{content.title}</h2>
            <p>{content.text}</p>
            {#if canGoFurther}
                <button on:click={pageNext}>
                    Próximo
                </button>
            {:else}
                <button on:click={() => console.log('Entrar em contato')}>
                    Currículo
                </button>
            {/if}
        </div>
        <div class="checkpoints">
            {#each data.roles as {institution}}
                <Planet
                    img={institution.logo.image}
                    color={institution.logo.backgroundColor}
                    imgWidth="80%"
                />
            {/each}
            <Earth/>
        </div>
    </div>
</div>

<style lang="scss">
    h2 {
        font-family: 'Work Sans';
        font-size: 64px;
    }

    .sections {
        display: flex;
        flex-direction: row;
        height: 100%;

        > div {
            overflow-x: hidden;
        }

        .journey {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            overflow-y: hidden;
            width: 50%;

            .divider {
                height: 150vh;
            }

            .rocket {
                position: absolute;
                bottom: 64px;
                z-index: 2;
                transform: translateY(-100%)
            }
            .earth {
                transition: transform 2s ease-in;

                position: absolute;
                bottom: 64px;
                z-index: -11;
                transform: translateY(70%)
            }
        }

        .pages {
            display: flex;
            flex-direction: row;
            width: 50%;
            overflow-y: hidden;

            .gradient {
                width: 64px;
                background: linear-gradient(90deg, rgba(4, 9, 15, 0) 0%, rgba(4,9,15,0.8) 100%);
            }

            .content {
                box-sizing: border-box;
                padding-top: 15vh;

                overflow-y: auto;

                width: calc(100% - 128px);
                padding-right: 64px;

                text-align: justify;

                background-color: rgba(4, 9, 15, 0.8);

                scrollbar-width: none;
                -ms-overflow-style: none;
                ::-webkit-scrollbar {
                    width: 0;
                }
            }

            .checkpoints {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;

                background-color: rgba(4, 9, 15, 0.8);

                width: 64px;
            }
        }
    }
</style>