import { FeedPage } from "../modules/feed/FeedPage";
import { withMyApollo } from "../utils/withMyApollo";
export default withMyApollo({ ssr: true })(FeedPage);
