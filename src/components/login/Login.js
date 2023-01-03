import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import { Form } from "react-bootstrap";

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      {loginError && <div>{loginError}</div>}
      <fieldset disabled={submitting}>
        <Form.Group>
          <Form.Control
            {...register("username", { required: true })}
            placeholder="Username"
          />
          {errors.username && <div>{errors.username.message}</div>}
        </Form.Group>

        <Form.Group>
          <Form.Control
            {...register("password", { required: true })}
            placeholder="Password"
            type="password"
          />
          {errors.password && <div>{errors.password.message}</div>}
        </Form.Group>
        <button>{submitting ? "Logging in..." : "Login"}</button>
      </fieldset>
    </Form>
  );
}

export default Login;
