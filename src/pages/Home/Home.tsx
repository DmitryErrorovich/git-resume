import { Grid, Typography } from "@mui/material";
import Search from "../../components/Search/Search";
import { object, string } from "yup";
import { FormikProps, withFormik } from "formik";
import { NavigateFunction } from "react-router-dom";

import "./styles.scss";

interface IProps {
  navigate: NavigateFunction;
}

interface IFormValues {
  username: string;
}

const HomePage = ({
  values,
  handleChange,
  handleSubmit,
  errors,
  touched,
}: IProps & FormikProps<IFormValues>) => {
  return (
    <>
      <Grid
        container
        className={"container"}
        style={{ flexDirection: "column" }}
      >
        <Typography variant="h5" align="center">
          Github Resume
        </Typography>
        <Typography variant="body1" align="center">
          Please enter GitHub username
        </Typography>

        <Search
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          label="Github username"
          value={values["username"]}
          name="username"
          error={!!touched["username"] && !!errors["username"]}
          helperText={!!touched["username"] ? errors["username"] : ""}
        />
      </Grid>
    </>
  );
};

const validationSchema = object().shape({
  username: string().required("Username is required"),
});

const formikEnhance = withFormik<IProps, IFormValues>({
  validationSchema,
  enableReinitialize: true,
  mapPropsToValues: () => {
    return { username: "" }; // need for initialValues inside withFromik
  },
  handleSubmit: ({ username }: IFormValues, formikBag) => {
    formikBag.props.navigate(`/${username}`);
  },
});

export const Home = formikEnhance(HomePage);
