import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface useNavigateOnErrorProps {
  isError: boolean;
  message?: string;
  path?: string;
  displayMessage?: boolean;
}

const DEFAULT_MESSAGE = "Something went wrong";
const DEFAULT_PATH = "/";

const useNavigateOnError = ({
  isError,
  message = DEFAULT_MESSAGE,
  path = DEFAULT_PATH,
  displayMessage = true,
}: useNavigateOnErrorProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      if (displayMessage) {
        toast.error(message);
      }
      navigate(path);
    }
  }, [isError, path]);
};

export default useNavigateOnError;
