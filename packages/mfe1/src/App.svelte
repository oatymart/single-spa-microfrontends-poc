<script>
    import { publicApiFunction, countStore, incrementCount } from '@oat-sa/common';
    import { getAccessToken } from '@oat-sa/common-auth';
    import _ from 'lodash';
    import { tick } from 'svelte';
    // import { VERSION } from 'svelte/compiler';

    export let name;

    let authenticated = false;

    tick().then(async() => {
        publicApiFunction();
        _.pick({ a: 1, b: 2 }, 'a');

        await getAccessToken().then(accessToken => {
            authenticated = !!accessToken;
        });
    });
</script>

<style>
    section {
        font-size: 1.5rem;
        min-height: 6rem;
        background: lavender;
    }
</style>

<section>
    <h2>{name} is mounted!</h2>
    <p>authenticated: {authenticated}</p>
    <!-- <p>Svelte: {VERSION}</p> -->
    <p>$countStore: {$countStore}</p>
    <button on:click={incrementCount}>Increment count</button>
</section>
