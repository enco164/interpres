import { useAuth } from "./use-auth";
import { Redirect, Route } from "react-router-dom";
import { RouteProps } from "react-router";

export const PrivateRoute = <T extends RouteProps = RouteProps>({
  children,
  ...rest
}: T) => {
  const { authenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (authenticated) {
          return children;
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
