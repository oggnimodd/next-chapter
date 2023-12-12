import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { top100Films } from "./data";

const SelectMovie = () => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      className="w-full max-w-[300px]"
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
};

export default SelectMovie;
