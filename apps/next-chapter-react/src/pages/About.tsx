import { FC } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Typography } from "@mui/material";
import { SelectMovie, TeamMemberCard } from "components";

const About: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Button variant="contained" onClick={open}>
        Open Modal
      </Button>
      <Modal
        open={opened}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-400 bg-background-paper border-2 border-black shadow-lg p-4"
          role="dialog"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" className="mt-2">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </div>
      </Modal>

      {/* Div with padding */}
      <div className="p-4 flex flex-col items-center justify-center gap-4">
        <TeamMemberCard
          name="John Doe"
          role="Developer"
          image="https://randomuser.me/api/portraits/men/1.jpg"
          twitter="https://twitter.com/johndoe"
          linkedin="https://www.linkedin.com/in/johndoe/"
        />
        <SelectMovie />
      </div>
    </div>
  );
};

export default About;
