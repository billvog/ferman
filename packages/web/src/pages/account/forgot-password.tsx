import { ForgotPasswordConnector } from "../../modules/account/ForgotPwd/ForgotPasswordConnector";
import { withMyApollo } from "../../utils/withMyApollo";
export default withMyApollo({
  ssr: false,
})(ForgotPasswordConnector);
