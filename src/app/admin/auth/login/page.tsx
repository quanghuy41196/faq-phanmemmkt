"use client";
import ButtonFlowbite from "@/components/ButtonFlowbite";
import { InputField } from "@/components/customFormField";
import { useLogin } from "@/services/framework/auth/useLogin";
import { IFormLogin } from "@/services/interface";
import { useFormik } from "formik";
import * as yup from "yup";

const validateSchemaLogin = yup.object().shape({
  username: yup.string().required("Vui lòng nhập tên đăng nhập"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

function Login() {
  const { mutate: authLogin, isPending } = useLogin();

  const formik = useFormik<IFormLogin>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validateSchemaLogin,
    onSubmit: (value) => {
      authLogin(value, {
        onError: () => {
          formik.setValues({
            ...formik.values,
            password: "",
          });
          formik.setTouched({
            ...formik.touched,
            password: false,
          });
        },
      });
    },
  });

  return (
    <form className="space-y-2" onSubmit={formik.handleSubmit}>
      <InputField
        formik={formik}
        name="username"
        label="Tên đăng nhập"
        placeholder="Nhập email đăng nhập"
        isVertical
        isRequired
      />

      <InputField
        formik={formik}
        type="password"
        name="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        isVertical
        isRequired
      />

      <div className="!mt-5 flex justify-center">
        <ButtonFlowbite
          type="submit"
          color="blue"
          className="min-w-[250px]"
          isProcessing={isPending}
        >
          Đăng nhập
        </ButtonFlowbite>
      </div>
    </form>
  );
}

export default Login;
