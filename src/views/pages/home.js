import { h, Component } from "preact";
import Toast from "src/components/toast";
import Orders from "src/components/Orders";
import AuthenticatedUser from "src/components/AuthenticatedUser";
import { getCurrentUser, setCurrentUser } from "src/util/current-user";

const now = function() {
  return new Date().getTime();
};

export default class extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  componentWillMount() {
    document.addEventListener("app:update", () => {
      this.setState({ updateAvailable: true });
    });
  }

  getInitialState() {
    return { updateAvailable: false, user: getCurrentUser() };
  }

  hideToast() {
    this.setState({ updateAvailable: false });
  }

  onAuthChange(user) {
    this.setState({ user: user });
    setCurrentUser(user);
  }

  render() {
    return (
      <div className="page page__home">
        <Orders user={this.state.user} />
        <AuthenticatedUser
          user={this.state.user}
          onAuthChange={this.onAuthChange.bind(this)}
        />

        {this.state.updateAvailable &&
          <Toast
            message="New verison available"
            buttonText="Update"
            onClick={() => location.reload()}
            onClose={this.hideToast.bind(this)}
          />}
      </div>
    );
  }
}
