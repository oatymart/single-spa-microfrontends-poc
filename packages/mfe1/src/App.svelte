<script>
    import { publicApiFunction, countStore, getCount, incrementCount } from '@oat-sa/apis';
    import { tick } from 'svelte';
    import _ from 'lodash';

    export let name;

    let countRef = {};
    $: count = getCount(countRef);

    tick().then(() => {
        publicApiFunction();
        _.pick({ a: 1, b: 2 }, 'a');
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
    <p>count: {count}</p>
    <p>$countStore: {$countStore}</p>
    <button on:click={() => { countRef = {}; incrementCount(); }}>Increment count</button>
</section>
