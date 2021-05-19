import { withMyApollo } from "../../utils/withMyApollo";
import { EditProfilePage } from "../../modules/account/EditProfile/EditProfilePage";
export default withMyApollo({
  ssr: false,
})(EditProfilePage);
