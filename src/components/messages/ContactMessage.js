import React from "react";

const ContactMessage = (props) => {
return(
    
    <div className='Message'>
            <div className='MessageText'>{props.text}<br></br> {props.id} </div>
           
    </div>
    
    
)

}


export default ContactMessage;