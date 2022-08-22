import { Card, List } from "@mui/material";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function Item(props: any) {
  return (
    <ListItem>
      <Card
        sx={{
          p: 0,
          paddingTop: 1,
          width: 420,
          margin: "auto",
          backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
        }}
      >
        <Grid container spacing={0}>
          <Grid item>
            <Img sx={{ width: 100, height: 100 }} alt="complex" src={props.url} />
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" component="div">
              {props.name}
            </Typography>
            <Rating name="read-only" value={4.5} precision={0.5} readOnly size="small" />
            <Typography variant="subtitle2" component="div">
              <b style={{ fontSize: "16px" }}>$ {props.price}</b>{" "}
            </Typography>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={3}>
              <Typography variant="body2">Color {props.color}</Typography>
              <Typography variant="body2" color="text.secondary">
                Size: <Typography variant="overline">US7</Typography>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </ListItem>
  );
}

export default function Summary(props: any) {
  const items = props.orderDetails;
  return (
    <List>
      {items.map((e, i) => (
        <Item key={i} {...e} />
      ))}
    </List>
  );
}
