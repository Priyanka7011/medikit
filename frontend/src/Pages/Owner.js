import React,{useState} from "react";
import { Link } from "react-router-dom";
import CartItem from "../Components/CartItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt,faPlus,faTimes} from '@fortawesome/free-solid-svg-icons'
import "../CSS/Pharmacy.css";

import { blue, red } from "@material-ui/core/colors";
import { Modal,Card ,Container} from "@material-ui/core"
export default function Owner({ pharmacy,setPharmacies, cart, setCart, }) {
    const [open, setOpen] = useState(false);
    const [formData, updateFormData] = React.useState("");
    
    const handleChange = (e) => {
        updateFormData({
        ...formData,
        
        // Trimming any whitespace
        ['pk']:Math.random(),
        ['image_url']:"https://cdn.pixabay.com/photo/2017/05/11/12/24/nuns-2304009_150.jpg",
        [e.target.name]: (e.target.value.trim())
        });
    };
    const [updateMed,setUpdate]=useState([])
    const DeleteMed=(e)=>{
        const name= e.target.getAttribute("name")
        console.log(name)
        
        setUpdate([])
		
       for (let item of pharmacy.items) {
           if(item.name!==name)
           {
              updateMed.push(item)
           }
        }
	    
        console.log(updateMed)
        pharmacy.items=updateMed
        //setPharmacies(pharmacy.items.filter(item =>  item!== name));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(pharmacy)
        console.log(formData.price)
        formData.price=parseInt(formData.price)
        
        pharmacy.items.push(formData)
        console.log(formData);
        // ... submit to API or something
      };
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
	return (
		<div className="pharmacy-container">
			<div className="container-left">
				{pharmacy &&
					pharmacy.items.map((medItem) => (
						<div >
                            <div>
                                <CartItem
                                cart={cart}
                                item={medItem}
                                />
                        
                            
                            <div style={{paddingRight:'20px',display:'flex',justifyContent:'flex-end'}} >
                            
                                
                                <button name={medItem.name} onClick={DeleteMed} className='custBtn' style={{'backgroundColor':'#ff8886','width':'35px','height':'35px','borderRadius':'50% '}} >
                                <FontAwesomeIcon color='white' icon={faTimes} />
                                </button>
                            </div>
                            </div>
                        </div>
                        
                        
					))}
			</div>
			<div className="container-right">
				<div className="pharmacy-details-container">
					<span className="pharmacy-details-name">
						{pharmacy && pharmacy.placeName}
					</span>
                    <div className='color-band'>
						<p></p>
					</div>
					
					<span className="pharmacy-details-medicine">
						{pharmacy && pharmacy.placeAddress}
					</span>
				</div>
				<div className="goto-cart">
                   <button  style={{'color':'orange','backgroundColor':'#036','marginTop':'20px'}}className='custBtn' type="button" onClick={handleOpen}>
                       <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                     <span style={{marginLeft:'10px'}}>Add New Item</span>
                    </button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                          <Container style={{display:'flex',justifyContent:'center'}}>
                                <Card style={{width:'50%',marginTop:'100px',padding:'10px 40px'}}>
                                <div >
                                        <h2 style={{alignItems:'center'}} id="simple-modal-title">Add New Item</h2>
                                        <hr></hr>
                                        <div id="simple-modal-description">
                                            <p>Add details of medicine </p>
                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'10px'}}>
                                                <label for='image'>Image :</label>
                                                <input class='formInput' name='image' type='file'></input>
                                            </div>
                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'10px'}}>
                                                <label for='Name'>Name :</label>
                                                <input onChange={handleChange} class='formInput' name='name'></input>
                                            </div>
                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'10px'}}>
                                                <label for='Price'>Price :</label>
                                                <input onChange={handleChange} class='formInput' name='price' placeholder='Rs'></input>
                                            </div>
                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'10px'}}>
                                                <label for='qty'>Quantity :</label>
                                                <input onChange={handleChange} class='formInput' name='amount' ></input>
                                            </div>
                                            
                                            <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                                                <button onClick={handleSubmit} style={{backgroundColor:'#036',color:"white",marginRight:'10px'}} className='custBtn'>
                                                    Save Item
                                                </button>
                                                <button onClick={handleClose} className='custBtn' style={{backgroundColor:'#ff6963',color:"white"}} >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                          </Container> 
                        
                    </Modal>

				</div>
			</div>
		</div>
	);
}
