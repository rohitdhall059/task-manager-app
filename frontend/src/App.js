import "./App.css";
import React, { Suspense, lazy } from "react";

const TaskManager = lazy(() => import("./components/TaskManager"));

function App() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <TaskManager />
      </Suspense>
    </main>
  );
}

export default App;