import { AccountPage } from "../../modules/account/AccountPage";
import { withMyApollo } from "../../utils/withMyApollo";
export default withMyApollo({ ssr: false })(AccountPage);
