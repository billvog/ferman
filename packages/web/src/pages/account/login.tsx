import { withMyApollo } from "../../utils/withMyApollo";
import { LoginConnector } from "../../modules/account/Login/LoginConnector";
export default withMyApollo({ ssr: false })(LoginConnector);
