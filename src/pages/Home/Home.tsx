import { Grid, Typography } from "@mui/material";

import "./styles.scss";

interface IProps {}

export const Home = ({}: IProps) => {
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
      </Grid>
    </>
  );
};
