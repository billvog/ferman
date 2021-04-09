import { withMyApollo } from "../../../utils/withMyApollo";
import { ResetPasswordConnector } from "../../../connectors/User/ResetPasswordConnector";
export default withMyApollo({
  ssr: false,
})(ResetPasswordConnector);
