import { withMyApollo } from "../../../utils/withMyApollo";
import { ResetPasswordConnector } from "../../../connectors/ResetPasswordConnector";
export default withMyApollo({
  ssr: false,
})(ResetPasswordConnector);
