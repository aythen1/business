const USER_KEY = 'user';

export const login = (username, password) => {
  const user = { username };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => {
  const user = localStorage.getItem(USER_KEY);
  return Boolean(user);
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const registerUser = () => {
  
}