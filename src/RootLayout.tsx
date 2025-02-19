import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full flex-col md:flex">
      <section className="flex h-full flex-1">
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
