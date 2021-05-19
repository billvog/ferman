import { ForgotPasswordPage } from "../../modules/account/ForgotPwd/ForgotPasswordPage";
import { withMyApollo } from "../../utils/withMyApollo";
export default withMyApollo({
  ssr: false,
})(ForgotPasswordPage);
