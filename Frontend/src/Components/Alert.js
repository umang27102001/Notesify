import React from "react";
export default function Alert(props) {
  return (
    <div className="container my-3" style={{height:"50px"}}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.status} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{props.alert.status}</strong> {props.alert.message}
        </div>
      )}
    </div>
  );
}
