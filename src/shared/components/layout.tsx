import React from "react";
import Header from "./header";
import Footer from "./footer";
import MenuSidebar from "./menu-sidebar";
import AdminMenuSidebar from "./menu-admin-sidebar";
import { useUser } from "../hooks/use-user";

interface LayoutProps {
  children: React.ReactNode;
  withFooter?: boolean;
  withLayout?: boolean;
}

const Layout = ({
  children,
  withLayout = true,
  withFooter = true,
}: LayoutProps) => {
  const { data: user } = useUser();
  if (!withLayout) return children;

  return (
    <div className="max-w-[500px] mx-auto">
      <Header />
      {children}
      {withFooter && <Footer />}
      <MenuSidebar />
      {user?.isAdmin && <AdminMenuSidebar />}
    </div>
  );
};

export default Layout;
