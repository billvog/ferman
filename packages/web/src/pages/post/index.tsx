import { withMyApollo } from "../../utils/withMyApollo";
import { CreatePostConnector } from "../../connectors/Post/CreatePostConnector";
export default withMyApollo({ ssr: false })(CreatePostConnector);
