import "./politic.css";
import axios from "axios";

const Politic = () => {
  function vale() {
    const m = async () => {
      const data = await axios.get("http://localhost:5000/auth/register");
      // setdat(data.data);
      if (document.getElementById("test")) {
        document.getElementById("test").innerHTML = data.data;
        console.log(data.data);
        console.log(document.getElementById("test"));
      } else {
        console.log("erro");
      }
      // console.log(typeof convert);
    };
    m();
  }
  // console.log(dat);
  // console.log(k);
  return (
    <div>
      <h1>Politic</h1>
      <button onClick={vale}>submit</button>
      <div id="test"></div>
    </div>
  );
};

export default Politic;
