import { Home, Book, NotFound, Search, Shelf, Profile } from "pages";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";

interface Page {
  path: string;
  component: JSX.Element;
  type?: "public" | "protected";
}

const routes = [
  {
    path: "/",
    component: <Home />,
    type: "protected",
  },
  {
    path: "/profile",
    component: <Profile />,
    type: "protected",
  },
  {
    path: "/search",
    component: <Search />,
    type: "public",
  },
  {
    path: "/book/:id/:sub",
    component: <Book />,
    type: "protected",
  },
  {
    path: "/shelf/:id",
    component: <Shelf />,
    type: "protected",
  },
  {
    path: "/sign-in/*",
    component: <SignIn routing="path" path="/sign-in" />,
  },
  {
    path: "/sign-up/*",
    component: <SignUp routing="path" path="/sign-up" />,
  },
  {
    path: "*",
    component: <NotFound />,
    type: "public",
  },
] satisfies Page[];

const Routes = () => {
  return (
    <ReactRouterRoutes>
      {routes.map(({ path, component, type }) => {
        if (type === "public") {
          return (
            <Route
              element={component}
              path={path}
              key={`router-link-${path}`}
            />
          );
        }

        return (
          <Route
            element={
              <>
                <SignedIn>{component}</SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
            path={path}
            key={`router-link-${path}`}
          />
        );
      })}
    </ReactRouterRoutes>
  );
};

export default Routes;
