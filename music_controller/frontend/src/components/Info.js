import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, IconButton } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

/**
 * Інформаційна сторінка про функціонал House Party.
 * Відображає опис для сторінок "Join a Room" та "Create a Room", дозволяє перемикатись між ними.
 *
 * @component
 * @example
 * return (
 *   <Info />
 * )
 */
export default function Info(props) {
  const [page, setPage] = useState(pages.JOIN);

  /**
 * Повертає опис сторінки підключення до кімнати.
 * @returns {string}
 */
  function joinInfo() {
    return "The 'Join a Room' page allows users to enter a room code to join an existing room where they can listen to music together.";
  }

/**
 * Повертає опис сторінки створення кімнати.
 * @returns {string}
 */
  function createInfo() {
    return "The 'Create a Room' page lets users set up a new room where they can control playback and invite others to join.";
  }

  useEffect(() => {
    console.log("ran");
    return () => console.log("cleanup");
  });

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          What is House Party?
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1">
          {page === pages.JOIN ? joinInfo() : createInfo()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton
          onClick={() => {
            page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE);
          }}
        >
          {page === pages.CREATE ? (
            <NavigateBeforeIcon />
          ) : (
            <NavigateNextIcon />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}