"use client";

import { FC, useState } from "react";
import Button from "../ui/button/Button";
import LogInModal from "./LogInModal";
import { useSearchParams } from "next/navigation";

const Login: FC = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(
    searchParams.get("modal") === "signin" ? true : false,
  );

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="sub-heading brutalism-border flex items-center justify-center gap-extra-small rounded-full border-primary80  bg-white px-sub-medium py-small font-medium dark:border-primary1 dark:bg-primary70"
      >
        Login
      </Button>
      <LogInModal isOpen={isOpen} setIsOpen={setIsOpen}></LogInModal>
    </>
  );
};

export default Login;
