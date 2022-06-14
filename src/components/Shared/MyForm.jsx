import React from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";

const MyForm = ({ initialValues, validationSchema, onSubmit, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="space-y-4">{children}</Form>
    </Formik>
  );
};

export const FormHeading = ({ title, slogan }) => (
  <div className="flex flex-col gap-2">
    <p className="text-3xl text-primary font-bold">{title}</p>
    <p className="text-sm text-secondary">{slogan}</p>
  </div>
);

export const FormControll = ({ name, type, placeholder }) => {
  return (
    <div className="flex flex-col gap-2">
      <Field name={name}>
        {(props) => (
          <>
            <label htmlFor={props.field.name} className="capitalize">
              {props.field.name}
            </label>
            <input
              type={type}
              name={props.field.name}
              id={props.field.name}
              placeholder={placeholder}
              autoComplete="off"
              spellCheck="false"
              value={props.field.value}
              onChange={props.field.onChange}
              onBlur={props.field.onBlur}
              className="input input-bordered w-full"
            />
            {props.meta.touched && props.meta.error && (
              <p className="text-error text-sm">{props.meta.error}</p>
            )}
          </>
        )}
      </Field>
    </div>
  );
};

export const FormSelect = ({ name, options }) => {
  return (
    <div className="flex flex-col gap-2">
      <Field name={name}>
        {(props) => (
          <>
            <label htmlFor={props.field.name} className="capitalize">
              {props.field.name}
            </label>
            <Field
              as="select"
              name={name}
              className="input input-bordered w-full"
            >
              {options.map((option) => (
                <option key={option} value={option} className="capitalize">
                  {option}
                </option>
              ))}
            </Field>
            {props.meta.touched && props.meta.error && (
              <p className="text-error text-sm">{props.meta.error}</p>
            )}
          </>
        )}
      </Field>
    </div>
  );
};

export const FormButton = ({ title }) => (
  <div>
    <button type="submit" className="btn btn-primary w-full">
      {title}
    </button>
  </div>
);

export const FormLink = ({ text, link, name }) => (
  <div>
    <p className="text-secondary text-sm">
      {text}{" "}
      <Link to={link} className="font-semibold text-primary">
        {name}
      </Link>
    </p>
  </div>
);

export default MyForm;