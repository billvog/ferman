import { FollowersPage } from "../../../modules/user/FollowersPage";
import { withMyApollo } from "../../../utils/withMyApollo";
export default withMyApollo({
  ssr: false,
})(FollowersPage);
