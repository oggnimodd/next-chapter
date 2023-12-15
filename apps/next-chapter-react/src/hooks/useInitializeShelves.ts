import { useEffect } from "react";
import { api } from "trpc";

const useInitializeShelves = () => {
  const { data: shelves, isLoading } = api.shelf.getAll.useQuery();
  const { mutate: initialize } = api.shelf.generateInitialShelves.useMutation();

  useEffect(() => {
    if (!isLoading && shelves?.length === 0) {
      initialize();
    }
  }, [shelves, isLoading]);
};

export default useInitializeShelves;
