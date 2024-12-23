import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
const Success = () =>{
    const location = useLocation();   
    const data = location.state.data;
      
    return (
        <div className="success">
           {
             `Order has been created successfully. Your order number is ${data.order.id}`
            
           }
          <Link to ="/">
            <button style={{padding:"10px",marginTop:"20px",background:"Black",color:"White"}}>Go to Homepage</button>
            
        </Link> 
        </div>
    )
}

export default Success ;