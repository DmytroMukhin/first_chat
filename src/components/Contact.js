import React from "react";



    

function Contact (props){
      
    

    return(
        <div className='Contact' onClick={()=> props.ChangeMessageStory(props.name, props.messageStory )} >
              <div className='Icon'/>
              {props.name}
            </div>
    )
}


export default Contact;