import { FC } from "react";
import { Header } from "components";
import { Container, Fab } from "@mui/material";
import { useWindowScroll } from "@mantine/hooks";
import { KeyboardArrowUp } from "@mui/icons-material";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const [_scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Header />
      <Fab
        size="small"
        color="primary"
        className="z-50 fixed bottom-4 right-4"
        onClick={() => scrollTo({ y: 0 })}
      >
        <KeyboardArrowUp />
      </Fab>
      <Container className="w-full py-4 px-6 container mx-auto">
        {children}
      </Container>
    </>
  );
};

export default BaseLayout;
