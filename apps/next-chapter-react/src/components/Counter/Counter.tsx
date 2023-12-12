import { Button, Typography } from "@mui/material";
import { useCountStore } from "stores";

const Counter = () => {
  const count = useCountStore((state) => state.count);
  const { increment, decrement } = useCountStore();

  return (
    <div className="w-full flex items-center justify-center flex-col gap-3">
      <Typography className="text-2xl font-bold">{count}</Typography>
      <div className="flex gap-x-3">
        <Button color="primary" variant="contained" onClick={decrement}>
          {" "}
          Count Down
        </Button>
        <Button color="primary" variant="contained" onClick={increment}>
          {" "}
          Count Up
        </Button>
      </div>
    </div>
  );
};

export default Counter;
