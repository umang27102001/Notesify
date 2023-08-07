import React, { useState } from 'react'
import TextForm from "./TextForm";
import Alert from './Alert';
function Tools(props) {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, status) => {
    setAlert({
      status: status,
      message: message,
    });
  };

  return (
    <div>
      <Alert alert={alert} />
      <TextForm theme={props.theme} head="Enter Text Below" showAlert={showAlert} />
    </div>
  )
}

export default Tools
