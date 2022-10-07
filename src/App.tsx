import "./App.css";
import { Routes, Route, Outlet } from "react-router";
import BirthdayCardFactory from "components/BirthdayCardFactory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route
          index
          element={
            <BirthdayCardFactory
              textures={{
                leftOutside: "textures/left-outside.jpg",
                rightInside: "textures/right-inside.jpg",
              }}
              balloonColors={["red", "pink", "green"]}
            />
          }
        />
        <Route
          path="paddy"
          element={
            <BirthdayCardFactory
              textures={{
                leftOutside: "textures/paddy/left-outside.jpg",
                rightInside: "textures/paddy/right-inside.jpg",
              }}
              balloonColors={["red", "yellow", "green"]}
            />
          }
        />
        <Route
          path="mags"
          element={
            <BirthdayCardFactory
              textures={{
                leftOutside: "textures/mags/left-outside.jpg",
                rightInside: "textures/mags/right-inside.jpg",
              }}
              balloonColors={["orange", "blue", "purple"]}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
