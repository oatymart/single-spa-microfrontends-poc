<script>
    import { countStore, incrementCount } from '@oat-sa/common';
    import { getIsLoggedIn } from '@oat-sa/common-auth';
    import _ from 'lodash';
    import { tick } from 'svelte';

    export let name;

    tick().then(async () => {
        _.omit({ a: 1, b: 2 }, 'a');
    });
</script>

<style>
    section {
        font-size: 1.5rem;
        min-height: 6rem;
        background: palegoldenrod;
        padding: 8px;
        & p {
            margin-block: 0.5rem;
        }
    }
</style>

<section>
    <h2>{name} is mounted!</h2>
    <p>You should have logged in if you can see this app.</p>
    <p>authenticated: {getIsLoggedIn()}</p>
    <p>$countStore: {$countStore}</p>
    <button on:click={incrementCount}>Increment count</button>
</section>
