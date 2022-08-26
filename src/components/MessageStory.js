import React from "react";
import MyMessage from "./messages/MyMessage";
import ContactMessage from "./messages/ContactMessage";


function MessageStory (props){

return(
 
      <>
        <header className='header' > 
         <div className='CurrentContact'>{props.name}</div>
        </header>
        <div className='MessageStory'>
           {props.messageStory.map(story =>{
            if(story.isAuthor){
              return(
              <ContactMessage key={story.id} id={story.id} text={story.messageText}/>
              )
            }else{
              return(
                <MyMessage key={story.id}  id={story.id} text={story.messageText}/>
              )
            }
           })}
           
          
         </div>
         
    </>
          
)}


export default MessageStory;