const Route = ({ path, currentRoute, children }) => {
  // return window.location.hash === path ? children : null
  if (path === currentRoute) {
    return children;
  }
  return null;
};

export default Route;
