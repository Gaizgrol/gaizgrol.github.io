<script lang="ts">
    import GitHubIcon from 'svelte-icons/io/IoLogoGithub.svelte'
    import TwitterIcon from 'svelte-icons/io/IoLogoTwitter.svelte'
    import LinkedinIcon from 'svelte-icons/io/IoLogoLinkedin.svelte'
</script>

<div class="page">
    <slot/>
</div>
<nav class="navigation">
    <a class="nav-icon" href="https://github.com/Gaizgrol">
        <GitHubIcon/>
    </a>

    <a class="nav-icon" href="https://www.linkedin.com/in/gabriel-izoton/">
        <LinkedinIcon/>
    </a>

    <a class="nav-icon" href="https://twitter.com/gabrielizoton">
        <TwitterIcon/>
    </a>
</nav>

<style lang="scss">
    :global(:root) {
        --background-far: rgb(4, 9, 15);
        --background-close: rgb(6, 18, 34);
    }

    :global(body) {
        display: flex;
        flex-direction: column;
        
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        
        background-color: var(--background-far);
        
        font-family: 'Open Sans', sans-serif;
        font-size: 18px;
        color: white
    }

    .page {
        width: 100%;
        height: calc(100% - 64px);
    }

    .navigation {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;

        background-color: var(--background-close);
        height: 64px;

        .nav-icon {
            color: white;
            width: 48px;
            height: 48px;
        }
    }
</style>