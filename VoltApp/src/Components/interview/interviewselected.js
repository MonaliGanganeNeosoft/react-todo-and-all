
import { useState } from "react";

export default function interviewselected() {
  const [values, setValues] = useState({
    name: "",
    email: ""
  });
  const [allData, setAllData] = useState([]);
  console.log("allData", allData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailSame = allData.find((vals) => vals.email === values.email);
    console.log("emails", emailSame);
    
    if (emailSame) {
      window.alert("errors");
    } else {
      setAllData([...allData, values]);
      setValues({ name: "", email: "" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">submit</button>
      </form>
      <div>
        {allData.map((val, i) => {
          return (
            <p key={i}>
              name: {val.name} and email: {val.email}
            </p>
          );
        })}
      </div>
    </div>
  );
}
