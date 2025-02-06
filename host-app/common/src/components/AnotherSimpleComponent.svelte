<script>
    export let param = 'empty';
</script>

<style>
    .simple {
        display: flex;
        flex-direction: column;
        background-color: #dfe3e5;
        font-size: 16px;
        border: 3px solid #808686;
        margin-block: 5px;

        & div {
            padding: 0.5rem;
            margin: auto;
        }
    }
</style>

<div class="simple">
    <div>Another simple remote Component. Param: {param}</div>
</div>
