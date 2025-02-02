<script>
    import { getAccessToken } from '@oat-sa/common-auth';
    import _ from 'lodash';
    import { tick } from 'svelte';

    export let name;

    let authenticated = false;

    tick().then(async () => {
        _.omit({ a: 1, b: 2 }, 'a');

        await getAccessToken().then(accessToken => {
            authenticated = !!accessToken;
        });
    });
</script>

<style>
    section {
        font-size: 1.5rem;
        min-height: 6rem;
        background: salmon;
    }
</style>

<section>
    <h2>{name} is mounted!</h2>
    <p>authenticated: {authenticated}</p>
</section>
