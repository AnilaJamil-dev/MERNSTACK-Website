import React,{useState, useEffect} from 'react'
import axios from 'axios'
// import {BsPencilSquare} from 'react-icons/bs'
import { AppRoute } from '../../App'

export default function Orders() {

    const [orders, setOrders] = useState([])
    useEffect(()=>{
      axios.get(`${AppRoute}api/all-orders`)
      .then((json)=> setOrders(json.data.orders))
      .catch((error) => console.log(error))
    },[])

  return (
   <>
    <div className="container">
        <div className="d-flex justify-content-between align-irems-center bg-secondary p-2 my-3 rounded">
            <span className='fs-4 fw-bold text-white'>Brands</span>
        </div>
        <div className="container">
        <table className="table">
  <thead>
    <tr>
      <th scope="col">Tracking ID</th>
      <th scope="col">Customer Name</th>
      <th scope="col">Address</th>
      <th scope="col">Email</th>
      <th scope="col">Billing Method</th>
      <th scope="col">Status</th>
      <th scope="col">Date</th>
      {/* <th scope="col">Update</th> */}
    </tr>
  </thead>
  <tbody>
    {
    orders.map((val,key)=>
    <tr key={key}>
    <th scope="row">{val._id}</th>
    <td >{val.customerName}</td>
    <td >{val.customerAddress}</td>
    <td >{val.customerEmail}</td>
    <td >{val.billingMehtod}</td>
    <td >{val.Status}</td>
    <td >{val.order_at}</td>

    {/* <td><img style={{height:'5vh'}} className='img-fluid' src={val.brand}/></td> */}
  <td>
  {/* <button className='btn btn-dark mx-4' ><BsPencilSquare/></button> */}
     </td>
   </tr>
  )
   } 
  
  </tbody>
</table>

        </div>
    </div>
   </>
  )
}
