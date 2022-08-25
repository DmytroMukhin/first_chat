import React from "react";

const MyMessage = (props) => {
return(
    
    <div className='MyMessage'>
            <div className='MyMessageText'>{props.text}<br></br> {props.id}</div>
            
    </div>
    
    
)

}


export default MyMessage;