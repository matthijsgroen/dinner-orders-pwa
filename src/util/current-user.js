export function getCurrentUser() {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user) {
  localStorage.setItem("currentUser", user ? JSON.stringify(user) : null);
}
