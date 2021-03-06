import { Loading, Message } from 'element-ui'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8080'
export default{
	get(url,callback,params= {}){
		let loading = Loading.service({
			 lock: true,
			 text: '拼命加载中......',
			 spinner: 'el-icon-loading',
			 background: 'rgba(255,255,255, 0.7)'
		})
		axios.get(url,{
			params: params
		}).then(res =>{
			if(res.data.code === 200){
				callback(res.data)
			}else{
				Message.error(res.data.message)
			}
		}).catch(error =>{
			Message.error(res.data.message)
		}).finally(() =>{
			loading.close()
		})
	},
	post(url,callback,params,formName = null){
		let request = () => new Promise((resolve,reject) => {
			//这里需要让第二个if等第一个执行结束再执行，涉及同步问题
			if(formName){
			  formName.validate((valid) => {
				 resolve(valid)
			  })
			}else{
				resolve(true)
			}
		})
		request().then(res => {
			if(res){
				//调用后端
				const formData = new FormData()
				for(let key in params){
					formData.append(key,params[key])
				}
				let loading = Loading.service({
					 lock: true,
					 text: '拼命提交中......',
					 spinner: 'el-icon-loading',
					 background: 'rgba(255,255,255, 0.7)'
				})
				axios.post(url,formData).then(res =>{
					if(res.data.code === 200){
						callback(res.data)
					}else{
						Message.error(res.data.message)
					}
				}).catch(error =>{
					console.log(error)
					Message.error(res.data.message)
				}).finally(() =>{
					loading.close()
				})
			}
		})
	}
}