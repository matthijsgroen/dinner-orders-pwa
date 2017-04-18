import Config from "src/config";
import loadScript from "src/util/load-script";

const GOOGLE_AUTH_PLATFORM_SCRIPT = "https://apis.google.com/js/platform.js";
const GOOGLE_AUTH_CONFIG = { client_id: Config.googleClientId };

// googThenables, the promise-like objects used by the google sdk
// are not compatible with native Promises, and result in infinite loops
// when simply calling googlThenable.then(resolve, reject).
function fixPromise(googThenable, resolve, reject) {
  googThenable.then(
    function(args) {
      resolve(...args);
    },
    function(args) {
      reject(...args);
    }
  );
}

function _loadGAuth() {
  return loadScript(GOOGLE_AUTH_PLATFORM_SCRIPT).then(function() {
    return new Promise(function(resolve, reject) {
      gapi.load("auth2", function() {
        fixPromise(gapi.auth2.init(GOOGLE_AUTH_CONFIG), resolve, reject);
      });
    });
  });
}

export function loadGAuth() {
  return (window.gapi && Promise.resolve()) || _loadGAuth();
}

function profile(basicProfile) {
  return {
    name: basicProfile.getName(),
    email: basicProfile.getEmail()
  };
}

export function signIn() {
  return loadGAuth().then(function() {
    return new Promise(function(resolve, reject) {
      const auth = gapi.auth2.getAuthInstance();
      const resolveUserProfile = () =>
        resolve(profile(auth.currentUser.get().getBasicProfile()));

      if (auth.isSignedIn.get()) resolveUserProfile();
      else {
        auth.isSignedIn.listen(resolveUserProfile);
        auth.signIn();
      }
    });
  });
}

export function signOut() {
  return loadGAuth().then(function() {
    return new Promise(function(resolve, reject) {
      const auth = gapi.auth2.getAuthInstance();
      fixPromise(auth.signOut(), resolve, reject);
    });
  });
}
