import React, {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios";
import { Link } from 'react-router-dom'


const formSchema = yup.object().shape({
    name: yup.string().required("Need a name").min(2,'name must be at least 2 characters'),
    topping1:yup.boolean().oneOf([true], "Please pick a topping"), 
    topping2:yup.boolean().oneOf([true], "Please pick a topping"), 
    topping3:yup.boolean().oneOf([true], "Please pick a topping"), 
    topping4:yup.boolean().oneOf([true], "Please pick a topping"),
    size: yup.string(), 
    instructions: yup.string().required("N/A"),
});

const Pizza = props => {
const [disable, setDisable] = useState(false);  
const [box, setBox] = useState({
    name: '',
    topping1: '',
    topping2: '',
    topping3: '',
    topping4: '',
    size: '',
    instructions: '',
});

const[error, setError] = useState({
    name: '',
    topping1: '',
    topping2: '',
    topping3: '',
    topping4: '',
    size: '',
    instructions: '',
});

const [post, setPost] = useState([])

 useEffect(() => {
         formSchema.isValid(box)
   .then(pressed => {
       setDisable(!pressed);
 })
 },[box])

const validateChange = event => {
    yup.reach(formSchema, event.target.name)
    .validate(event.target.value)
    .then(pressed => {
        setError({
            ...error,[event.target.name] : ""
        });
    })
    .catch(err => {
        setError({
            ...error, [event.target.name] : err.errors[0]
        });
    })
};

const inputChange = event =>{
    event.persist();
        const newFormData = {
            ...box, [event.target.name] : 
            event.target.type === "checkbox" ? event.target.checked : event.target.value
        };
    setBox(newFormData);
 validateChange(event);
};
const submitForm = event => {
        event.preventDefault();
        axios
              .post("https://reqres.in/api/users", box)
              .then(res => {
                setPost(res.data); 
                console.log("success", post);
            
                setBox({
                  name: '',
                  topping1: '',
                  topping2: '',
                  topping3: '',
                  topping4: '',
                  size: '',
                  instructions: '',
                });
              })
              .catch(err => console.log(err.response));
    
}

    return( 
<div className="pizza-list">           
<form onSubmit={submitForm}>

<Link to={`/`} >Home</Link>

    <label htmlFor="name">Name: {error.name.length > 0 ? <p className="error">{error.name}</p> : null} </label>
        <input 
            id="name" 
            type="text" 
            name="name" 
            onChange={inputChange}
            placeholder="Name"
            value={box.name} required/>
        
    <label htmlFor="topping1" className="topping1">    
        <input
        type = "checkbox"
        name="topping1"
        onChange={inputChange}
        checked={box.topping1} />
        Pepperoni
        </label>

    <label htmlFor="topping2" className="topping2">    
        <input
        type = "checkbox"
        name="topping2"
        onChange={inputChange}
        checked={box.topping2} />
        Mushrooms
        </label>

    <label htmlFor="topping3" className="topping3">    
        <input
        type = "checkbox"
        name="topping3"
        onChange={inputChange}
        checked={box.topping3} />
        Onions
        </label>

    <label htmlFor="topping4" className="topping4">    
        <input
        type = "checkbox"
        name="topping4"
        onChange={inputChange}
        checked={box.topping4} />
        Sausage
        </label>  

    <label htmlFor="size">
        Please pick a size
        <select id="size" name="size" onChange={inputChange}>
          <option value="personal">Personal Size 8"</option>
          <option value="small">Small Size 10"</option>
          <option value="medium">Medium Size 12"</option>
          <option value="large">Large Size 14"</option>
        </select>
      </label>

      <label htmlFor="instructions">
      Special instructions!
        <textarea
          name="instructions"
          value={box.instructions}
          onChange={inputChange}
        />
      </label>

        <pre>{JSON.stringify(post, null, 2)}</pre>
        <button disabled={disable} type="submit">Place Order</button>

    </form>  
        </div>
    );
}

export default Pizza;