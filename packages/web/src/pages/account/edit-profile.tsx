import { withMyApollo } from "../../utils/withMyApollo";
import { EditProfileConnector } from "../../modules/account/EditProfile/EditProfileConnector";
export default withMyApollo({
  ssr: false,
})(EditProfileConnector);
