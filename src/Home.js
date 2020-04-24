import React from 'react';
import {Link } from 'react-router-dom'
import './Home.css';

const Home =() =>{ 
    
      return(
        <div className="Homepage">
      <img src="https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="Pizza Pie"></img>
<Link to={`/pizza`}><button>Order Now</button></Link>
 </div>
      )
      };
export default Home;