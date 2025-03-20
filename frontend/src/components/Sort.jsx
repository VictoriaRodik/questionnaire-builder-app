import { MenuItem, Select } from "@mui/material";

const Sort = ({ value, options, onChange }) => {
  return (
    <Select value={value} onChange={onChange} displayEmpty sx={{ mt: 4 }} fullWidth>
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {`Sorting by ${opt.label}`}
        </MenuItem>
      ))}
    </Select>
  );
};

export default Sort;
