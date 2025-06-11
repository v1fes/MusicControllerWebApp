import React from "react";
import RoomJoinPage from "./RoomJoinPage";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "RoomJoinPage",
  component: RoomJoinPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = () => <RoomJoinPage />;

// Варіант з помилкою (симуляція через state)
export const WithError = () => {
  const pageRef = React.useRef();

  React.useEffect(() => {
    if (pageRef.current) {
      pageRef.current.setState({
        roomCode: "",
        error: "Room not found.",
      });
    }
  }, []);

  return <RoomJoinPage ref={pageRef} />;
};
