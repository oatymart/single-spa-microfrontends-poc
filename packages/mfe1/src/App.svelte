<script>
    import { publicApiFunction, countStore, incrementCount } from '@oat-sa/common';
    import SimpleComponent from 'SimpleComponent';
    import { AnotherSimpleComponent } from '@oat-sa/oat-sa-common-components';
    import _ from 'lodash';
    import { onMount, tick } from 'svelte';
    import Widget from './Widget.svelte';

    export let name;
    let element;

    onMount(() => {
        new SimpleComponent({ target: element });
        // new AnotherSimpleComponent({ target: anotherElement, props: { param: 'my prop value' } }); // commented as example to pass props, but we're using Widtet.svelte instead
    });

    tick().then(async () => {
        publicApiFunction();
        _.pick({ a: 1, b: 2 }, 'a');
    });
</script>

<style>
    section {
        font-size: 1.5rem;
        min-height: 6rem;
        background: lavender;
        padding: 8px;
        & p {
            margin-block: 0.5rem;
        }
    }
</style>

<section>
    <h2>{name} is mounted!</h2>
    <p>Accessing this app is NOT restricted by authentication!</p>
    <p>$countStore: {$countStore}</p>
    <button on:click={incrementCount}>Increment count</button>
    <div bind:this={element} />
    <Widget this={AnotherSimpleComponent} param={'hello'} />
</section>
