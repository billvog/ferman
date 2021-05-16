import { withMyApollo } from "../../utils/withMyApollo";
import { ExplorePostsPage } from "../../modules/explore/posts/ExplorePostsPage";
export default withMyApollo({ ssr: true })(ExplorePostsPage);
