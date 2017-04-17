import { h } from "preact";
const GoogleIcon = require("file-loader!src/icons/google.svg");
import styles from "./AuthenticatedUser.module.scss";

import {
  signIn as googleSignIn,
  signOut as googleSignOut,
} from "src/util/google-auth";
import { getCurrentUser, setCurrentUser } from "src/util/current-user";

const requestSignIn = (notifyAuthChange) => () => {
  googleSignIn().then(function(user) {
    setCurrentUser(user);
    notifyAuthChange();
  });
};

const requestSignOut = (notifyAuthChange) => () => {
  googleSignOut().then(function(user) {
    setCurrentUser(null);
    notifyAuthChange();
  });
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
  const currentUser = getCurrentUser();

  return (
    <div className={styles.container}>
      { currentUser
        && <UserInfo user={currentUser} {...props} />
        || <GoogleSignIn {...props} />
      }
    </div>
  )
}
