import { withMyApollo } from "../../utils/withMyApollo";
import { LoginPage } from "../../modules/account/Login/LoginPage";
export default withMyApollo({ ssr: false })(LoginPage);
