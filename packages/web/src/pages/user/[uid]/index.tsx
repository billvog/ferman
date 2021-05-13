import { UserPage } from "../../../modules/user/UserPage";
import { withMyApollo } from "../../../utils/withMyApollo";
export default withMyApollo({
  ssr: true,
})(UserPage);
