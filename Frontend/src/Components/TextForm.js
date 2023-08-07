import { useState } from "react";
import React from "react";
import '../About.css'; 
export default function TextForm(props) {
  const [text, setText] = useState("");
  const clickUpHandle = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to UpperCase", "success");
    setTimeout(() => {
      props.showAlert(null);
    }, 1500);
  };
  const clickLowHandle = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to LowerCase", "success");
    setTimeout(() => {
      props.showAlert(null);
    }, 1500);
  };
  const clickFirstHandle = () => {
    setText(
      text
        .toLowerCase()
        .replace(text.toLowerCase()[0], text.toLowerCase()[0].toUpperCase())
    );
    props.showAlert("Converted to Sentence Case", "success");
    setTimeout(() => {
      props.showAlert(null);
    }, 1500);
  };
  const changeHandle = (e) => {
    if(e.target.value[0]!==" "){
      setText(e.target.value);
    }
  };
  const clearHandle = () => {
    setText("");
    props.showAlert("Text Cleared", "success");
    setTimeout(() => {
      props.showAlert(null);
    }, 1500);
  };
  const copyHandle = () => {
    let copyText = text;
    navigator.clipboard.writeText(copyText);
    props.showAlert("Text Copied to ClipBoard", "success");
    setTimeout(() => {
      props.showAlert(null);
    }, 1500);
  };
  let extraSpaceHandle = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra Spaces Removed", "success");
    setTimeout(() => {
      props.showAlert(null);
    }, 1500);
  };
  const { theme } = props;
  return (
    <>
      <div className="container">
        <div className="container comp-fade-in-up" style={{
          transition: "0.5s", padding: "10px 20px 15px 20px",
          borderRadius: "3px",

          background: `${theme === "light" ? "rgb(201 246 255 / 0%)" : "#343a40"}`, boxShadow: `${theme === "light" ? "black" : "rgba(189, 189, 189, 0.67)"} 0px 0px 5px`
        }}>
          <h1 style={{ color: props.theme === "light" ? "black" : "rgb(189 189 189 / 67%)" }}>
            {props.head}
          </h1>
          <div className="form-group">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              value={text}
              placeholder="Enter your Text here"
              onChange={changeHandle}
              style={{ borderRadius: "3px", backgroundColor: theme === "light" ? "white" : "rgb(181 181 181 / 24%)", boxShadow: "none", border: `0.3px solid ${theme === "light" ? "black" : "rgb(189 189 189 / 67%)"}`, transition: "0.8s" }}
              rows="6"
            ></textarea>
          </div>
          <button disabled={text.length === 0} className="btn btn-outline-secondary my-2" onClick={clickUpHandle}>
            Convert to Uppercase
          </button>
          <button disabled={text.length === 0} className="btn btn-outline-secondary my-2 mx-3" onClick={clickLowHandle}>
            Convert to Lowercase
          </button>
          <button disabled={text.length === 0}
            className="btn btn-outline-secondary my-2"
            onClick={clickFirstHandle}
          >
            Sentence Case
          </button>
          <button disabled={text.length === 0} className="btn btn-outline-secondary my-2 mx-3" onClick={copyHandle}>
            Copy Text
          </button>
          <button disabled={text.length === 0} className="btn btn-outline-secondary my-2" onClick={extraSpaceHandle}>
            Remove Extra Spaces
          </button>
          <button disabled={text.length === 0} className="btn btn-outline-secondary my-2 mx-3" onClick={clearHandle}>
            Clear Text
          </button>
        </div>
      </div>
      <div className="container my-4 comp-fade-in-up">
        <h3 style={{ color: props.theme === "light" ? "black" : "rgb(189 189 189 / 67%)" }}>
          Your Text Summary
        </h3>
        <p style={{ color: props.theme === "light" ? "black" : "rgb(189 189 189 / 67%)" }}>
          {text.length === 0 ? 0 : text.split(/\s+/).length} words
        </p>
        <h2
          className="my-3"
          style={{ color: props.theme === "light" ? "black" : "rgb(189 189 189 / 67%)" }}
        >
          Preview
        </h2>
        <div style={{ color: props.theme === "light" ? "black" : "rgb(189 189 189 / 67%)" }}>
          {text.length > 0 ? text : "Nothing to preview"}
        </div>
      </div>
    </>
  );
}
