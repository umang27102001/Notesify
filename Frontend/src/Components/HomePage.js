import { React } from "react";
import AddNote from "./AddNote";
function HomePage(props) {
  const {theme} = props;
  return (<>
    <div className="container">
      <AddNote theme={theme}/>
    </div>
    </>
  );
}

export default HomePage;
