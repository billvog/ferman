import { PostPage } from "../../../modules/post/PostPage";
import { withMyApollo } from "../../../utils/withMyApollo";
export default withMyApollo({
  ssr: true,
})(PostPage);
