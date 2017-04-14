import { h, Component } from "preact";
import Toast            from "src/components/toast";
import Orders           from "src/components/Orders";

const now = function() {
  return new Date().getTime();
}

export default class extends Component {
  constructor() {
    super()
    this.state = this.getInitialState();

    document.addEventListener("app:update", () => {
      this.setState({ updateAvailable: true });
    });
  }

  getInitialState() {
    return { updateAvailable: false };
  }

  hideToast() {
    this.setState({ updateAvailable: false });
  }

  render() {
    return (
      <div className="page page__home">
        <Orders />

        { this.state.updateAvailable &&
          <Toast message="New verison available" buttonText="Update" onClick={() => location.reload()} onClose={this.hideToast.bind(this)}/>
        }
      </div>
    );
  }
}
