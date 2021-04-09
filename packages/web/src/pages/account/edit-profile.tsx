import { withMyApollo } from "../../utils/withMyApollo";
import { EditProfileConnector } from "../../connectors/User/EditProfileConnector";
export default withMyApollo({
  ssr: false,
})(EditProfileConnector);
