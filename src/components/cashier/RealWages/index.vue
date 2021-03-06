<template>
	<div>
		<div class="block">
		     <el-date-picker
		       v-model="input.searchRealTime"
		       type="month"
		       placeholder="选择月"
			   value-format="yyyy-MM">
		     </el-date-picker>
			 <el-select v-model="input.searchDepId" placeholder="选择部门">
			     <el-option
			       v-for="item in options"
			       :key="item.value"
			       :label="item.label"
			       :value="item.value">
			     </el-option>
			 </el-select>
			 <el-button type="primary" plain icon="el-icon-search" @click="searchRealWages()">搜索</el-button>
			
			<p class = "center">
				{{this.subyear}}年{{this.submonth}}月工资表
			</p> 	
			
			
			
			<el-table
				:data="result.table"
				border
				style="width: 100%">
				<el-table-column
				  prop="userName"
				  label="姓名">
				</el-table-column>
				<el-table-column
				  prop="deptId"
				  label="部门">
				</el-table-column>
				<el-table-column
				  prop="basicSalary"
				  label="月基本工资">
				</el-table-column>
				<el-table-column
				  prop="realOvertimeBenefitsr"
				  label="加班补助">
				</el-table-column>
				<el-table-column
				  prop="realTimeDedution"
				  label="考勤扣款">
				</el-table-column>
				<el-table-column
				  prop="realTaxPaybale"
				  label="应缴税额">
				</el-table-column>
				<el-table-column
				  prop="realNetPayroll"
				  label="实发工资">
				</el-table-column>
				<el-table-column
				  label="状态">
				  <template slot-scope="scope">
					  <span v-if="scope.row.realActive === 1">已确认</span>
					  <span v-else>待审核</span>
				  </template>
				</el-table-column>
				<el-table-column
				  label="操作"
				  width="180">
				  <template slot-scope="scope">
					<template v-if="scope.row.realActive === 1">
						<el-button size="mini" type="danger" plain @click="re(scope.row.id,0)">取消通过</el-button>
					</template>
					<template v-else>
						<el-button size="mini" type="danger" plain @click="re(scope.row.id,1)">通过</el-button>	
						<el-button size="mini" type="primary" plain @click="edit(scope.row.id)">修改</el-button>
					</template>
				  </template>
				</el-table-column>
				
			  </el-table>
			  
			  <el-dialog
				title="修改员工工资"
				:visible.sync="showupdate"
				:close-on-click-modal="false">
				<!-- 每次重新创建useradd，使得上一次内容不会保留 -->
				<RealWagesUpdate :showupdate.sync="showupdate" :id="updateId" v-if="showupdate" @getTable="getTable"></RealWagesUpdate>
			  </el-dialog>
		</div>
		
		
	
	</div>

</template>

<script>
	import axios from 'axios'
	import RealWagesUpdate from './RealWagesUpdate.vue'
	
	export default {
		name: 'RealWages',
		data(){
			return {
				realDate: '',
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
				input:{
					searchRealTime: '',
					searchDepId:null
				},
				result: {
					table: [],
				},
				query:{
					realTime:'',
					deptId: null
				},
				showupdate:false,
				updateId:0,
				subyear: '',
				submonth: ''
			}
			
		},
		created() {
			
			const nowDate = new Date();
			const date = {
				year: nowDate.getFullYear(),
				month: nowDate.getMonth() ,
			};
			if(date.month === 0){
				date.year = date.year - 1
				date.month = 12
			}
			const newmonth = date.month>10?date.month:'0'+date.month
			let systemDate = date.year + '-' + newmonth 
			this.input.searchRealTime = systemDate
			this.searchRealWages()
		},
		watch:{
	
		},

		methods:{
			searchRealWages(){
				this.query.realTime = this.input.searchRealTime
				this.query.deptId = this.input.searchDepId
				this.subyear = this.query.realTime.substr(0,4)
				this.submonth = this.query.realTime.substr(5,7)
				console.log(this.subyear)
				this.getTable()
			},
			getTable(){
				this.axios.get('/AllRealWages',(res)=>{
					this.result.table = res.data
				},this.query)
				
			},
			edit(id){
				this.updateId = id 
				this.showupdate = true
			},
			re(id,realActive){
				if(realActive === 0){
					this.$alert('此操作将该员工工资审核状态更改为未审核，是否继续','修改员工工资审核状态' , {
					  type:'warning'
					}).then(() =>{
						this.axios.post('/RealWagesUpdate',res => {
							this.getTable()
						},{ id:id, realActive:realActive})
					})
				}else{
					this.axios.post('/RealWagesUpdate',res =>{
						this.getTable()
					},{ id:id, realActive:realActive})
				}
				
			},
		},
		components:{
			RealWagesUpdate
		}
		
	}
</script>

<style scoped>
	.center{
		text-align:center;
		height:50px;
		line-height:50px;
		font-size: 24px;
	}
</style>
