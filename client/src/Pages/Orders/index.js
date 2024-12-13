import React, {useEffect} from 'react'
import { fetchDataFromApi } from '../../utils/api';
import { MyContext } from '../../App';



const Orders = () => {

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [])

    // const handldeChange = (event, value) => {
    //     MyContext.setProgress(40);
    //     setPage(value)
    //     fetchDataFromApi(``).then( (res) => {
    //         MyContext.setProgress(100)
    //         window.scrollTo({
    //             top: 200,
    //             behavior: "smooth"
    //         })
    //     })
    // }
    
  return (
    <section className="section">
        <div className='container'>
            <h2 className='hd'>Orders</h2>

            <div className='table-responsive'>
                <table className='table table-striped'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Payment Id</th>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Phone num</th>
                            <th>Add</th>
                            <th>Pincode</th>
                            <th>Total amount</th>
                            <th>Email</th>
                            <th>User id</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>

            {
                // orders?.ordersList?.totalPages > 1 && 
                // <div className='d-flex tablefooter'>
                //     <Pagination count={orders?.ordersList?.totalPages} color="primary" 
                //     className="panigation" showFirstButton showLastButton onChange={handldeChange} />
                // </div>
            }
        </div>
    </section>
  )
}

export default Orders