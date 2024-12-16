import { Fab, Grid } from "@mui/material";
import React from "react";
import ToDo from "../components/Todo";
import { useCurrentToDoList, useGetToDoList } from "../hooks/ToDoList";
import { Add } from "@mui/icons-material";
import { useStoreToDoMutateTask } from "../hooks/ToDo";

/** スタイル */
const fabStyle = {
  position: "fixed",
  bottom: 16,
  right: 16,
};

function Home() {
  /** ToDo追加イベント */
  const { storeToDoMutation } = useStoreToDoMutateTask();
  const eventStoreToDo = (event) => {
    storeToDoMutation.mutate();
  };

  const { isLoading } = useGetToDoList();
  const toDoList = useCurrentToDoList();
  if (isLoading) return "Now Loading...";
  return (
    <>
      <Grid container spacing={2}>
        {toDoList.map((toDo) => (
          <Grid item key={toDo.id} xs={12} sm={6} md={4} xl={3}>
            <ToDo toDo={toDo} />
          </Grid>
        ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        sx={fabStyle}
        onClick={eventStoreToDo}
      >
        <Add />
      </Fab>
    </>
  );
}

export default Home;
