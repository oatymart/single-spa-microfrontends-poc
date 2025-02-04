<script>
    import { navigateToUrl } from "single-spa"; // may not be a good practice...
    import { getIsLoggedIn, getAccessToken } from '../auth/auth.js';

    let loggedIn = getIsLoggedIn();

    async function handleSubmit(e) {
        // arbitrary success condition
        if (e.target[0].value.length && e.target[1].value.length) {
            await getAccessToken();
            loggedIn = getIsLoggedIn();
            if (loggedIn) {
                // soft-redirect to next app
                const url = new URL(window.location.href);
                const redirect = url.searchParams.get('redirect') || '/';
                navigateToUrl(redirect);
            }
        }
    }
</script>

<style>
    .auth {
        font-size: 1.75rem;
        height: 100vh;
        background: lightblue;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        & input,
        & button {
            font-size: 1em;
            margin-bottom: 0.5rem;
        }
    }
</style>

<div class="auth">
    {#if !loggedIn}
        <form on:submit|preventDefault={handleSubmit}>
            <input type="text" placeholder="Username"><br>
            <input type="password" placeholder="Password"><br>
            <button type="submit">Log in</button>
        </form>
    {/if}
</div>
