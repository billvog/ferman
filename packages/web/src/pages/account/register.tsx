import { withMyApollo } from "../../utils/withMyApollo";
import { RegisterConnector } from "../../modules/account/Register/RegisterConnector";
export default withMyApollo({ ssr: false })(RegisterConnector);
