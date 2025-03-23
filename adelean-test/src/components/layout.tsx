import { Menubar } from "primereact/menubar";
import { Outlet, useNavigate } from "react-router";

export const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="p-2 flex flex-col gap-2">
      <Menubar
        model={[
          {
            id: "home",
            style: {
              fontWeight: "bold",
            },
            label: "Adelean",
            command: () => {
              navigate("/");
            },
          },
        ]}
      />
      <Outlet />
    </div>
  );
};
