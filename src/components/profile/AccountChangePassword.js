import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { Stack, Card } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Passwords must match"
    ),
  });

  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      {/* <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <input name="oldPassword" type="password" label="Old Password" />

          <input name="newPassword" type="password" label="New Password" />

          <input name="confirmNewPassword" type="password" label="Confirm New Password" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider> */}
    </Card>
  );
}
