import { ForgotPasswordConnector } from "../../connectors/ForgotPasswordConnector";
import { withMyApollo } from "../../utils/withMyApollo";
export default withMyApollo({
  ssr: false,
})(ForgotPasswordConnector);
