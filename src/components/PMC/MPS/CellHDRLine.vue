<template>
    <div class="cellHDRLine">
        <small>
            {{data}}
        </small>
    </div>
</template>

<script>
export default {
    props:{
        data:String
    }
}
</script>

<style scoped>
.cellHDRLine {
    border-color: rgba(43, 56, 56, 0.63);
    border-width: 1px;
    /* border-style: solid; */
    border-style: outset;
    background-color:rgb(8, 71, 5);
    height: 50px;
    width: 75px;
    text-align: center;
    font-size: 15px;
    font-weight:800;
    color: white;
    
    cursor: pointer;
    margin: 1px;
    padding-top: 0;
}
</style>