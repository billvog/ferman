import { withMyApollo } from "../../../../utils/withMyApollo";
import { CreateCommentConnector } from "../../../../modules/post/comment/CreateCommentConnector";
export default withMyApollo({
  ssr: false,
})(CreateCommentConnector);
