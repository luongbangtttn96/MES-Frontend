<template>
  <div class="pagination">
    <a href="#">1</a>
    <a href="#">-</a>
    <a href="#">{{ pageNum }}</a>
    <a href="#" @click="handMoredataNextPageClick()">&raquo;</a>
</div>
</template>

<script>
export default {
props:{
    pageNum:{ type: Number, default:1},
    value:{
      type: Number,
      default:1
    }
    
},
methods:{
    handMoredataNextPageClick(){
        this.$emit("update")
    }
},
}
</script>

<style>
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  border-style: solid;
  border-color: dimgray;
}
</style>