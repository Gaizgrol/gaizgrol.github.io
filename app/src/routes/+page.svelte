<script lang="ts">
    import Background from "$lib/components/Background.svelte";
    
    import Earth from "$lib/components/svg/icons/Earth.svelte";
    import Planet from "$lib/components/svg/icons/Planet.svelte";
    import Rocket from "$lib/components/svg/icons/Rocket.svelte";

    import ejcm from '$lib/assets/ejcm.png'
    import estacio from '$lib/assets/estacio.png'
    import legaut from '$lib/assets/legaut.png'
    import resilia from '$lib/assets/resilia.png'
    import ufrj from '$lib/assets/ufrj.png'
	import Divider from "$lib/components/Divider.svelte";

	import { onMount } from "svelte";

    type Brand = {
        title: string
        logo: string
        background: string
    }

    const brands: Brand[] = [
        {
            title: 'Universidade Estácio de Sá',
            logo: estacio,
            background: '#144bc9'
        },
        {
            title: 'Resilia',
            logo: resilia,
            background: '#2d2c2c'
        },
        {
            title: 'LegAut',
            logo: legaut,
            background: 'white'
        },
        {
            title: 'EJCM',
            logo: ejcm,
            background: '#203469'
        },
        {
            title: 'UFRJ',
            logo: ufrj,
            background: 'white'
        }
    ]

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
    let journey: HTMLDivElement;

    onMount(() => {
        console.log({ rocket, journey })
    })
</script>

<div class="sections">
    <Background/>
    <div bind:this={journey} class="journey">
        {#each brands as {background, logo, title} (title)}
        <div>
            <Divider/>
            <Planet size="20vw" img={logo} color={background}/>
        </div>
        {/each}
        <div>
            <Divider/>
        </div>
        <div bind:this={rocket}>
            <Rocket/>
        </div>
        <Earth size="40vw"/>
    </div>
    <div class="pages">
        <div class="gradient"></div>
        <div class="content">
            <h2>{content.title}</h2>
            <p>{content.text}</p>
            {#if canGoFurther}
                <button on:click={() => page++}>
                    Próximo
                </button>
            {:else}
                <button on:click={() => console.log('Entrar em contato')}>
                    Currículo
                </button>
            {/if}
        </div>
        <div class="checkpoints">
            {#each brands as {background, logo, title} (title)}
                <Planet img={logo} imgWidth="80%" color={background}/>
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
            overflow-y: scroll;
            width: 50%;
        }

        .pages {
            display: flex;
            flex-direction: row;
            width: 50%;
            overflow-y: hidden;

            .gradient {
                width: 64px;
                background: linear-gradient(90deg, rgba(4,9,15,0) 0%, rgba(4,9,15,1) 100%);
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