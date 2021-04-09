import { withMyApollo } from "../../../../utils/withMyApollo";
import { CreateCommentConnector } from "../../../../connectors/Post/CreateCommentConnector";
export default withMyApollo({
  ssr: false,
})(CreateCommentConnector);
