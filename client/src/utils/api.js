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
    const {res}= await axios.post(process.env.REACT_APP_BASE_URL + url,formData)
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
export const postDataUser = async (url, formData) => {
    try {
        const response = await axios.post("http://localhost:4000" + url, formData);
        return response.data; // Đảm bảo trả về dữ liệu chính xác từ response
    } catch (error) {
        console.error("Error in postData:", error.response?.data || error.message);
        throw error; // Ném lỗi để frontend có thể xử lý
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
export const fetchDataFromApii = async (url, options = {}) => {
    try {
        const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

        const config = {
            method: options.method || "GET", // Mặc định GET
            headers: options.headers || {},
            body: options.body || null,
        };

        const response = await fetch(BASE_URL + url, config);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching data from API:", error.message || error);
        throw error;
    }
};
