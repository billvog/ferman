import { withMyApollo } from "../../../../utils/withMyApollo";
import { CreateCommentConnector } from "../../../../connectors/CreateCommentConnector";
export default withMyApollo({
  ssr: false,
})(CreateCommentConnector);
