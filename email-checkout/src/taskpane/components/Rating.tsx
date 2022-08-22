import SendIcon from "@mui/icons-material/Send";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import LoadingButton from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export default function RadioGroupRating() {
  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  }
  return (
    <Container
      component="form"
      sx={{
        width: 500,
        maxWidth: "100%",
        p: 5,
      }}
      noValidate
      autoComplete="off"
    >
      <Stack spacing={2}>
        <Typography component="legend">Rate your experience!</Typography>
        <Rating
          name="highlight-selected-only"
          defaultValue={4}
          size="large"
          IconContainerComponent={IconContainer}
          highlightSelectedOnly
        />
        <TextField
          id="outlined-multiline-static"
          label="Send us a feedback"
          multiline
          rows={4}
          fullWidth
          defaultValue=""
        />
        <LoadingButton
          onClick={handleClick}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Send
        </LoadingButton>
        <LoadingButton color="error" loadingPosition="end" variant="outlined">
          Close
        </LoadingButton>
      </Stack>
    </Container>
  );
}
