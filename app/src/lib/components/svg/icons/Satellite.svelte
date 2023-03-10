<script lang="ts">
    export let size: string = "48px"
    export let color: string = "cornflowerblue"
    export let bgColor: string | undefined = undefined
    export let img: string | undefined = undefined
</script>

<div>
    {#if img}
    <div class="cover-img" style:width={size} style:height={size} style:border-color={color} style:background-color={bgColor}>
        <img style:width={size} style:height="auto" src={img} alt="Imagem do satélite"/>
    </div>
    {:else}
        <div class="cover-img" style:width={size} style:height={size} style:border-color={color} style:background-color={bgColor}></div>
    {/if}
</div>

<style lang="scss">
    .cover-img {
        display: flex;
        flex-direction: column;
        justify-content: center;

        border-radius: 50%;
        border-width: 3px;
        border-style: solid;
        overflow: hidden;
    }
</style>