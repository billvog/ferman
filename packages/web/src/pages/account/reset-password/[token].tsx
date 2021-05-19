import { withMyApollo } from "../../../utils/withMyApollo";
import { ResetPasswordPage } from "../../../modules/account/ForgotPwd/ResetPasswordPage";
export default withMyApollo({
  ssr: false,
})(ResetPasswordPage);
