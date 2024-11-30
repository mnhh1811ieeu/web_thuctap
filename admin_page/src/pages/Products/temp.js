const [editId, setEditId] = useState('');
const deleteItem = (id) => {
    deleteData(`/api/productSIZE/${id}`).then( (res) => {
        fetchDataFromApi( "/api/productSIZE").then( (res) => {

            setProductSizeData(res);
        })
    })
}
const updateData = (id) => {
    fetchDataFromApi( `/api/productSIZE/${id}`).then( (res) => {
        setEditId(id);
        setFormFields( {
            productSIZE: res.productSIZE
        })
    })
}
if( setEditId === ""){
    postData('/api/productSIZE/create', formFields).then((res) => {
        context.setAlertBox({
            open: true,
            msg: 'Đã tạo sản phẩm thành công',
            error: false
        });
        setIsLoading(false);
        setFormFields( {
            productSIZE: ''
        })

        fetchDataFromApi( "/api/productSIZE").then( (res) => {
            setProductSizeData(res);
        })
        // history('/product/list');
    })
}else{
    editData(`/api/productSIZE/${editId}`, formFields) .then( (res) => {
        fetchDataFromApi( "/api/productSIZE").then( (res) => {
            setProductSizeData(res);
            setEditId("");
        })
    });
}