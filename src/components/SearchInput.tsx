import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputBase, alpha, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

const SearchInput: React.FC<{
    handleSearchProduct: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSearchProduct(e)
                }
            />
        </Box>
    );
};

export default SearchInput;
