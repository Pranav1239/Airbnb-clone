import { imageMbTobytes } from "@/lib/utils";
import * as yup from "yup";

export const AddHomeSchema = yup
  .object()
  .shape({
    title: yup.string().min(6).max(50).required(),
    description: yup.string().min(50).max(10000).required(),
    state: yup.string().min(6).max(50).required(),
    city: yup.string().min(6).max(50).required(),
    price: yup.number().required().typeError("Enter number"),
    country: yup.string().required(),
    categories: yup
      .mixed<Array<string> | []>()
      .test(
        "Categories",
        "Select one category or more categories",
        (data: any) => {
          const isValid = data?.length >= 1;
          return isValid;
        }
      ),
    image: yup
      .mixed()
      .test("image", "Only you can send the images", (file: any) => {
        const isValid =
          file?.type === "image/jpeg" ||
          file?.type === "image/png" ||
          file?.type === "image/jpg" ||
          file?.type === "image/webp";
        return isValid;
      })
      .test("imageSize", "Image must be less than 2 MB", (file: any) => {
        const isValid = imageMbTobytes(file?.size) <= 2;
        return isValid;
      }),
  })
  .required();

export type AddHomeType = yup.InferType<typeof AddHomeSchema>;
