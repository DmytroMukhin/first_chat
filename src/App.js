
import axios from 'axios';
import React, { useState, useMemo, useEffect, } from 'react';
import './App.css';
import Contact from './components/Contact';
import MessageStory from './components/MessageStory';






function App() {
  const [contacts, setContacts] = useState([
    {
      name: 'Peter', messageStory: [
         {messageText: 'Hi', id: "2020-10-01 21:21:27", isAuthor: true},
         {messageText: "Hello", id:"2020-10-01 21:22:48", isAuthor: false}
      ]
  },
  {
    name: 'Monica', messageStory: [
      {messageText: 'What you doing now', id: "2020-10-07 21:51:27", isAuthor: true},
      {messageText: "Watching Netflix ", id:"2020-10-07 21:52:28", isAuthor: false}
    ]
  },
  {
    name: 'Jenifer', messageStory: [
      {messageText: ' go to chill', id: "2020-10-10 20:21:27", isAuthor: true},
      {messageText: "why not", id:"2020-10-10 20:22:28", isAuthor: false}
    ]
  },
  {
    name: 'Simon', messageStory: [
      {messageText: 'man, go play football', id: "2020-10-13 15:19:27", isAuthor: true},
      {messageText: "give me 5 minutes", id:"2020-10-13 13:22:28", isAuthor: false}
    ]
  },
  {
    name: 'Bruce', messageStory: [
      {messageText: 'hi, what`s up', id: "2020-10-16 18:10:27", isAuthor: true},
      {messageText: "not much, just eatting cookies", date:"2020-10-16 18:12:28", isAuthor: false}
    ]
  }])

    
 let [messageStory, setMessageStory]= useState([
        {messageText: 'Hi', id: "2020-10-01 21:21:27", isAuthor: true},
        {messageText: "Hello", id:"2020-10-01 21:22:48", isAuthor: false}
    ])
  
  
 let localContacts =  JSON.parse(localStorage.getItem('contacts'))|| contacts

 const [messageText, setMessageText]= useState('')
 const [searchContacts, setSearchContacts]= useState('')
 const [currentContact, setCurrentContact] = useState('messageStory')
 useEffect(()=> {
   localStorage.setItem('contacts', JSON.stringify(contacts))
   console.log(JSON.parse(localStorage.getItem('contacts')))
  } , [contacts])
   
   
 const ChangeMessageStory = (name, story) =>{
    
    setCurrentContact(name)
    setMessageStory(story)
   }


 const AddNewMessage=()=>{
    const newMessage ={
      isAuthor: false,
      id: new Date().toLocaleString(),
      messageText
    }
   
    setMessageStory([...messageStory, newMessage])
    setContacts(prevState => {
     
      return prevState.map((contact,index) => {
          if (contact.name !== currentContact) {
              return {...contact}
          } else {
              return {...contact, messageStory:[...contacts[index].messageStory, contact.messageStory, newMessage]}
          }
      })
    })
   
    setMessageText('')
    setTimeout( getAnswer,6000)
    
  }

 async function getAnswer(){
   const response = await axios.get('https://api.chucknorris.io/jokes/random')

   const newAnswer= {
   isAuthor: true,
   id: new Date().toLocaleString(),
   messageText: response.data.value
   }
 
   setMessageStory(prevState => [...prevState, newAnswer])
 
   setContacts(prevState => {
     return prevState.map((contact, index) => {
      if (contact.name !== currentContact) {
          return {...contact}
      } else {
          
          return {...contact, messageStory: [...contacts[index].messageStory, contact.messageStory, newAnswer]}
      }
     })
    })
 
  }
  

 const sortedContacts = useMemo(() => {
  return localContacts.filter(contact => contact.name.toLocaleLowerCase().includes(searchContacts))
  }, [searchContacts, localContacts])

  return (
    <div className='Wrapper'>
       <div className='ContactsBlock'>
         
          <div className='Search'>
            <input 
            className='InputSearch' 
            placeholder='Search'
            type='text'
            value={searchContacts}
            onChange={e=> setSearchContacts(e.target.value)}
            />
            
          </div>
          <div className='Contacts'>
            Chats:
            {sortedContacts.map(contact =>
            <Contact 
            key={contact.name}
            name={contact.name} 
            ChangeMessageStory={ChangeMessageStory}
            messageStory= {contact.messageStory}
            />)}
            
          </div>
       </div>
       
       
       
       <div className='MessagesBlock'>
          <MessageStory 
              name={currentContact} 
              messageStory={messageStory}
            /> 
         
      
        
         <div className='SendMessageContainer'>
           <input 
           value={messageText}
           className='SendMessage'
           onChange={e=> setMessageText(e.target.value)}
           type='text' 
           placeholder='type message'/>
           <button 
           className='SendMessageBtn' 
           onClick={AddNewMessage}
           >send</button>
         </div>
       </div>
    </div>
  );
}

export default App;
