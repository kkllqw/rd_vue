<template>
	<el-menu
	      default-active="1"
	      class="el-menu-vertical-demo"
	      background-color="#545c64"
	      text-color="#fff"
	      active-text-color="#ffd04b"
		  :router="true">
	      <el-submenu index="1">
			  <template slot="title">
				<i class="el-icon-location"></i>
				<span>出纳模块</span>
			  </template>
			  
			  <el-menu-item index="/basicWages">
				<i class="el-icon-user-solid"></i>
				<span>基本工资</span>
			  </el-menu-item>
			  
			  <el-menu-item index="/realWages">
				<i class="el-icon-s-custom"></i>
				<span>月工资</span>
			  </el-menu-item>
	    </el-submenu>
		<el-submenu index="2">
			  <template slot="title">
				<i class="el-icon-location"></i>
				<span>会计模块</span>
			  </template>
			  
			  <el-menu-item index="/role">
				<i class="el-icon-user-solid"></i>
				<span>凭证管理</span>
			  </el-menu-item>
			  
			  <el-menu-item index="/role">
				<i class="el-icon-s-custom"></i>
				<span>资产管理</span>
			  </el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
	export default {
		name: 'mainmenu',
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.el-menu-vertical-demo{
		height: 100% ;
		overflow: hidden;
	}
</style>

