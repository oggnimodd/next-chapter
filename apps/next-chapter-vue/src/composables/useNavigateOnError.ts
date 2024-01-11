import { Ref } from "vue";
import { watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

const DEFAULT_MESSAGE = "Something went wrong";
const DEFAULT_PATH = "/";

interface UseNavigateOnErrorProps {
  isError: Ref<boolean>;
  message?: string;
  path?: string;
  displayMessage?: boolean;
}

const useNavigateOnError = ({
  isError,
  message = DEFAULT_MESSAGE,
  path = DEFAULT_PATH,
  displayMessage = true,
}: UseNavigateOnErrorProps) => {
  const router = useRouter();

  watch(isError, (newVal) => {
    if (newVal) {
      if (displayMessage) {
        toast.error(message);
      }
      router.push(path);
    }
  });

  return { isError };
};

export default useNavigateOnError;
