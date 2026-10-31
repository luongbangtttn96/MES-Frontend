<template>
  <div style="overflow: auto;">
    <div class="form-inline  justify-content-between mr-2 ml-2">
      <h1>Bom </h1>
      <button class="btn-sm mb-2 mr-sm-2 nutNhan" @click="handeAddProject()">Thêm Dự Án</button>
    </div>
    
      <div style="overflow: auto; height:400px; height:100vh "  >
        <table class="table table-sm table-hover table-striped">
          <thead class="thead-dark" >       
            <tr>   
              <th class="action-column" style="min-height: 80px; min-width: 90px;"> Actions </th>
              <th style="min-height: 80px; min-width:100px"> ID  </th>
              <th style="min-height: 80px; min-width:150px"> <div>PROJECT CODE</div></th>
              <th style="min-height: 80px; min-width:150px"> <div >NAME PROJECT</div></th>
              <th style="min-height: 80px; min-width:150px"> ITEM CODE  </th>
              <th style="min-height: 80px; min-width:300px"><div>DESCRIPTION</div> </th>
              <th style="min-height: 80px; min-width:60px"><div >ACTIVE</div></th>
              <th style="min-height: 80px; min-width:300px"><div >NOTE</div></th>
              <th style="min-height: 80px; min-width:100px"><div >UPDATED</div></th>
            </tr>        
          </thead>
          <tbody>
 
            <itemProject 
            v-for ="project in projects"
              :key="project.id"
              :project="project"
              :code_project="project.code_project" />

          </tbody>
          
        </table>
      </div>

      <base-dailog v-model:active="showfomAddObject"
        :tile="'bổ sung dự án'">
          <FormAddProject />
      </base-dailog>
  </div>
</template>

<script>
//import { PAGE_SIZE, CURRENT_PAGE } from '../../constants';
import { mapActions, mapGetters } from 'vuex';
import itemProject from './view-projectsItem.vue'
import BaseDailog from '../controls/BaseDialog.vue'
import FormAddProject from './formAddProject.vue'
export default {
  data(){
    return {
      showfomAddObject:false,
      ImportProjectsExcle: [], 
      projects: [ ]
    }
  },
  components: {
    itemProject,
    BaseDailog,
    FormAddProject
  },
  computed: {
      ...mapGetters([
          'getListProject'
      ])
    },
  methods: {
        ...mapActions([
            'getListProjectHasPaging',
        ]),
        handeAddProject(){
            this.showfomAddObject=true
        }
        
   },
  created() {
    this.getListProjectHasPaging().then(res=>{
            this.projects=res.Projects
            //console.log(this.projects)
          })
  }
}
</script>

<style>

</style>