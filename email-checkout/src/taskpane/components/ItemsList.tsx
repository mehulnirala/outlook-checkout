import { Divider, Typography } from "@mui/material";
import List from "@mui/material/List";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/system/Box";
import * as React from "react";
import Item from "./Item";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export default function ItemsList(props: any) {
  const [items, setItems] = React.useState(props.orderDetails);

  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newItems = [...items];
    newItems[index].selected = event.target.checked;
    setItems(newItems);
    props.setOrderDetails(newItems);
  };
  const selectedItems = items.filter((e) => e.selected);
  const total =
    selectedItems && selectedItems.length > 0 ? selectedItems.map((e) => e.price).reduce((a, b) => a + b) : 0;
  const oldTotal =
    selectedItems && selectedItems.length > 0 ? selectedItems.map((e) => e.oldPrice).reduce((a, b) => a + b) : 0;
  const percent = total > 0 ? Math.round((100 * (total - oldTotal)) / oldTotal) : 0;
  return (
    <div>
      <Slide
        in={true}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${transitionDuration.exit}ms`,
          right: 0,
        }}
      >
        <Box>
          <List>
            {items.map((e, i) => (
              <Item key={i} {...e} handleToggle={(e) => handleToggle(e, i)} />
            ))}
          </List>
          <Box sx={{ textAlign: "right", mr: 3, mt: 2 }}>
            <Typography>
              Total: <b>$ {total}</b>
            </Typography>
            <Typography variant="subtitle2">
              <i>
                You save: <b>$ {Math.round(oldTotal - total)}</b> ({percent}%)
              </i>
            </Typography>
          </Box>
        </Box>
      </Slide>
    </div>
  );
}
