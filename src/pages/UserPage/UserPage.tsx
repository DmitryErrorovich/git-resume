import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Grid, Link, Typography } from "@mui/material";

import "./styles.scss";

interface IProps {
  user: any;

  fetchUser: (username: string) => Promise<any>;
  fetchUserRepos: (username: string) => Promise<any>;
}

export const UserPage = ({ fetchUser, fetchUserRepos, user }: IProps) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(params?.username || "");
    fetchUserRepos(params?.username || "");
  }, [fetchUser, fetchUserRepos, params.username]);

  const goBack = () => {
    // TODO: CLEAN func DONT FORGET PLZ
    navigate("/");
  };

  return (
    <>
      <Button style={{ marginTop: "1rem" }} variant="outlined" onClick={goBack}>
        Back
      </Button>
      <Grid container className="container user">
        <Grid item xs={12}>
          <Typography className="user_name" variant="h1">
            {user?.name || user?.login}
          </Typography>
        </Grid>
        <Divider style={{ width: "100%", margin: "1rem 0" }} />
        <Grid item xs={4}>
          <Typography variant="subtitle1">Github profile</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">
            On Github since{" "}
            {new Date(user?.created_at).getFullYear() || "primeval times"}.{" "}
            {user.login} has{" "}
            {!!user.public_repos && (
              <Link
                rel="noopener"
                target="_blank"
                href={`${user.html_url}?tab=repos`}
              >
                {user.public_repos || "none"} public repos
              </Link>
            )}{" "}
            {!!user.followers && (
              <>
                and
                <Link
                  rel="noopener"
                  target="_blank"
                  href={`${user.html_url}?tab=followers`}
                >
                  {user.followers || "none"} followers
                </Link>
              </>
            )}
          </Typography>
        </Grid>
        {!!user.blog && (
          <>
            <Divider style={{ width: "100%", margin: "1rem 0" }} />
            <Grid item xs={4}>
              <Typography variant="subtitle1">Blog</Typography>
            </Grid>
            <Grid item xs={8}>
              <Link rel="noopener" target="_blank" href={user.blog}>
                {user.blog}
              </Link>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};
