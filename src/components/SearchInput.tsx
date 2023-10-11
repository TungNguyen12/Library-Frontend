import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const SearchInput: React.FC<{
    handleSearchProduct: (e: React.ChangeEvent<any>) => void;
}> = ({ handleSearchProduct }) => {
    return (
        <Box
            sx={{
                width: 500,
                maxWidth: "100%",
            }}
        >
            <TextField
                fullWidth
                label="Search products"
                id="fullWidth"
                onChange={(e: React.ChangeEvent<any>) => handleSearchProduct(e)}
            />
        </Box>
    );
};

export default SearchInput;
