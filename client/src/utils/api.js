import axios from "axios";
//require('dotenv/config');
export const fetchDataFromApi=async(url)=>{
    try{
        //const {data}=await axios.get(process.env.BASE_URL+url)
        const {data}=await axios.get("http://localhost:4000"+url)
        return data;
    } catch(error){
        console.log(error);
        return error;
    }
    
}
export const postData=async(url, formData)=>{
    const {res}= await axios.post("http://localhost:4000" + url,formData)
    return res;
}
export const postDataProduct = async (url, formData) => {
    try {
        const response = await axios.post("http://localhost:4000" + url, formData, {
            headers: { "Content-Type": "multipart/form-data" }, // Đảm bảo đúng Content-Type cho formData
        });
        return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
        console.error("Error in postData:", error.response || error.message);
        throw error; // Ném lỗi để xử lý bên ngoài nếu cần
    }
};
export const editData= async(url, updateData)=>{
    const {res}= await axios.put(`http://localhost:4000${url}`,updateData)
    return res;
}
export const deleteData= async(url)=>{
    const {res}= await axios.delete(`http://localhost:4000${url}`)
    return res;
}
