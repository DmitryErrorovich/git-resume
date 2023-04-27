import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Grid,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";
import map from "lodash/map";
import get from "lodash/get";

import "./styles.scss";

interface IProps {
  user: any;
  loading: any;
  userLanguages: { [key: string]: number };
  userRepos: Array<any>;

  fetchUser: (username: string) => Promise<any>;
  fetchUserRepos: (username: string) => Promise<any>;
  cleanStore: () => void;
}

export const UserPage = ({
  fetchUser,
  fetchUserRepos,
  user,
  userLanguages,
  loading,
  userRepos,
  cleanStore,
}: IProps) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(params?.username || "");
    fetchUserRepos(params?.username || "");
  }, [fetchUser, fetchUserRepos, params.username]);

  const renderUserLanguages = useMemo(() => {
    return map(
      Object.keys(userLanguages).sort(
        (a, b) => userLanguages[b] - userLanguages[a]
      ),
      (item, id) => {
        return (
          <Typography key={`User-lang-${item}-${id}`}>
            {item} (
            {((userLanguages[item] / user.repos.length) * 100).toFixed(1)} %)
          </Typography>
        );
      }
    );
  }, [userLanguages, user]);

  const goBack = () => {
    cleanStore();
    navigate("/");
  };

  if (!user && (loading === "idle" || loading === "pending")) {
    return (
      <Grid container className="user">
        <Skeleton width={"100%"} variant="text"></Skeleton>
        <Skeleton width={"100%"} variant="text"></Skeleton>
        <Skeleton width={"100%"} variant="text"></Skeleton>
        <Skeleton width={"100%"} variant="text"></Skeleton>
      </Grid>
    );
  }

  return (
    <>
      <Button style={{ marginTop: "1rem" }} variant="outlined" onClick={goBack}>
        Back
      </Button>
      {!user && loading === "failed" ? (
        <Grid container className="container user">
          <Typography align="center" variant="h4">
            User not found
          </Typography>
          <Divider style={{ width: "100%", margin: "1rem 0" }} />
          <Typography>Please try another username</Typography>
        </Grid>
      ) : (
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
          {!!userLanguages && (
            <>
              <Divider style={{ width: "100%", margin: "1rem 0" }} />
              <Grid item xs={4}>
                <Typography variant="subtitle1">Languages</Typography>
              </Grid>
              <Grid item xs={8}>
                {renderUserLanguages}
              </Grid>
            </>
          )}
          {!!userRepos && (
            <>
              <Divider style={{ width: "100%", margin: "1rem 0" }} />
              <Grid item xs={4}>
                <Typography variant="subtitle1">Repositories</Typography>
              </Grid>
              <Grid item xs={8}>
                {map(userRepos, (item, index) => {
                  return (
                    <div
                      className="user_repo"
                      key={`repo-${item.name}-${index}`}
                    >
                      <div className="user_repo_header">
                        <Link href={item.git_url}>{get(item, "name")}</Link>
                        <Typography>
                          Updated at{" "}
                          {new Date(get(item, "updated_at")).toLocaleDateString(
                            "en-US"
                          )}
                        </Typography>
                      </div>
                      {item.description && (
                        <Typography>Description: {item.description}</Typography>
                      )}
                      <Divider style={{ width: "100%", margin: "1rem 0" }} />
                    </div>
                  );
                })}
              </Grid>
            </>
          )}
        </Grid>
      )}
    </>
  );
};
