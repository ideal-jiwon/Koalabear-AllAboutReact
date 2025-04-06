import Button from "./src/Button";
import styles from "./App.modules.css";
import { useState, useEffect } from "react";


function Hello(){
  /*one way to show the creation and destroy of the component*/
  useEffect (() => {console.log("Created"); 
  return () => console.log("Destroyed");
  }, []);
  return <h1>Hello</h1>;
/*another way to show the creation and destroy of the component*/
function hiFn(){
  console.log("Hi");
  return byFn;
}
function byFn(){
  console.log("Bye");
}

useEffect (() => {hiFn(); return byFn;}, []);
}


function App() {

  const [count, setCount] = useState(0);
  const onClick = () => setCount((current)=> (current+1));
  console.log("I run all the time");
  /*useEffect( () => {console.log("I run only once")}, []);*/

  const [keyword, setKeyword] = useState("");
  const onChange = (event) => setKeyword(event.target.value);

  /*useEffect (() => {console.log("I run only when the keywords change");
  }, [keyword]);*/

   /*useEffect (() => {console.log("I run only when the count change");
  }, [count]);*/

   /*useEffect (() => {console.log("I run only when the keyword & count change");
  }, [keyword, count]);*/

  const [showing, setShowing] = useState(false);
  const onShow = () => setShowing((current) => !current)

  return (
    <div>

      <h1>Koalabear clicked : {count} </h1>
      <button onClick = {onClick}>ClickMe</button>
      <label htmlfor = "search">Search:</label>
      <input value = {keyword} 
             onChange= {onChange}
             type="text"
             placeholder="Search keyword here">
      </input>
      <div>
      {showing ? <Hello/> : null}
      <button onClick= {onShow}>{showing? "show":"hide"}</button>
      </div>
    </div>
  
  );
}

export default App;
