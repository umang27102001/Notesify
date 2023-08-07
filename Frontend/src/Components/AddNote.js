import React, { useState } from 'react'
import { useContext } from 'react';
import NoteContext from '../context/NoteContext';
import NoteContainer from './NoteContainer';
import '../About.css'; 
function AddNote(props) {
    const { addNote, getNotes } = new useContext(NoteContext);
    const { theme } = props
    const [note, setNote] = useState({ "Title": "", "Tag": "", "Description": "" });
    const onChg = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const clickHand = (e) => {
        e.preventDefault();
        if (note.Title.length < 3 || note.Tag.length < 3 || note.Description.length < 5) {
            alert("Can not add a note see the critera to add a note!!")
        }
        else {
            addNote(note.Title, note.Tag, note.Description);
            getNotes();
            setNote({"Title":"","Tag":"","Description":""})
        }
    }
    return (
        <div>
            <div className='box-box mt-4 comp-fade-in-up' style={{
                transition: "0.5s", padding: "10px 20px 15px 20px",
                borderRadius: "3px",
                
                background: `${theme === "light" ? "rgb(201 246 255 / 0%)" : "#343a40"}`, boxShadow: `${theme === "light" ? "black" : "rgba(189, 189, 189, 0.67)"} 0px 0px 5px`
            }}> <h2 className="mt-3" style={{ color: theme === "light" ? "black" : "rgb(189 189 189 / 67%)" }}> Add your Notes below!</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="Title"  style={{color:theme==="light"?"black":"rgb(189 189 189 / 67%)"}}>Title</label>
                        <input
                            type="Title"
                            style={{  borderRadius:"3px",backgroundColor: theme === "light" ? "white" : "rgb(181 181 181 / 24%)", boxShadow: "none", border: `0.3px solid ${theme === "light" ? "black" : "rgb(189 189 189 / 67%)"}`, transition: "0.8s" }}
                            className="form-control"
                            id="Title"
                            name='Title'
                            value={note.Title}
                            aria-describedby="Title"
                            placeholder="Enter Title"
                            onChange={onChg}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Tag"  style={{color:theme==="light"?"black":"rgb(189 189 189 / 67%)"}} >Tag</label>
                        <input
                            style={{  borderRadius:"3px",backgroundColor: theme === "light" ? "white" : "rgb(181 181 181 / 24%)", boxShadow: "none", border: `0.3px solid ${theme === "light" ? "black" : "rgb(189 189 189 / 67%)"}`, transition: "0.8s" }}
                            type="text"
                            value={note.Tag}
                            className="form-control"
                            id="Tag"
                            name='Tag'
                            placeholder="Enter the tag"
                            onChange={onChg}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Description"  style={{color:theme==="light"?"black":"rgb(189 189 189 / 67%)"}} >Description</label>
                        <textarea value={note.Description} placeholder='Enter the Description here' style={{  borderRadius:"3px",backgroundColor: theme === "light" ? "white" : "rgb(181 181 181 / 24%)", boxShadow: "none", border: `0.3px solid ${theme === "light" ? "black" : "rgb(189 189 189 / 67%)"}`, transition: "0.8s" }} className="form-control" id="Description" onChange={onChg} name='Description' rows="3"></textarea>
                    </div>
                    <div className="form-group mt-2">
                        <button type="submit" className="btn btn-sm btn-outline-secondary" onClick={clickHand}>
                            Add Note
                        </button>
                    </div>
                </form></div>
            <div className="container my-5">
                <h2 style={{ color: theme === "light" ? "black" : "rgb(189 189 189 / 67%)" }}>Your Notes</h2>
                <NoteContainer theme={theme} />
            </div>
        </div>
    )
}

export default AddNote
