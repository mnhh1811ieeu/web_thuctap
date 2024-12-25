import axios from "axios";
//require('dotenv/config');
export const fetchDataFromApi=async(url)=>{
    try{
        //const {data}=await axios.get(process.env.BASE_URL+url)
        const {data}=await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`)
        return data;
    } catch(error){
        console.log(error);
        return error;
    }
}
export const fetchDataFromApii = async (url, options = {}) => {
    try {
        const BASE_URL = process.env.REACT_APP_BASE_URL ;

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
export const postData=async(url, formData)=>{
    const {res}= await axios.post(process.env.REACT_APP_BASE_URL + url,formData)
    return res;
}
export const postDataProduct = async (url, formData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${url}`, formData, {
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
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${url}`, formData);
        return response.data; // Đảm bảo trả về dữ liệu chính xác từ response
    } catch (error) {
        console.error("Error in postData:", error.response?.data || error.message);
        throw error; // Ném lỗi để frontend có thể xử lý
    }
};
export const editData= async(url, updateData)=>{
    const {res}= await axios.put(`${process.env.REACT_APP_BASE_URL}${url}`,updateData)
    return res;
}
export const deleteData= async(url)=>{
    const {res}= await axios.delete(`${process.env.REACT_APP_BASE_URL}${url}`)
    return res;
}
export const deleteCartData = async (url) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}${url}`);
        return response.data; // Trả về phần data của response
    } catch (error) {
        console.error("Error in deleteData:", error);
        throw error; // Đẩy lỗi lên để xử lý phía gọi hàm
    }
};
