<script lang="ts">
    export let type: string, bg_fill: string = "white", stroke: string = "black", fill: string = "#6E1414";
    
</script>

<div>
    {#if type == "shirt"}
        <svg width="150" height="150" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" fill={bg_fill}/>
                <path d="M4.5 18H9H11H15.5V8L16.5 9L19 5.5L15.5 2L13 1L10 2L7 1L4.5 2L1 5.5L3.5 9L4.5 8V18Z" fill={fill} stroke={stroke}/>
        </svg>
    {/if}
    {#if type == "shorts"}
        <svg width="150" height="150" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" fill={bg_fill}/>
                <path d="M15.5 4H4.5L2 17L9 19L10 13L11 19L18 17L15.5 4Z" fill={fill} stroke={stroke}/>
        </svg>
    {/if}
    {#if type == "pants"}
        <svg width="150" height="225" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="30" fill={bg_fill}/>
                <path d="M4 2.5L2 17L3 27.5H7L10 7.5L13 27.5H17L18 17L16 2.5H4Z" fill={fill} stroke={stroke}/>
        </svg>
    {/if}
</div>
