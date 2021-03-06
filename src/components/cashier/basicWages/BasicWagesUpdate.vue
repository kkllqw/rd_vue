<template>
	<div>
		<el-form 
		:model="ruleForm" 
		:rules="rules" 
		ref="upadteBasicWagesForm" 
		label-width="100px" 
		class="demo-ruleForm">
			<el-form-item label="姓名" prop="userName" >
			    <el-input  v-model="ruleForm.userName" readonly></el-input>
			</el-form-item>
			<el-form-item label="部门" prop="deptId" >
			    <el-input v-model="ruleForm.deptId" readonly></el-input>
			</el-form-item>
			<el-form-item label="工资" prop="basicSalary">
			    <el-input v-model="ruleForm.basicSalary"></el-input>
			</el-form-item>
			<el-form-item>
			    <el-button type="primary" @click="submitForm">提交</el-button>  
			</el-form-item>
		</el-form>
		
	</div>
</template>

<script>
	export default {
		name: 'BasicWagesUpdate',
		props:['id'],
		data(){
			const Validator = (rule,value,callback) => {
				if(!/^[0-9]+([.]{1}[0-9]{0,2}){0,1}$/.test(value)){
					callback(new Error('金额格式不正确'))
				}else{
					callback()
				}
			}
			
			return {
				ruleForm: {
					userId: 0,
					userName: '',
					deptId: '',
					basicSalary: '',
					basicStatus: 1
				},
				rules:{
					basicSalary: [
							{ required: true, message: '请输入金额', trigger: 'blur' },
							{ min: 1, max: 50, message: '长度在 1 到 10 位数', trigger: 'blur' },
							{ validator:Validator , trigger: 'blur'}
						  ]
				}
				
			}
		},
		created() {
			this.ruleForm.userId = this.userId
			this.axios.get('/BasicWagesSearchByUserId',res => {
				this.ruleForm.userId = res.data.userId
				this.ruleForm.userName = res.data.userName
				this.ruleForm.deptId = res.data.deptId
				this.ruleForm.basicSalary = res.data.basicSalary
			},{userId:this.userId})
		},
		methods:{
			
			 submitForm() {
				 this.axios.post('/BasicWagesUpdate',res =>{
					 this.$emit('update:showupdate',false)
					 this.$emit('getTable')
				 },this.ruleForm,this.$refs['upadteBasicWagesForm'])
			 }
		},
	}
</script>

<style scoped>
</style>