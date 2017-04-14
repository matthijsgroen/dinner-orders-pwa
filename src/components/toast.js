import { h, Component } from "preact";
import styles from "./toast.module.scss";

function delay(duration) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve();
    }, duration);
  });
}

export default class Toast extends Component {
  constructor() {
    super();
    this.state = { className: styles.toast };
  }

  componentDidMount() {
    delay(300).then(() => {
      this.setState({ className: `${styles.toast} ${styles.visible}` });
    });

    delay(5000).then(() => {
      this.setState({ className: styles.toast });
      return delay(1000);
    }).then(() => {
      this.props.onClose();
    });
  }

  render() {
    return (
      <div className={this.state.className}>
        <p>{this.props.message}</p>
        <button onClick={this.props.onClick}>{this.props.buttonText}</button>
      </div>
    );
  }
}
