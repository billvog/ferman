import { ForgotPasswordConnector } from "../../connectors/User/ForgotPasswordConnector";
import { withMyApollo } from "../../utils/withMyApollo";
export default withMyApollo({
  ssr: false,
})(ForgotPasswordConnector);
