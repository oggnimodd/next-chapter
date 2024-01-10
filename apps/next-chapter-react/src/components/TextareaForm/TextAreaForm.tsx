import { TextField, Button, TextFieldProps } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import AddIcon from "@mui/icons-material/Add";

type TextFieldPropsWithoutOnSubmit = Omit<TextFieldProps, "onSubmit">;

type TextAreaFormProps = TextFieldPropsWithoutOnSubmit & {
  type: "CREATE" | "EDIT";
  onSubmit: (description: string) => Promise<void> | void;
  onCancel?: () => void;
  initialValue?: string;
  name: string;
  isLoading?: boolean;
};

const validateSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Content cannot be empty" })
    .max(500, { message: "Content cannot exceed 500 characters" }),
});

type FormValues = z.infer<typeof validateSchema>;

const TextAreaForm: React.FC<TextAreaFormProps> = ({
  type,
  onSubmit,
  onCancel = () => {},
  name,
  initialValue,
  isLoading = false,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(validateSchema),
    defaultValues: { description: initialValue },
  });

  const onFormSubmit = (data: FormValues) => {
    onSubmit(data.description);

    if (type === "CREATE") {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col space-y-4"
    >
      <TextField
        autoFocus={type === "EDIT"}
        multiline
        rows={4}
        {...register("description")}
        placeholder={
          type === "CREATE" ? `Write a new ${name}...` : `Edit your ${name}...`
        }
        className={clsx(props.className, "w-full")}
        error={!!errors.description}
        helperText={errors.description?.message}
        {...props}
      />
      <div className="flex justify-end gap-x-2">
        {type === "EDIT" && (
          <Button
            onClick={() => onCancel()}
            color="primary"
            className="self-start"
            size="small"
          >
            Cancel
          </Button>
        )}
        <Button
          disabled={isLoading}
          type="submit"
          variant="contained"
          color="primary"
          className="self-start"
          size="small"
          startIcon={<AddIcon />}
        >
          {type === "CREATE" ? `Create ${name}` : `Save ${name}`}
        </Button>
      </div>
    </form>
  );
};

export default TextAreaForm;
