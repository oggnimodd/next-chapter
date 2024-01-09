import { FC } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { api } from "trpc";
import toast from "react-hot-toast";

interface ModalRemoveBookProps {
  opened: boolean;
  handlers: {
    open: () => void;
    close: () => void;
  };
  bookId: string;
  title: string;
}

const ModalRemoveBook: FC<ModalRemoveBookProps> = ({
  opened,
  handlers,
  bookId,
  title,
}) => {
  const utils = api.useUtils();

  const { mutateAsync: removeBook, isLoading } = api.book.delete.useMutation();

  const handleRemove = async () => {
    try {
      await removeBook(bookId);
      await utils.shelf.getAll.invalidate();
      await utils.book.getBooksInShelf.invalidate();
      toast.success("Book removed successfully");
    } catch (err) {
      toast.error("Failed to remove book");
    } finally {
      handlers.close();

      await utils.shelf.getAll.invalidate();
      await utils.book.getBooksInShelf.invalidate();
      await utils.book.get.invalidate();
    }
  };

  return (
    <Modal
      open={opened}
      aria-labelledby="remove-book-modal"
      aria-describedby="remove-book-modal"
      onClose={handlers.close}
    >
      <Box className="modal">
        <Typography
          className="text-primary-main"
          id="modal-title"
          variant="h6"
          component="h2"
        >
          {title}
        </Typography>

        <Typography className="mt-2">
          Are you sure to delete this book from your shelf?
        </Typography>

        <div className="mt-4 flex gap-4 justify-end">
          <Button onClick={handlers.close}>No</Button>
          <Button
            disabled={isLoading}
            variant="contained"
            color="error"
            onClick={handleRemove}
          >
            Yes
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalRemoveBook;
