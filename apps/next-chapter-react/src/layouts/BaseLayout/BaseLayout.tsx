import { FC } from "react";
import { Header } from "components";
import { Container } from "@mui/material";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container className="w-full py-4 px-6 max-w-full">{children}</Container>
    </>
  );
};

export default BaseLayout;
