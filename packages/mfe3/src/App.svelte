<script>
    import { getAccessToken, getIsLoggedIn } from '@oat-sa/common-auth';
    import _ from 'lodash';
    import { tick } from 'svelte';

    export let name;

    // let authenticated = false;

    tick().then(async () => {
        _.omit({ a: 1, b: 2 }, 'a');

        // await getAccessToken().then(accessToken => {
        //     authenticated = !!accessToken;
        // });
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
    <p>You should have logged in if you can see this app.</p>
    <p>authenticated: {getIsLoggedIn()}</p>
    <nav>
        <a href="/mfe3">no sub-route</a> |
        <a href="/mfe3/foo">sub-route foo</a> |
        <a href="/mfe3/bar">sub-route bar</a>
    </nav>
</section>
