
import axios from "axios";
function upload(path,userForm){
    
    const params = new FormData()
    for(let i in userForm){
      params.append(i,userForm[i])
    }
    // console.log('upload 发送到后端的参数: ', params);
    return axios.post(path, params, {
      headers: {
          "Content-Type":"multipart/form-data"
      }
    }).then(res => {
      // console.log('upload 从后端 得到的res: ', res.data);
      return res.data
    })
}
export default upload