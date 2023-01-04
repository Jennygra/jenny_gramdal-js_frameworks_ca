import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button } from "react-bootstrap";
import Heading from "../layout/Heading";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your name")
    .min(3, "Minimum 3 characters"),
  lastName: yup
    .string()
    .required("Please enter your name")
    .min(4, "Minimum 4 characters"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  subject: yup.string().required("Please choose a subject"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters"),
});

function Contact() {
  const [submitSuccessful, setSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      setSubmit(true);
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading title="Contact us" />
      {submitSuccessful && (
        <div>Thank you, the form was succesfully submitted</div>
      )}
      <br />

      <fieldset>
        <Form.Group>
          <Form.Control
            placeholder="First Name"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Control
            placeholder="Last Name"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Control
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Control
            as="select"
            name="subject"
            {...register("subject", { required: true })}
          >
            <option
              hidden
              selected
              label="Open this to select a subject"
            ></option>
            <option value="product">Product</option>
            <option value="service">Service</option>
            <option value="support">Support</option>
          </Form.Control>
          {errors.subject && <span>{errors.subject.message}</span>}
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Message"
            {...register("message", { required: true })}
          />
          {errors.message && <span>{errors.message.message}</span>}
        </Form.Group>
        <br />
        <Button variant="dark" type="submit">
          Send
        </Button>
      </fieldset>
    </Form>
  );
}

export default Contact;
