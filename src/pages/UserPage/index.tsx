import { connect } from "react-redux";
import {
  user,
  fetchUserAction,
  fetchUserReposAction,
} from "../../stores/User";
import { createStructuredSelector } from "reselect";
import { UserPage } from "./UserPage";

const mapState = createStructuredSelector({
  user,
});

const mapDispatch = {
  fetchUser: fetchUserAction,
  fetchUserRepos: fetchUserReposAction,
};

export default connect(mapState, mapDispatch)(UserPage);
