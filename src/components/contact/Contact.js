import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";

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
      <h2>Contact us</h2>
      {submitSuccessful && (
        <div>Thank you, the form was succesfully submitted</div>
      )}
      <fieldset>
        <Form.Group>
          <Form.Label>First Name*</Form.Label>
          <Form.Control {...register("firstName", { required: true })} />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Last Name*</Form.Label>
          <Form.Control {...register("lastName", { required: true })} />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Email*</Form.Label>
          <Form.Control {...register("email", { required: true })} />
          {errors.email && <span>{errors.email.message}</span>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Subject*</Form.Label>
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

        <Form.Group>
          <Form.Label>Message*</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register("message", { required: true })}
          />
          {errors.message && <span>{errors.message.message}</span>}
        </Form.Group>
        <br />
        <button>Send</button>
      </fieldset>
    </Form>
  );
}

export default Contact;
