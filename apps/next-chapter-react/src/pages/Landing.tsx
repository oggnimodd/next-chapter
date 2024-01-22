import { BaseLayout } from "layouts";
import { Hero } from "components";
import { FC, useLayoutEffect } from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

interface LandingProps {
  showSignIn?: boolean;
}

const Landing: FC<LandingProps> = ({ showSignIn = false }) => {
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (showSignIn) {
      navigate("/");
      openSignIn();
    }
  }, [showSignIn]);

  return (
    <BaseLayout>
      <Hero />
    </BaseLayout>
  );
};

export default Landing;
