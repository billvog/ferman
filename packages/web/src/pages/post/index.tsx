import { withMyApollo } from "../../utils/withMyApollo";
import { CreatePostPage } from "../../modules/post/create/CreatePostPage";
export default withMyApollo({ ssr: false })(CreatePostPage);
