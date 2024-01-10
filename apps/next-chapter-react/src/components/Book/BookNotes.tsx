import { FC, useState } from "react";
import { api } from "trpc";
import { TextAreaForm } from "../TextareaForm";
import { useBookDetails } from "hooks";
import toast from "react-hot-toast";
import { Note } from "@acme/db";
import { Card, IconButton, Typography } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

interface NotesListProps {
  bookId: string;
}

const NotesList: FC<NotesListProps> = ({ bookId }) => {
  const utils = api.useUtils();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { isLoading, data: notes, isError } = api.note.getAll.useQuery(bookId);
  const { mutateAsync: updateNote } = api.note.update.useMutation();
  const { mutateAsync: deleteNote, isLoading: isDeletingNote } =
    api.note.delete.useMutation();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;
  if (!notes) return null;

  const handleUpdate = async (description: string) => {
    const targetId = selectedNote?.id;
    if (targetId) {
      try {
        await updateNote({ id: targetId, description });
        toast.success("Note updated successfully");
        utils.note.invalidate();
        handleCancelEdit();
      } catch {
        toast.error("Failed to update note");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      toast.success("Note deleted successfully");
      utils.note.invalidate();
    } catch {
      toast.error("Failed to delete note");
    }
  };

  const handleCancelEdit = () => {
    setSelectedNote(null);
  };

  return (
    <div className="my-2">
      <Typography variant="h6" className="mt-5 mb-2">
        You have {notes.length} notes for this book
      </Typography>
      <div className="flex flex-col gap-y-3">
        {notes
          .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
          .map((note) => {
            const isSelected = selectedNote?.id === note.id;

            if (isSelected) {
              return (
                <TextAreaForm
                  onCancel={handleCancelEdit}
                  key={note.id}
                  type="EDIT"
                  name="notes"
                  onSubmit={handleUpdate}
                  initialValue={note.description}
                />
              );
            }

            return (
              <Card
                key={note.id}
                className="mt-2 p-4 rounded-md flex flex-col gap-2"
              >
                <Typography>{note.description}</Typography>
                <Typography className="text-sm italic text-text-primary/70">
                  {note.updatedAt.toLocaleDateString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </Typography>

                <div>
                  <IconButton
                    onClick={() => {
                      setSelectedNote(note);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    disabled={isDeletingNote}
                    onClick={() => handleDelete(note.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

const BookNotes: FC = () => {
  const utils = api.useUtils();
  const { id, data, isLoading, isError } = useBookDetails();
  const { mutateAsync: createNote, isLoading: isCreatingNote } =
    api.note.create.useMutation();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;
  if (!data) return null;

  const handleAddNote = async (description: string) => {
    try {
      await createNote({
        bookId: id,
        description,
      });

      toast.success("Note created successfully");
      utils.note.invalidate();
    } catch (err) {
      toast.error("Failed to create note");
    }
  };

  return (
    <div className="flex flex-col w-full lg:w-1/2">
      <TextAreaForm
        isLoading={isCreatingNote}
        type="CREATE"
        name="notes"
        onSubmit={handleAddNote}
      />
      {id && <NotesList bookId={id} />}
    </div>
  );
};

export default BookNotes;
