import React from "react";

import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen w-full bg-gray-50">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
