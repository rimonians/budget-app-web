import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Budget title required"),
  type: Yup.string()
    .required("Budget type required")
    .oneOf(["income", "expense"], "Not a valid budget type"),
  amount: Yup.number()
    .required("Budget amound required")
    .moreThan(0, "Budget amount can't be negative number"),
});
