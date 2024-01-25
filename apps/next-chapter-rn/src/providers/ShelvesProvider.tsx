import { useInitializeShelves } from "@/hooks";

interface ShelvesProviderProps {
  children: React.ReactNode;
}

const ShelvesProvider: React.FC<ShelvesProviderProps> = ({ children }) => {
  useInitializeShelves();

  return <>{children}</>;
};

export default ShelvesProvider;
