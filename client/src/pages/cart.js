import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import userRequest from '../requestMethods';
import { useHistory,Link } from 'react-router-dom';
import { deleteProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

 console.log(cart);
  const history = useHistory();

  if(!user){
    window.alert("Please Login First");
    history.push("/");
  }

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({});
  
  const  [id,setId] = useState(null);
  const dispatch = useDispatch();
 
  useEffect(() => {

    const createcart = async () => {

      try {

         await userRequest.post("/cart/create-cart", {
          createdBy: user.user.id,

          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            color: item.color,
            size: item.size
          })),
        })
       
      } catch (err) {
        console.log(err);
      }
    }


    const checkcart = async () => {
      try {
        const result = await userRequest.get('/cart/find-cart/' + user.user.id);
       
        if (result) {
           setId(result.data.cart._id);
           await userRequest.patch('/cart/update-cart/' + result.data.cart._id, {
            createdBy: user.user.id,

            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item.quantity,
              color: item.color,
              size: item.size
            })),
          });

         
        }
      } catch (error) {
        if(error.message === 'Request failed with status code 404'){
            createcart();
        }
        
        console.log(error);
      }
    }

   cart.quantity > 0 && checkcart();

  }, [cart,user])





  function loadRazorPay() {
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert('Razorpay failed to load')
    };

    script.onload = async () => {
      try {
        setLoading(true);
       console.log(Object.keys(address).length)
        if(Object.keys(address).length < 10){
          window.alert("Please enter valid address")
          setLoading(false);
        }
        else {
        const res = await userRequest.post("order/create-order", {      
          amount: cart.total + '00',
        });
              
        const { amount, id, currency } = res.data.order;
        const {
          data: { key: razorpaykey }
        } = await userRequest.get('order/get-razorpay-key');
       
        const options = {
          key: razorpaykey,
          amount: amount.toString(),
          currency: currency,
          name: 'example name',
          description: 'example transaction',
          order_id: id,
          handler: async function (response) {
            const result = await userRequest.post('order/pay-order', {
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              address:address,
              createdBy: user.id,
              products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
            
          })),
            status: "successfull"
            });
        
            alert(result.data.msg);

            result.data.msg === "Payment was successful" && history.push("/success", { data: res.data });

          },
          prefill: {
            name: 'example name',
            email: 'email@example.com',
            contact: '111111',

          },
          notes: {
            address: 'example address',
          },
          theme: {
            color: '#80c0f0'
          }
        };
        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

       
        }
      } catch (err) {
        setLoading(false);
      }

    }

    document.body.appendChild(script);

  }

  const deletecart = async () => {    
    try {   
      cart.quantity > 0 && await userRequest.delete('/cart/delete-cart/' + id);
       dispatch(deleteProduct());
      
    }
    catch (error) {
       console.log(error);
    }
    
  }

  return (
    <div className='cart-container'>
      <Navbar />
      <div className='cart-wrapper' style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Your Bag</h1>
        <div className='cart-top'>
        <Link to="/">
          <button className='top-btn' style={{ background: 'black', color: 'white' }}> CONTINUE SHOPPING  </button>
        </Link>  
          <div className='top-texts'>
            <span className='top-text'>Shopping Bag ({cart.quantity})</span>
            <span className='top-text'>Your Wishlist (0)</span>

            {cart.quantity > 0 && <button className='btn' onClick={deletecart} style={{background:'Black',color:'White',padding:'5px',height:'30px',marginLeft:'10px'}} >Delete Cart</button>}

          </div>
          <button className='top-btn' style={{ background: 'transparent', color: 'black' }}>CHECK OUT NOW</button>
        </div>

        <div className='cart-bottom'>
          <div className="cart-info">
            {
             cart.quantity > 0 && cart.products.map( (product,id) => (

                <div className='cart-product' key={id}>

                  <div className='cart-product-detail'>
                    <img src={product.img} style={{ width: '200px' }} alt="product" className="cart-img-f" />
                    <div className='details'>
                      <span><b >Product: </b>{product.title}</span>
                     
                      <span><b>ID: </b>{product._id}</span>
                      <div style={{ background: `${product.color}`, width: '20px', height: '20px', borderRadius: '50%', border:'1px solid black'}}></div>
                      <span><b>Size </b>{product.size}</span>
                    </div>
                  </div>
                  <div className='price-detail'>
                    <div className='product-amount'>
                      <AiOutlinePlusCircle size={20} />
                      <span style={{ fontSize: '24px', margin: '3px' }}>{product.quantity}</span>
                      <AiOutlineMinusCircle size={20} />
                    </div>
                    <span style={{ fontSize: '24px', margin: '3px' }}>Rs {product.price * product.quantity}</span>

                  </div>

                </div>

              ))

            }
          </div>

          <div className='cart-summary'>
            <h1>ORDER SUMMARY</h1>
            <div className='summary-item'>
              <h2>Subtotal</h2>
              <span>{cart.total}</span>
            </div>
            <div className='summary-item'>
              <h2>Estimated shipping</h2>
              <span>Rs 5.90</span>
            </div>
            <div className='summary-item'>
              <h2>Shipping Discount</h2>
              <span>-Rs 5.90</span>
            </div>
            <div className='summary-item'>
              <h2>Total</h2>
              <span>{cart.total}</span>
            </div>
            <div className='summary-item' >
               <input placeholder="Please Enter Your Address"
            onChange={(e)=>setAddress(e.target.value)}
            style={{height:'30px',padding:'10px'}}
            
            >            
            </input>
            </div>
           
          <div className='summary-item'>
     
            <button disabled={loading} onClick={loadRazorPay} style={{height:'40px',padding:'10px',backgroundColor:'Black',color:'white'}}>
              PAY NOW
            </button>
            </div>
            {loading && <div>Loading</div>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart;