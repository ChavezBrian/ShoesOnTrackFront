"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const PageModify = () => {
  const user = useSelector((state) => state.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!user?.isAdmin) window.location.href = "/";
    else setIsClient(true);
  }, [user]);

  return <div></div>;
};

export default PageModify;
