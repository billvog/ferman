import { withMyApollo } from "../../utils/withMyApollo";
import { EditProfileConnector } from "../../connectors/EditProfileConnector";
export default withMyApollo({
  ssr: false,
})(EditProfileConnector);
