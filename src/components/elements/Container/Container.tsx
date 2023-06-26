import React, { ReactNode, useEffect, useState } from "react";

type ContainerPropType = {
  children: ReactNode;
};

const Container = ({ children }: ContainerPropType) => {
  const [isMobile, setMobile] = useState(false);

  const resize = () => {
    if (document.body.clientWidth <= 768) setMobile(true);
    if (document.body.clientWidth > 768) setMobile(false);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);
  return (
    <div
      style={{
        width: isMobile ? "95%" : document.body.clientWidth * 0.8,
        margin: "0 auto",
        height: "auto",
      }}
    >
      {children}
    </div>
  );
};

export default Container;
