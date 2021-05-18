import { withMyApollo } from "../../utils/withMyApollo";
import { RegisterPage } from "../../modules/account/Register/RegisterPage";
export default withMyApollo({ ssr: false })(RegisterPage);
