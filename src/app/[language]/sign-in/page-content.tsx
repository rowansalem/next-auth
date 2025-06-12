"use client";
import FormTextInput from "@/components/form/text-input/form-text-input";
import Link from "@/components/link";
import { useAuthLoginService } from "@/services/api/services/auth";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { IS_SIGN_UP_ENABLED } from "@/services/auth/config";
import useAuthActions from "@/services/auth/use-auth-actions";
import useAuthTokens from "@/services/auth/use-auth-tokens";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
import { useTranslation } from "@/services/i18n/client";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinkItem from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import * as yup from "yup";

type SignInFormData = {
  email: string;
  password: string;
};

const useValidationSchema = () => {
  const { t } = useTranslation("sign-in");

  return yup.object().shape({
    email: yup
      .string()
      .email(t("sign-in:inputs.email.validation.invalid"))
      .required(t("sign-in:inputs.email.validation.required")),
    password: yup
      .string()
      .min(6, t("sign-in:inputs.password.validation.min"))
      .required(t("sign-in:inputs.password.validation.required")),
  });
};

function FormActions() {
  const { t } = useTranslation("sign-in");
  const { isSubmitting } = useFormState();

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
      data-testid="sign-in-submit"
    >
      {t("sign-in:actions.submit")}
    </Button>
  );
}

function Form() {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const fetchAuthLogin = useAuthLoginService();
  const { t } = useTranslation("sign-in");
  const validationSchema = useValidationSchema();

  const methods = useForm<SignInFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchAuthLogin(formData);

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof SignInFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(
              `sign-in:inputs.${key}.validation.server.${data.errors[key]}`
            ),
          });
        }
      );

      return;
    }

    if (status === HTTP_CODES_ENUM.OK) {
      setTokensInfo({
        token: data.token,
        refreshToken: data.refreshToken,
        tokenExpires: data.tokenExpires,
      });
      setUser(data.user);
    }
  });

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} mt={3}>
              <Typography variant="h6">{t("sign-in:title")}</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<SignInFormData>
                name="email"
                label={t("sign-in:inputs.email.label")}
                type="email"
                testId="email"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<SignInFormData>
                name="password"
                label={t("sign-in:inputs.password.label")}
                type="password"
                testId="password"
              />
            </Grid>
            <Grid item xs={12}>
              <LinkItem
                component={Link}
                href="/forgot-password"
                data-testid="forgot-password"
              >
                {t("sign-in:actions.forgotPassword")}
              </LinkItem>
            </Grid>

            <Grid item xs={12} style={{ display: "flex", gap: "10px" }}>
              <FormActions />

              {IS_SIGN_UP_ENABLED && (
                <Box ml={1} component="span">
                  <Button
                    variant="contained"
                    color="inherit"
                    LinkComponent={Link}
                    href="/sign-up"
                    data-testid="create-account"
                  >
                    {t("sign-in:actions.createAccount")}
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
}

function SignIn() {
  return <Form />;
}

export default withPageRequiredGuest(SignIn);

