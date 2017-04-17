import { h } from "preact";
const GoogleIcon = require("file-loader!src/icons/google.svg");
import styles from "./AuthenticatedUser.module.scss";

import {
  signIn as googleSignIn,
  signOut as googleSignOut,
} from "src/util/google-auth";

const requestSignIn = (notifyAuthChange) => (e) => {
  e.preventDefault();
  googleSignIn().then(notifyAuthChange);
};

const requestSignOut = (notifyAuthChange) => (e) => {
  e.preventDefault();
  googleSignOut().then(notifyAuthChange);
};

const GoogleSignIn = function(props) {
  return (
    <a href="#" className={styles.link} onClick={requestSignIn(props.onAuthChange)}>
      <img className={styles.icon} style="height: 1.5em" src={GoogleIcon} /> Sign in with Google
    </a>
  )
}

const UserInfo = function(props) {
  return (
    <div>
      {props.user.email}
      &nbsp;
      -
      &nbsp;
      <a href="#" onClick={requestSignOut(props.onAuthChange)}>Sign out</a>
    </div>
  )
}

export default function(props) {
  return (
    <div className={styles.container}>
      { this.props.user
        && <UserInfo {...props} />
        || <GoogleSignIn {...props} />
      }
    </div>
  )
}
