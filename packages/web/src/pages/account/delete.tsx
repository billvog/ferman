import { AccDelConnector } from "../../modules/account/Delete/AccDelConnector";
import { withMyApollo } from "../../utils/withMyApollo";
export default withMyApollo({ ssr: false })(AccDelConnector);
