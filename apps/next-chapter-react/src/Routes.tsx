import { Home, Book, NotFound, Search, Shelf, Profile, Landing } from "pages";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";
import { SignedOutOnly } from "components";

interface Page {
  path: string;
  component: JSX.Element;
  type?: "public" | "protected" | "unauthenticated";
}

const routes = [
  {
    path: "/dashboard",
    component: <Home />,
    type: "protected",
  },
  {
    path: "/",
    component: <Landing />,
    type: "unauthenticated",
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

        // Only accessible if user is not signed in
        if (type === "unauthenticated") {
          return (
            <Route
              element={<SignedOutOnly>{component}</SignedOutOnly>}
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
                  <Landing showSignIn />
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
