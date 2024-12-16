import { Card, CardActions, CardContent, IconButton, List, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDeleteToDoMutateTask, useUpdateToDoMutateTask } from "../hooks/ToDo"
import ToDoDetail from "./ToDoDetail";
import { AddCircle, Delete } from "@mui/icons-material";
import { useStoreToDoDetailMutateTask } from "../hooks/ToDoDetail";

function ToDo(props) {
  const [timer, setTimer] = useState(null);
  let toDo = {
    id: props.toDo.id,
    title: props.toDo.title,
  };

  /** 名称変更イベント */
  const { updateToDoMutation } = useUpdateToDoMutateTask();
  const eventUpdateTodo = (event) => {
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      let data = {
        ...toDo,
        title: event.target.value,
      };
      updateToDoMutation.mutate(data);
    }, 500);
    setTimer(newTimer);
  };

  /** 削除イベント */
  const { deleteToDoMutation } = useDeleteToDoMutateTask();
  const eventDeleteTodo = (event) => {
    deleteToDoMutation.mutate(toDo);
  }

  /** ToDoDetail追加イベント */
  const { storeToDoDetailMutation } = useStoreToDoDetailMutateTask();
  const eventStoreToDoDetail = (event) => {
    storeToDoDetailMutation.mutate(toDo);
  }

  return (
    <Card>
      <TextField
        variant="standard"
        margine="dense"
        defaultValue={props.toDo.title}
        fullWidth
        onChange={eventUpdateTodo}
      />
      <CardContent>
        <List>
          {props.toDo.to_do_details.map((detail) => {
            return <ToDoDetail key={detail.id} detail={detail} />;
          })}
        </List>
      </CardContent>
      <CardActions>
        <IconButton
          edge="start"
          aria-label="add"
          color="primary"
          onClick={eventStoreToDoDetail}
        >
          <AddCircle />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={eventDeleteTodo}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ToDo;
