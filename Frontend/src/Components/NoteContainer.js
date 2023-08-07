import {React,useContext,useState,useEffect,useRef} from 'react'
import NoteContext from "../context/NoteContext";
import Notes from './Notes';
function NoteContainer(props) {
  const {notes,getNotes,deleteNote,updateNote}=new useContext(NoteContext);
  useEffect(() => {
    getNotes()
     // eslint-disable-next-line
  }, [])
    const {theme} = props;
    const [note, setNote] = useState({ "Title": "", "Tag": "", "Description": "" });
    const onChg = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const ref = useRef(null);
    const refModal=useRef(null);
    const updateNotes=(currNote)=>{
      ref.current.click()
      setNote(currNote);
    }
    const updateIt=()=>{
      if(note.Title.length<3||note.Tag.length<3||note.Description.length<5){
        alert("Can not add a note see the critera to add a note!!")
    }
    else{
      ref.current.click();
      updateNote(note._id,note.Title,note.Tag,note.Description);
    }
    }
    const deleted=(id)=>{
      deleteNote(id);
    }
  return (
    <div>
      
      <button type="button" style={{display:"none"}} ref={ref} className="btn btn-outline-success btn-sm " data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="editBtn"> /</button>
            <div className="modal fade"  data-bs-theme={`${theme==="light"?"light":"dark"}`} id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog" >
                    <div className="modal-content" style={{borderRadius:"3px"}}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" style={{color:theme==="light"?"black":"rgb(189 189 189 / 67%)"}} id="editModalLabel">Edit your Notes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="Title" style={{color:theme==="light"?"black":"rgb(189 189 189 / 67%)"}} className="col-form-label">Title:</label>
                                    <input style={{  borderRadius:"3px",backgroundColor: theme === "light" ? "white" : "rgb(181 181 181 / 24%)", boxShadow: "none", border: `0.3px solid ${theme === "light" ? "black" : "rgb(189 189 189 / 67%)"}`, transition: "0.8s" }} type="text" value={note.Title} onChange={onChg} name="Title"className="form-control" id="Title" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Tag" style={{color:theme==="light"?"black":"rgb(189 189 189 / 67%)"}} className="col-form-label">Tag:</label>
                                    <input style={{  borderRadius:"3px",backgroundColor: theme === "light" ? "white" : "rgb(181 181 181 / 24%)", boxShadow: "none", border: `0.3px solid ${theme === "light" ? "black" : "rgb(189 189 189 / 67%)"}`, transition: "0.8s" }} type="text" value={note.Tag}  onChange={onChg} name="Tag"className="form-control" id="Tag" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Description" style={{color:theme==="light"?"black":"rgb(189 189 189 / 67%)"}} className="col-form-label">Description:</label>
                                    <textarea  value={note.Description} onChange={onChg} 
                                    style={{  borderRadius:"3px",backgroundColor: theme === "light" ? "white" : "rgb(181 181 181 / 24%)", boxShadow: "none", border: `0.3px solid ${theme === "light" ? "black" : "rgb(189 189 189 / 67%)"}`, transition: "0.8s" }} name="Description"className="form-control" id="Description"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refModal} style={{display:"none"}} className="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal" onClick={updateIt}></button>
                            <button type="button" className="btn btn-sm btn-outline-secondary"  onClick={updateIt}>Save Changes</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        <div className="accordion" id="notesAccordion">
        {notes.map((e) => {
            return <Notes deleted={deleted} updateNotes={updateNotes} theme={theme} note={e} key={new Date()+Math.random()*100} />;
          })}
        </div>
    </div>
  )
}

export default NoteContainer
