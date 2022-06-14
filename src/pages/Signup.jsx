import React from "react";
import MyForm, {
  FormHeading,
  FormControll,
  FormButton,
  FormLink,
} from "../components/Shared/MyForm";
import { initialValues, validationSchema } from "../validations/Signup";
import useAuth from "../hooks/useAuth";

const Signup = () => {
  const { signUp } = useAuth();

  return (
    <div className="min-h-screen w-full grid place-items-center">
      <div className="w-[95%] sm:w-[400px]  shadow-md shadow-gray-300 p-8 rounded-lg">
        <MyForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => signUp(values, actions)}
        >
          {/* Form heading */}
          <FormHeading title="Signup Form" slogan="It's easy & free" />
          {/* Form controll for username */}
          <FormControll
            name="username"
            type="text"
            placeholder="Enter your username"
          />
          {/* Form controll for email */}
          <FormControll
            name="email"
            type="text"
            placeholder="Enter your email address"
          />
          {/* Form controll for password */}
          <FormControll
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          {/* Form button */}
          <FormButton title="Signup" />
          {/* Form link */}
          <FormLink
            text="Already have an account?"
            link="/signin"
            name="Signin"
          />
        </MyForm>
      </div>
    </div>
  );
};

export default Signup;
