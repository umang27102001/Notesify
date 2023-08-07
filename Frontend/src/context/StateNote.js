import NoteContext from "./NoteContext"
import { useState } from "react";
const StateNote=(props)=>{
    const Host="http://localhost:5000"
    const initialNotes= []
      const [notes, setnotes] = useState(initialNotes);
      const [isLogin,setLogin]=useState(false);
      const getNotes=async()=>{
        if(localStorage.getItem("auth-token")===undefined){
          setLogin(false);
        }
        else{
          setLogin(true);
        }
        try{
        const Response=await fetch(`${Host}/api/notes/fetchnotes`,{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "auth-token": localStorage.getItem("auth-token")
          },
        })
        const json=await Response.json();
        setnotes(json.notes);
        }
        catch(e){
          console.log("Error: ",e);
        }
      }
      const addNote=async(Title,Tag,Description)=>{
        try{
        await fetch(`${Host}/api/notes/addnote`,{
          method:"POST",
          headers:{
            "Content-type":"application/json",
            "auth-token": localStorage.getItem("auth-token")
          },
          body:JSON.stringify({Title,Tag,Description})
        })

        const note={
          "_id": "64c0c373381467354174dfc4",
          "user": "64c01ed3450a792d1058b83c",
          "Title": Title,
          "Tag": Tag,
          "Description":Description,
          "Date": "2023-07-26T06:55:47.183Z",
          "__v": 0
        }
          setnotes(notes.concat(note));
        }
        catch(e){
          console.log("Error: "+e);
        }
      }

      const deleteNote=async(id)=>{
      try{
        await fetch(`${Host}/api/notes/deletenote/${id}`,{
          method:"DELETE",
          headers:{
            "Content-Type":"application/json",
            "auth-token": localStorage.getItem("auth-token")
          },
        })
        const newNotes=notes.filter(e=>e._id!==id);
        setnotes(newNotes);
        }
        catch(e){
          console.log("Error: ",e);
        }
      }

      const updateNote=async(id,Title,Tag,Description)=>{
        try{
        await fetch(`${Host}/api/notes/updatenote/${id}`,{
          method:"PUT",
          headers:{
            "Content-type":"application/json",
            "auth-token": localStorage.getItem("auth-token")
          },
          body:JSON.stringify({Title,Description,Tag})
        })
        const newNote=notes.map(e=>{
          if(e._id===id){
            e.Title=Title;
            e.Description=Description;
            e.Tag=Tag;
          }
          return e;
        });
          setnotes(newNote);
        }
        catch(e){
          console.log("Error: ",e);
        }
      }

  return (
    <NoteContext.Provider value={{notes,getNotes,addNote,deleteNote,updateNote,isLogin,setLogin}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default StateNote;
