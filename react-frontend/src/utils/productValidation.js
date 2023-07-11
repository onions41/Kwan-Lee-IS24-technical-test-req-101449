import { object, string, number } from "yup";

export default object().shape({
  id: number().typeError("Has to be a number like 123").required("Product ID is required").min(1),
  name: string().required("Product Name is required").trim(),
  description: string().trim(),
  colour: string().trim(),
  size: string().trim()
});
