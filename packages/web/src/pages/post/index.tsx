import { withMyApollo } from "../../utils/withMyApollo";
import { CreatePostConnector } from "../../modules/post/create/CreatePostConnector";
export default withMyApollo({ ssr: false })(CreatePostConnector);
