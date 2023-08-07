import { React, useContext } from 'react'
import NoteContext from '../context/NoteContext';
 
function Notes(props) {
  const { note, theme, updateNotes, deleted } = props;
  const { getNotes } = useContext(NoteContext);
  const clicBt = () => {
    updateNotes(note);
    getNotes();
  }
  const del = () => {
    if (window.confirm("Do you really want to delete this note?")) {
      getNotes();
      deleted(note._id);
    }
  }
  return (
    <div>
      <div  className="accordion-item my-2 " style={{borderRadius:"3px", border:"none", boxShadow: `0px 0px 7px ${theme === "light" ? "black" : "rgba(189, 189, 189, 0.67)"}` }}>
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            style={{ backgroundColor:theme==="light"?`#b7b7b700`:"rgb(52, 58, 64)", color: theme==="light"?"black":"rgb(189 189 189 / 67%)" ,borderRadius:"0px"}}
            data-bs-toggle="collapse"
            data-bs-target={`#${note._id}`}
            aria-expanded="false"
            aria-controls={note._id}
          >
            <strong>Title</strong>: {note.Title}
          </button>
        </h2>
        <div
          id={note._id}
          className="accordion-collapse collapse"
        style={{backgroundColor:theme==="light"?"gery":"rgba(19, 22, 25, 0.86)",borderRadius:"0px"}}
        >
          <div className="accordion-body" style={{ backgroundColor: theme === "light" ? "#f0f8ff00" : "rgb(106 106 106 / 21%)",color: theme==="light"?"black":"rgb(189 189 189 / 67%)"}}>
            <strong>Description:</strong> <br />
            {note.Description}
            <br /><br />
            <strong>Tag:</strong>
            {note.Tag}
            <div className='noteEditBox mt-3'>
              <button type='button' className="btn btn-sm btn-outline-danger" onClick={del}><i className="far fa-trash-alt"></i></button>
              <button type='button' className="btn btn-sm btn-outline-secondary" onClick={clicBt}><i className="far fa-edit"></i></button>
              
              <button type='button' className="btn btn-sm btn-outline-secondary">Added on: {note.Date}</button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notes
