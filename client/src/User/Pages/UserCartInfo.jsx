import React,{useContext, useState} from 'react'
import { GlobalContext } from '../../Context/context'
import { CartContext } from '../CartContext/context'
import { decodeToken } from 'react-jwt'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AppRoute } from '../../App';

export default function UserCartInfo() {

  const [customerAddress,setCustomerAddress]= useState("")
  const [customerContact,setCustomerContact] =useState("")
  const [billingMehtod,setBillingMehtod] =useState([])
  const [account,setAccount] =useState("")


  const { cart_state, cart_dispatch } = useContext(CartContext)
  const { state, dispatch } = useContext(GlobalContext)
  const user = decodeToken(state.token)
  console.log(user)
  const checkout = (e) => {
      const payload = {
          items: cart_state.cart,
          totalBill: total,
          customerAddress,
          customerContact, 
          billingMehtod,
          account,
          customerName: user.username,
          customerEmail: user.email
      }

      console.log(payload)
      axios.post(`${AppRoute}api/create-order`,payload)
      .then((json) =>{
  
        console.log(json.data)
  
        cart_dispatch({
          type:"ADD_TO_CART"
        }) 
      }
       )
    
      .catch(err => console.log(err))
  
  
      Swal.fire({
        title: 'Order Placed Successfully!',
        text: 'Thanks for chooshing Metanoia',
        icon: 'success',
        confirmButtonText: 'Please Check Your Email'
      })
  
      

     
  }
  const checkoutDetails=(e) =>{
    e.preventDefault();
    const payload={
      customerAddress,customerContact,billingMehtod
    }
    console.log(payload)
  }

  const total = cart_state.cart.reduce((accumulator, product) => accumulator + (product.price * product.productQuantity), 0)

  return (

    <>
      <div style={{ color: "burlywood", backgroundColor: "black", textAlign: "center" }}><h2>MY CART</h2></div>
      <div className="container">

        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Image</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Total Price</th>

              </tr>
            </thead>
            <tbody>
   {
    cart_state.cart.map((val,key)=>
    <tr key={key}>
    <th scope="row">{key +1}</th>
    <td >{val.productName}</td>
    <td><img style={{height:'5vh'}} className='img-fluid' src={val.thumbnail}/></td>

 
          <td >{val.productQuantity}</td>
          

     <td >{val.price} {val.priceUnit}</td>
     <td >{val.productQuantity*val.price} {val.priceUnit}</td>
   </tr>
  )
   }
  
  </tbody>
          </table>

        </div>
      </div>
      
      <div className="container bg-light  d-flex justify-content-around align-items-center"  >
                    <h6>Your Total Amount Would be</h6>
                    <p>:</p>
                    <div><b>{total} USD</b></div>
                </div>
              
                <br />
                <div className="container"style={{backgroundColor:'burlywood'}}>
      <div className="  flex justify-content-center align-items-center"   >
        <h4 className="mb-3" style={{ color: "burlywood",backgroundColor:'black',textAlign:'center' }}><span>ADD CHECKOUT DETAILS</span> </h4>
       

        <div className="col"style={{backgroundColor:'burlywood'}}>
          <div className='col m-auto 'style={{backgroundColor:'burlywood'}}>
            
      <Form onSubmit={checkoutDetails}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Costumer Address</Form.Label>
        <Form.Control  type="address" placeholder="house#123, stret#123 ,abc city"
        value={customerAddress} onChange={(e)=> setCustomerAddress(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Costumer Contact Number</Form.Label>
        <Form.Control  type="contact" placeholder="03123456789" 
         value={customerContact} onChange={(e)=> setCustomerContact(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
      <Form.Label>Add Account Number</Form.Label> 
      
      <Form.Select value={billingMehtod} onChange={(e)=> setBillingMehtod(e.target.value)} >
      <option style={{color: 'burlywood'}}>Select Payment Method</option>
      <option >COD cash on delivery</option>
      <option >JazzCash / easyPaisa</option>
      <option >Bank Transfer</option>
    </Form.Select>
    </Form.Group>


    <Form.Group className="mb-3">
    <Form.Label>Add Account Number</Form.Label> 
    <InputGroup >
        <InputGroup.Radio  className="form-check-input"
      type="radio"
      name="exampleRadios"
      id="exampleRadios1"
      defaultValue="option1" />
        <Form.Control  aria-label="Text input with radio button" placeholder='Select option and enter your Bank ,JazzCash / easyPaisa Account Details'
       value={account} onChange={(e)=>setAccount(e.target.value)} />
      </InputGroup>
      </Form.Group>
    <Form.Group className="mb-3">
    
  
      </Form.Group>
      <div className='btn btn-dark mb-4' style={{color:"burlywood"}} onClick={checkout}>Checkout</div>
   
    </Form>
    </div>
    </div>
    </div>
    </div>
    </>

  )
}
