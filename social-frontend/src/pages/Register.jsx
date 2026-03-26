import { useState } from "react";
import { userClient } from "../clients/api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Register() {
  // const value = useUser();
  // console.log(value);

  //bring in the setter function from the context
  const { setUser } = useUser();
  //console.log(setUser);

  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", email: "", password: "" });

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

        // const response = await userClient.post("/register", form);
        // console.log(response);

      const { data } = await userClient.post("/register", form);
      console.log(data);

      //take the token and store it locally
      localStorage.setItem("token", data.token);

      //save some user data in our state

      setUser(data.user);

      //take the user to a diferent page
      navigate("/feed");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          value={form.username}
          onChange={handleChange}
          id="username"
          name="username"
          type="text"
          autoComplete='username'
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          value={form.email}
          onChange={handleChange}
          id="email"
          name="email"
          type="email"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          value={form.password}
          onChange={handleChange}
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
