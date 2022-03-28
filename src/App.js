import { Outlet } from "react-router-dom";
import Menu from "./components/Menu";
function App() {
  return (
    <div>
      <h1>App</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Menu />
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
