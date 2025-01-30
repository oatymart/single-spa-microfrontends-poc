<script>
    import { countStore, incrementCount } from '@oat-sa/apis';
    import { tick } from 'svelte';
    import _ from 'lodash';

    export let name;

    tick().then(() => {
        _.omit({ a: 1, b: 2 }, 'a');
    });
</script>

<style>
    section {
        font-size: 1.5rem;
        min-height: 6rem;
        background: palegoldenrod;
    }
</style>

<section>
    <h2>{name} is mounted!</h2>
    <p>$countStore: {$countStore}</p>
    <button on:click={incrementCount}>Increment count</button>
</section>
