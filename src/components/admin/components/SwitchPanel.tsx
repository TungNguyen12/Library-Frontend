import { Stack, ListItem, Button } from "@mui/material";
import React from "react";

const SwitchPanel: React.FC<any> = ({ handleOpenProduct, handleOpenUser }) => {
    return (
        <Stack>
            <ListItem>
                <Button onClick={handleOpenProduct}>Product control</Button>
            </ListItem>
            <ListItem>
                <Button onClick={handleOpenUser}>User control</Button>
            </ListItem>
        </Stack>
    );
};

export default SwitchPanel;
