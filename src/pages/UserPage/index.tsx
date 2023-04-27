import { connect } from "react-redux";
import {
  loading,
  user,
  fetchUserAction,
  fetchUserReposAction,
  userLanguages,
  userRepos,
} from "../../stores/User";
import { cleanStore } from "../../stores/User/reducer";
import { createStructuredSelector } from "reselect";
import { UserPage } from "./UserPage";

const mapState = createStructuredSelector({
  loading,
  user,
  userLanguages,
  userRepos,
});

const mapDispatch = {
  fetchUser: fetchUserAction,
  fetchUserRepos: fetchUserReposAction,
  cleanStore
};

export default connect(mapState, mapDispatch)(UserPage);
