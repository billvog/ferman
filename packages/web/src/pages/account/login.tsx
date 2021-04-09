import { withMyApollo } from "../../utils/withMyApollo";
import { LoginConnector } from "../../connectors/User/LoginConnector";
export default withMyApollo({ ssr: false })(LoginConnector);
