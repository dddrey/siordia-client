import React from "react";
import Layout from "../layout";
import { cn } from "../../utils/cn";

interface ContentWrapperProps {
  className?: string;
  children: React.ReactNode;
  withLayout?: boolean;
  withFooter?: boolean;
}

const ContentWrapper = ({
  children,
  className,
  withLayout = true,
  withFooter = true,
}: ContentWrapperProps) => {
  return (
    <Layout withLayout={withLayout} withFooter={withFooter}>
      <main className={cn("min-h-screen bg-primary", className)}>
        {children}
      </main>
    </Layout>
  );
};

export default ContentWrapper;
