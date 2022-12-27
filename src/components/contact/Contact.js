import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your name")
    .min(3, "Minimum 3 characters"),
  lirstName: yup
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        First Name*
        <input {...register("firstName", { required: true })} />
        {errors.firstName && <span>{errors.firstName.message}</span>}
      </label>

      <label>
        Last Name*
        <input {...register("lastName", { required: true })} />
        {errors.lastName && <span>{errors.lastName.message}</span>}
      </label>

      <label>
        Email*
        <input {...register("email", { required: true })} />
        {errors.email && <span>{errors.email.message}</span>}
      </label>

      <label>
        Subject*
        <select {...register("subject", { required: true })}>
          <option value="product">Product</option>
          <option value="support">Support</option>
        </select>
        {errors.subject && <span>{errors.subject.message}</span>}
      </label>

      <label>
        Message*
        <textarea {...register("message", { required: true })} />
        {errors.message && <span>{errors.message.message}</span>}
      </label>

      <button>Send</button>
    </form>
  );
}

export default Contact;
