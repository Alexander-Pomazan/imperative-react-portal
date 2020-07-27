import React from "react";

import { ImperativeRenderProvider } from "./imperative-render-context";
import { Paper, Box } from "@material-ui/core";
import { TodoList } from "./todo-list";

function App() {
  return (
    <ImperativeRenderProvider>
      <Box maxWidth={400} width="90%" marginX="auto" marginTop="20vh">
        <Paper>
          <Box margin={4}>
            <TodoList />
          </Box>
        </Paper>
      </Box>
    </ImperativeRenderProvider>
  );
}

export default App;
