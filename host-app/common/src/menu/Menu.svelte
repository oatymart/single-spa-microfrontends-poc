<script>
    import { menuStore } from './menu.js';
</script>

<style>
    ol {
        display: flex;
        padding: 0;
        gap: 1rem;
        list-style-type: none;
    }
</style>

<nav>
    <ol>
        {#each $menuStore as { label, href }}
        <li>
            <a {href}>{label}</a>
        </li>
        {/each}
    </ol>
</nav>
