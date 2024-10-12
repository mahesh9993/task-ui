import React, { useState } from "react";
import NavBar from "./NavBar";
import TaskTable from "./TaskTable";

function HomePage() {
  const [searchTerm, setsearchTerm] = useState("");
  return (
    <div>
      <NavBar searchTerm={searchTerm} onSearch={setsearchTerm} />
      <TaskTable searchTerm={searchTerm} />
    </div>
  );
}

export default HomePage;
