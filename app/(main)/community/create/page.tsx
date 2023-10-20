"use client";

import CommunityForm from "@/components/community/CommunityForm";
import PopUp from "@/components/ui/div/PopUp";
import H2 from "@/components/ui/text/H2";
import { useEffect, useState } from "react";

export default function CreatePost({}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  }, [isSuccess]);

  return (
    <>
      <section className="flex justify-center ">
        <CommunityForm
          isModal={false}
          theme="primary"
          title="Create community"
          setIsSuccess={() => setIsSuccess(true)}
        ></CommunityForm>
      </section>
      <PopUp isSuccess={isSuccess}>
        <H2 type="sub-heading" textColor="text-success90">
          Your community was successfully created
        </H2>
      </PopUp>
    </>
  );
}