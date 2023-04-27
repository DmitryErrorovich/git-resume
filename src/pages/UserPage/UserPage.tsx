import {
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import "./styles.scss";

interface IProps {}

export const UserPage = ({}: IProps) => {
  return (
    <>
      <Grid container className="container user">
        <Grid item xs={12}>
          <Typography className="user_name" variant="h1">
            Joe Doe
          </Typography>
        </Grid>
        <Divider style={{ width: "100%", margin: "1rem 0" }} />
        <Grid item xs={4}>
          <Typography variant="subtitle1">Github profile</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">
            On Github since primeval times. Joe Doe has 5 public repos and 5 followers
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
