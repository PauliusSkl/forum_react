import React, { useState } from "react";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import CreateTopic from "./CreateTopic";
const HeaderWithFunctionality = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSignup, setIsOpenSignup] = useState(false);
  const [isOpenedCreateTopic, setIsOpenedCreateTopic] = useState(false);

  return (
    <>
      <Header
        openLogin={() => setIsOpen(true)}
        openRegister={() => setIsOpenSignup(true)}
        openCreateTopic={() => setIsOpenedCreateTopic(true)}
      />
      <Login open={isOpen} onClose={() => setIsOpen(false)} />
      <Register open={isOpenSignup} onClose={() => setIsOpenSignup(false)} />
      <CreateTopic
        open={isOpenedCreateTopic}
        onClose={() => setIsOpenedCreateTopic(false)}
        onChange={onChange}
      />
    </>
  );
};

export default HeaderWithFunctionality;
