import { withMyApollo } from "../../utils/withMyApollo";
import { CreatePostConnector } from "../../connectors/CreatePostConnector";
export default withMyApollo({ ssr: false })(CreatePostConnector);
