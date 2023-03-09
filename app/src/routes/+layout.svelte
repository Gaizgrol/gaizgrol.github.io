<script>
    import NavBar from "$lib/components/NavBar.svelte";
</script>

<div class="page">
    <slot/>
</div>
<NavBar/>

<style lang="scss">
    :global(body) {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        
        background-color: rgb(4, 9, 15);
        
        font-family: 'Open Sans', sans-serif;
        font-size: 18px;
        color: white
    }

    .page {
        width: 100%;
        height: calc(100% - 64px);
    }
</style>