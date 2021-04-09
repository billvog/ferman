import { AccDelConnector } from "../../connectors/User/AccDelConnector";
import { withMyApollo } from "../../utils/withMyApollo";
export default withMyApollo({ ssr: false })(AccDelConnector);
