import { useState } from "react";
import { userClient } from "../clients/api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


function Login() {



//bring in the setter function from the context
const {setUser} = useUser();


const navigate = useNavigate();

  const [form, setForm] = useState({  email: "", password: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form);

    try {
      //send form to our backend

      const { data } = await userClient.post("/login", form);
      console.log(data.user);

      //take the token and store it locally
    localStorage.setItem("token", data.token);

    //save some user data in our state

    setUser(data.user);



    //take the user to a diferent page  
    navigate("/feed")




    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }

    
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        

        <label htmlFor="email">Email:</label>
        <input
          value={form.email}
          onChange={handleChange}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          value={form.password}
          onChange={handleChange}
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
