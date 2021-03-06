<template>
	<div>
		<div class="filter">
			<el-input v-model="input.searchName" placeholder="根据姓名查询"></el-input>

			<el-select v-model="input.searchDepId" placeholder="根据部门查询">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			  
			<el-button type="primary" plain icon="el-icon-search" @click="searchUser()">搜索</el-button>
		</div>
		<el-table
			ref="singleTable"
			height="400px"
		    :data="result.table"
		    style="width: 100%">
			<el-table-column
				label="姓名"
				prop="userName"
			></el-table-column>
			<el-table-column
				label="部门"
				prop="deptId"
			></el-table-column>
			<el-table-column
				label="基本工资"
				prop="basicSalary"
			></el-table-column>
			
			<el-table-column
				width="300"
				label="操作"
			>
			<template slot-scope="scope">
			<el-button size="mini" type="primary" plain @click="edit(scope.row.userId)">修改</el-button>		
			</template>
			</el-table-column>
			
		</el-table>
		
		<el-pagination
		  background
		  layout="prev, pager, next"
		  :current-page.sync="query.pageNo"
		  :page-size="result.pages">
		</el-pagination>

		<el-dialog
		  title="修改基本信息"
		  :visible.sync="showupdate"
		  :close-on-click-modal="false">
		  <!-- 每次重新创建useradd，使得上一次内容不会保留 -->
 		  <BasicWagesUpdate :showupdate.sync="showupdate" :id="updateId" v-if="showupdate" @getTable="getTable"></BasicWagesUpdate> 
 		</el-dialog> 
	</div>
</template>

<script>
	import axios from 'axios'
	import BasicWagesUpdate from './BasicWagesUpdate.vue' 
	
	export default {
		name: 'BasicWages',
		data(){
			return {
				query: {
					pageNo: 1 ,
					pageSize: 1,
					userName:'',
					depId: null
				},
				result: {
					table: [],
					pages: 0
				},
				input:{
					searchName: '',
					searchDepId:''
				},
				showadd: false,
				showupdate:false,
				updateId:0,
				 options: [{
				          value: '1',
				          label: '部门1'
				        }, {
				          value: '2',
				          label: '部门2'
				        }, {
				          value: '3',
				          label: '部门3'
				        }, {
				          value: '4',
				          label: '部门4'
				        }, {
				          value: '5',
				          label: '部门5'
				        },{
				          value: null,
				          label: '全部部门'
				        }],
				 value: ''
			}
			
		},
		created() {
			this.getTable()
		},
		watch:{
			//监听query中的数据变化进行查询,开启深度监听
			query:{
				handler(newval,oldval){
					this.getTable()
				},
				deep:true
			}
		},

		methods:{
			getTable(){
				this.axios.get('/BasicWages',(res)=>{
					this.result.table = res.data.records
					this.result.pages = res.data.pages
				},this.query,{pageNo:this.query.pageNo,pageSize:this.query.pageSize})
				
			},
			searchUser(){
				this.query.userName = this.input.searchName
				this.query.depId = this.input.searchDepId
			},
			edit(userId){
				this.updateId = userId 
				this.showupdate = true
			}
		},
		components:{
			BasicWagesUpdate
		}
		
	}
</script>

<style scoped>
	.filter .el-input{
		width: auto;
	}
</style>
