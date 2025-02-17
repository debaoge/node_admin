import axios from "axios";
function upload(path,userForm){
    console.log('表单验证通过，提交数据:', userForm);
    const params = new FormData()
    for(let i in userForm){
      params.append(i,userForm[i])
    }
    console.log('发送到后端: ', params);
    
    return axios.post(path, params, {
      headers: {
          "Content-Type":"multipart/form-data"
      }
    }).then(res => res.data)
}
export default upload