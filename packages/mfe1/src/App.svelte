<script>
    import { publicApiFunction, countStore, incrementCount } from '@oat-sa/common';
    import SimpleComponent from 'SimpleComponent';
    import { AnotherSimpleComponent } from '@oat-sa/oat-sa-common-components';
    import _ from 'lodash';
    import { onMount, tick } from 'svelte';

    export let name;

    let element;
    let anotherElement;

    onMount(() =>  {
        new SimpleComponent({ target: element });
        new AnotherSimpleComponent({ target: element, props: {param: 'my prop value'}})  // dynamic import not needed. We can use a normal import
    });

    let CompiledComponent;
    // onMount(() =>  (CompiledComponent = SimpleComponent)); // <svelte:component this={CompiledComponent} /> doesn't work. see https://github.com/sveltejs/svelte/issues/6584#issuecomment-1019578529

    // dynamic import not needed. We can use a normal import
    // onMount(async () => {
    //     const { SimpleComponent } = await import('@oat-sa/oat-sa-common-components');
    //     new SimpleComponent({ target: element }, {});
    // });

    tick().then(async() => {
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
    <div bind:this={anotherElement} />
    <!-- this below doesn't work -->
    <svelte:component this={CompiledComponent} />
    
</section>
