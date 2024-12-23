import React ,{useState}from 'react';
import Navbar from '../components/navbar'
import Product from '../components/product'
import NewsLetter from '../components/newsletter'
import Footer from '../components/footer';
import { useLocation,useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProductList = ()=>{
    const location = useLocation();
   const user = useSelector((state) => state.user.currentUser);
    const cat = location.pathname.split("/")[2];
    const [filters,setfilter] = useState({});
    const [sort,setSort] = useState("newest");
    const history = useHistory();

  if(!user){
    window.alert("Please Login First");
    history.push("/");
  }

    const handleFilters = (e)=>{
         const value = e.target.value;
         
         setfilter({
            ...filters,
            [e.target.name]:value, 
         })
    }
  
  return (
      <div className='productlist-container'>
           <Navbar/>
           <h1 style={{marginLeft:'20px',marginTop:'10px'}} className="filter-title">{cat}</h1>
           <div className='product-filter-container'>
               <div className='product-filter'>
                    <span className='filter-text'>Filter Products :</span>
                       <select className='filter-select' name="color" onChange={handleFilters}>
                           <option value="DEFAULT" disabled >Color</option>
                           <option value="White">White</option>
                           <option value="Black">Black</option>
                           <option value ="Red">Red</option>
                           <option value ="Blue">Blue</option>
                           <option value="Yellow">Yellow</option>
                           <option value="Green">Green</option>
                       </select>
                       <select name="size" onChange={handleFilters} >
                           <option value="DEFAULT" disabled >Size</option>
                           <option value="XS">XS</option>
                           <option value="S">S</option>
                           <option value="M">M</option>
                           <option value="L">L</option>
                     <option value="XL">XL</option>
                       </select>
               </div>
               <div className='product-filter'>
                    <span className='filter-text'>Sort Products :</span>
                    <select onChange={(e)=>setSort(e.target.value)}>
                        <option value = "newest">Newest</option>
                        <option value = "asc">Price (asc)</option>
                        <option value ="desc">Price (desc)</option>
                    </select>
               </div>
           </div>
           <Product cat={cat} filters={filters} sort={sort}/>
           <NewsLetter/>
           <Footer/>
      </div>
  )
}

export default ProductList ; 