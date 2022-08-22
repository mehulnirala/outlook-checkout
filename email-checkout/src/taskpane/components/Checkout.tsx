import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { getCheckoutObject } from "../utilities";
import Progress from "./Progress";

export default function Checkout(props: any) {
  const [loading, setLoading] = useState(false);
  const [url, setURL] = useState('');

  const numItems = props.orderDetails ? props.orderDetails.length : 0;

  useEffect(() => {
    if (numItems > 0) {
      setLoading(true);
      getCheckoutObject(props.orderDetails)
        .then((url: string) => {
          setURL(url);
          setLoading(false);
          setTimeout(() => props.goToNext(), 5000);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, []);
console.log(url, loading);

  return (
    <div className="container" style={numItems > 0 ? {} : { maxWidth: "500px", display: "flex" }}>
      {numItems > 0 ? (
        <Box sx={{ p: 2, margin: "0 auto", display: "flex", flexDirection: "column", textAlign: "center" }}>
          {loading ? (
            <div>
              <br />
              <Progress message="Waiting to create checkout." />
            </div>
          ) : (
            <div className="justify-content-center">
              <Button href={url} sx={{ m:3 }} variant="contained">Checkout</Button>
            </div>
          )}
          
        </Box>
      ) : (
        <Box sx={{ p: 2, margin: "0 auto", display: "flex", flexDirection: "column", textAlign: "center" }}>
          <img src={"/assets/empty-kart2.png"} width={"250px"} />
          <Typography variant="caption">Add some items in your cart !</Typography>
        </Box>
      )}
    </div>
  );
}
