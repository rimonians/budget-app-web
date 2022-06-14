import React from "react";
import MyForm, {
  FormHeading,
  FormControll,
  FormButton,
  FormLink,
} from "../components/Shared/MyForm";
import { initialValues, validationSchema } from "../validations/Signin";
import useAuth from "../hooks/useAuth";

const Signin = () => {
  const { signIn } = useAuth();

  return (
    <div className="min-h-screen w-full grid place-items-center">
      <div className="w-[95%] sm:w-[400px]  shadow-md shadow-gray-300 p-8 rounded-lg">
        <MyForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => signIn(values, actions)}
        >
          {/* Form heading */}
          <FormHeading title="Signin Form" slogan="It's easy & free" />
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
          <FormButton title="Signin" />
          {/* Form link */}
          <FormLink
            text="Havn't an account yet?"
            link="/signup"
            name="Signup"
          />
        </MyForm>
      </div>
    </div>
  );
};

export default Signin;
