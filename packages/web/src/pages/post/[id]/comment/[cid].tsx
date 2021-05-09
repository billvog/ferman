import { CommentPage } from "../../../../modules/post/comment/CommentPage";
import { withMyApollo } from "../../../../utils/withMyApollo";
export default withMyApollo({
  ssr: true,
})(CommentPage);
