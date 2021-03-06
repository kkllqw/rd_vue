<template>
	<div>
		<el-form 
		:model="ruleForm" 
		:rules="rules" 
		ref="upadteRealWagesForm" 
		label-width="100px" 
		class="demo-ruleForm">
			<el-form-item label="姓名" >
			    <el-input  v-model="ruleForm.userName" readonly></el-input>
			</el-form-item>
			<el-form-item label="部门">
			    <el-input v-model="ruleForm.deptId" readonly></el-input>
			</el-form-item>
			<el-form-item label="月工资" prop="Salary">
			    <el-input v-model="ruleForm.basicSalary"></el-input>
			</el-form-item>
			<el-form-item label="加班补助" prop="Salary">
			    <el-input v-model="ruleForm.realOvertimeBenefitsr"></el-input>
			</el-form-item>
			<el-form-item label="考勤扣款" prop="Salary">
			    <el-input v-model="ruleForm.realTimeDedution"></el-input>
			</el-form-item>
			<el-form-item>
			    <el-button type="primary" @click="submitForm">提交</el-button>  
			</el-form-item>
		</el-form>
		
	</div>
</template>

<script>
	export default {
		name: 'RealWagesUpdate',
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
					id:0,
					userName: '',
					deptId: '',
					basicSalary: '',
					realOvertimeBenefitsr:0,
					realTimeDedution:0,
					realTaxPaybale:0,
					realNetPayroll:0
				},
				rules:{
					Salary: [
							{ required: true, message: '请输入金额', trigger: 'blur' },
							{ min: 1, max: 10, message: '长度在 1 到 10 位数', trigger: 'blur' },
							{ validator:Validator , trigger: 'blur'}
						  ]
				}
				
			}
		},
		created() {
			this.ruleForm.id = this.id
			this.axios.get('/RealWagesById',res => {
				this.ruleForm.userName = res.data.userName
				this.ruleForm.deptId = res.data.deptId
				this.ruleForm.basicSalary = res.data.basicSalary
				this.ruleForm.realOvertimeBenefitsr = res.data.realOvertimeBenefitsr
				this.ruleForm.realTimeDedution = res.data.realTimeDedution
				this.ruleForm.realTaxPaybale = res.data.realTaxPaybale
				this.ruleForm.realNetPayroll = res.data.realNetPayroll
				
			},{id:this.ruleForm.id})
		},
		methods:{
			
			 submitForm() {
				 this.axios.post('/RealWagesUpdate',res =>{
					 this.$emit('update:showupdate',false)
					 this.$emit('getTable')
				 },this.ruleForm,this.$refs['upadteRealWagesForm'])
			 }
		},
	}
</script>

<style scoped>
</style>