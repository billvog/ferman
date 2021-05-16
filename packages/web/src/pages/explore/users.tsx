import { ExploreUsersPage } from "../../modules/explore/users/ExploreUsersPage";
import { withMyApollo } from "../../utils/withMyApollo";
export default withMyApollo({
  ssr: true,
})(ExploreUsersPage);
