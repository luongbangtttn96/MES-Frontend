<template>
  <div>
    <table class="table table-striped">
        <thead>
            <th>No</th>
            <th>PROJECT</th>
            <th>PART Num</th>
            <th>Qty</th>
            <th>Stock</th>
            <th>DK mua</th>
        </thead>
        <tbody>
            <tr v-for="(item, index) in dataDemandOfGroupMaterial" :key="index">
                <td>{{index +1}} </td>
                <td>{{ item.PROJ_NAME}}</td>
                <td> {{item.PART_NUM}} </td>
                <td> {{item.QTY}} </td>
                <td>{{item.QTY_STOC}} </td>
                <td>{{item.PROPOSED_DATE_PO}} </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
props:{
    dataDemandOfGroupMaterial: { 
        type: Array,
        default: null
    }
}
}
</script>

<style>

</style>