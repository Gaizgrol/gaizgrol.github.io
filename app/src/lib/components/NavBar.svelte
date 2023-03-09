<script>
    import GitHubIcon from 'svelte-icons/io/IoLogoGithub.svelte'
    import TwitterIcon from 'svelte-icons/io/IoLogoTwitter.svelte'
    import LinkedinIcon from 'svelte-icons/io/IoLogoLinkedin.svelte'
</script>

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
    .navigation {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        background-color: rgb(6, 18, 34);
        height: 64px;

        .nav-icon {
            color: white;
            width: 48px;
            height: 48px;
        }
    }
</style>