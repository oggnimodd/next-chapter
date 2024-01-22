import { FC } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

interface SignedOutOnlyProps {
  path?: string;
  children: React.ReactNode;
}

export const SignedOutOnly: FC<SignedOutOnlyProps> = ({ path, children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Navigate replace to={path || "/dashboard"} />;
  }

  return <>{children}</>;
};
