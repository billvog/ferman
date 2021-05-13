import { FollowingsPage } from "../../../modules/user/FollowingsPage";
import { withMyApollo } from "../../../utils/withMyApollo";
export default withMyApollo({
  ssr: false,
})(FollowingsPage);
