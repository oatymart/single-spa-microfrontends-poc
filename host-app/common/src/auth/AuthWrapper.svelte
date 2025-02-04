<script>
    import { getIsLoggedIn, getAccessToken } from './auth.js';

    let loggedIn = getIsLoggedIn();

    async function handleSubmit() {
        await getAccessToken();
        loggedIn = getIsLoggedIn()
    }
</script>

<div class="auth">
    {#if !loggedIn}
        <form on:submit|preventDefault={handleSubmit}>
            <input type="text" placeholder="Username">
            <input type="password" placeholder="Password">
            <button type="submit">Login</button>
        </form>
    {:else}
        <slot />
    {/if}
</div>
