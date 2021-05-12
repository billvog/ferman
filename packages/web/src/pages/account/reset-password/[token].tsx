import { withMyApollo } from "../../../utils/withMyApollo";
import { ResetPasswordConnector } from "../../../modules/account/ForgotPwd/ResetPasswordConnector";
export default withMyApollo({
  ssr: false,
})(ResetPasswordConnector);
