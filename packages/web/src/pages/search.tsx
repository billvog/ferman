import { SearchPage } from "../modules/search/SearchPage";
import { withMyApollo } from "../utils/withMyApollo";
export default withMyApollo({
  ssr: false,
})(SearchPage);
