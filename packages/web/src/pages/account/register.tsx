import { withMyApollo } from "../../utils/withMyApollo";
import { RegisterConnector } from "../../connectors/RegisterConnector";
export default withMyApollo({ ssr: false })(RegisterConnector);
