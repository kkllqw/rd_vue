<template>
<dev>
	<el-container class="warp">
	  <el-header class="header">
		  <h1>欢迎来到东软睿道财务子系统</h1>
	  </el-header>
	  <el-container>
	    <el-aside class="aside" width="180px">
			<mainmenu></mainmenu>
		</el-aside>
	    <el-main>
			<router-view/>
		</el-main>
	  </el-container>
	</el-container>
</dev>
</template>

<script>
  import mainmenu from '@/components/menu/mainmenu.vue'
  export default {
    name: 'Index',
    data () {
    
    },
    components:{
	  mainmenu
    },
		methods:{
			 submitForm() {
				 this.axios.get("/BasicWages/1/5",(res) =>{
					console.log(res)
				 })
			 }
		},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.warp{
		height: 100%;
	}
	.warp .header{
		border-bottom: 1px solid #999;
	}
	.warp .header h1{
		height: 60px;
		line-height: 60px;
		margin: 0;
	}
</style>
