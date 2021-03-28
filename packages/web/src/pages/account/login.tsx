import { withMyApollo } from "../../utils/withMyApollo";
import { LoginConnector } from "../../connectors/LoginConnector";
export default withMyApollo({ ssr: false })(LoginConnector);
