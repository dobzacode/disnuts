"use client";

import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { signIn } from "next-auth/react";
import Modal from "../div/Modal";
import H2 from "../text/H2";
import Form from "../form/Form";
import PopUp from "../div/PopUp";

export default function NewCommunityModal({}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  }, [isSuccess]);
  return (
    <>
      <Button
        onClick={() => openModal()}
        customCSS="bg-white gap-extra-small sub-heading font-medium rounded-full flex justify-center items-center  brutalism-border px-sub-medium py-small border-primary80"
      >
        Create a community
      </Button>
      <Modal
        title="New community"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Form
          setIsSuccess={() => setIsSuccess(true)}
          setIsOpen={() => setIsOpen(false)}
          theme="secondary"
        ></Form>
      </Modal>
      <PopUp isSuccess={isSuccess}>
        <H2 type="sub-heading" textColor="text-success90">
          Your community was successfully created
        </H2>
      </PopUp>
    </>
  );
}
