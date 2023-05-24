import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { UserForm } from "./components/ConnectionManager";
import { ChatForm } from "./components/MyForm";
import { MessageList } from "./components/MessageList";
import RecordForm from "./components/RecordForm";

import "./App.css";

export default function App() {
  const [userId, setUserId] = useState("");

  return (
    <Routes>
      <Route
        path="/"
        element={<UserForm userId={userId} setUserId={setUserId} />}
      />
      <Route path="/Record" element={<RecordForm />} />
      <Route
        path="/chat"
        element={
          userId !== "" ? (
            <div>
              <ChatForm userId={userId} />
              <MessageList />
            </div>
          ) : (
            <div>
              <h3>GO TO: localhost:3000/ to login</h3>
            </div>
          )
        }
      />
    </Routes>
  );
}
