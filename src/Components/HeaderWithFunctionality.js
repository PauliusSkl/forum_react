import React, { useState } from "react";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";

const HeaderWithFunctionality = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSignup, setIsOpenSignup] = useState(false);

  return (
    <>
      <Header
        openLogin={() => setIsOpen(true)}
        openRegister={() => setIsOpenSignup(true)}
      />
      <Login open={isOpen} onClose={() => setIsOpen(false)} />
      <Register open={isOpenSignup} onClose={() => setIsOpenSignup(false)} />
    </>
  );
};

export default HeaderWithFunctionality;
