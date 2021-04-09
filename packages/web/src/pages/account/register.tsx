import { withMyApollo } from "../../utils/withMyApollo";
import { RegisterConnector } from "../../connectors/User/RegisterConnector";
export default withMyApollo({ ssr: false })(RegisterConnector);
