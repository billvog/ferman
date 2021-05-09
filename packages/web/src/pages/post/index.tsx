import { withMyApollo } from "../../utils/withMyApollo";
import { CreatePostConnector } from "../../modules/post/CreatePostConnector";
export default withMyApollo({ ssr: false })(CreatePostConnector);
