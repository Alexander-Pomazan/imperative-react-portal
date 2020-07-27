import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Todo } from "./types";
import { mockTodos } from "./mock-todos";
import { useImperativeRender } from "./imperative-render-context";
import { ConfirmationDialog } from "./confirmation-dialog";

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);

  const { renderComponent } = useImperativeRender();

  const onDeleteTodo = async (id: Todo["id"]) => {
    const isConfirmedByUser = await renderComponent<boolean>(
      ({ onResolve }) => (
        <ConfirmationDialog
          onClose={() => onResolve(false)}
          onAccept={() => onResolve(true)}
          title="Are you sure you want to delete this todo item?"
          body="Changes will be permanent. Deleted item will be lost."
        />
      )
    );

    if (!isConfirmedByUser) {
      return;
    }

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <List>
      <Typography gutterBottom variant="h6">
        Delete todos:
      </Typography>
      {todos.map((todo) => (
        <ListItem key={todo.id} button onClick={() => onDeleteTodo(todo.id)}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>{todo.title}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
