"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Input from "../ui/form/Input";
import Label from "../ui/form/Label";

import H1 from "../ui/text/H1";

import Button from "../ui/button/Button";
import H2 from "../ui/text/H2";
import H3 from "../ui/text/H3";
import ColorDiv from "../ui/div/colorDiv";
import P from "../ui/text/P";
import { getSession } from "next-auth/react";
import { BarLoader, ClipLoader, PropagateLoader } from "react-spinners";
import { CSSTransition } from "react-transition-group";
import GenericForm from "../ui/form/GenericForm";
import { handleInputChange } from "@/utils/formUtils/handleInputChange";
import { Community } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

import { Session } from "next-auth";
import { cp } from "fs";

interface PostFormData {
  title: string;
  content: string;
  community: string;
}

export default function PostForm({
  theme,
  setIsSuccess,
  title,
}: {
  title: string;
  theme: "primary" | "secondary" | "tertiary" | "neutral";

  setIsSuccess: Function;
}) {
  const [communities, setCommunities] = useState<string[]>([""]);

  const [searchValue, setSearchValue] = useState<string>("");

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [showCommunity, setShowCommunity] = useState<boolean>(false);
  const [userCommunities, setUserCommunities] = useState<string[] | null>(null);

  const [noCommunity, setNoCommunity] = useState<boolean>(false);

  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    content: "",
    community: "",
  });

  const [isNotFound, setIsNotFound] = useState<string | null>(null);

  useEffect(() => {
    const getUserCommunities = async () => {
      const session: Session | null = await getSession();
      const data = await fetch(
        `/api/communities?email=${session?.user?.email}`
      );
      const userCommunities: { communities: Community[] } = await data.json();

      const communityNames: string[] = userCommunities.communities.map(
        (community) => community.name
      );

      setCommunities(communityNames);
      setUserCommunities(communityNames);
    };
    getUserCommunities();
  }, []);

  const handleSearch = async () => {
    if (searchValue.trim() === "") {
      if (userCommunities !== null) {
        setCommunities(userCommunities);
      }
      return;
    }

    try {
      const searchResult = await fetch(`/api/communities?name=${searchValue}`);

      const communities: { communities: Community[]; status: number } =
        await searchResult.json();

      if (communities.status === 404) {
        setFormData((prevData) => ({
          ...prevData,
          community: "",
        }));
        return setCommunities([`No community is matching`]);
      }

      console.log(communities);

      const communityNames: string[] = communities.communities.map(
        (community) => community.name
      );

      setCommunities(communityNames);

      setFormData((prevData) => ({
        ...prevData,
        community: communityNames[0],
      }));

      console.log(communities);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchCommunityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        handleSearch();
      }, 500)
    );
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    handleInputChange(e, formData, setFormData);
    console.log(formData);
    if (formData.community !== "" && noCommunity) {
      setNoCommunity(false);
    }
  };

  const handleSubmit = async () => {
    if (formData.community === "") {
      return setNoCommunity(true);
    }
    const session: Session | null = await getSession();
    const res = await fetch(`/api/posts?email=${session?.user?.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const { data } = await res.json();

    if (data.status === 404) {
      setIsNotFound(data.community);
      throw new Error("404");
    }
    setIsNotFound(null);
    return data;
  };

  return (
    <div className=" p-sub-large rounded-sub-large">
      <GenericForm
        theme={theme}
        title={title}
        formData={formData}
        onSubmit={handleSubmit}
        setIsSuccess={setIsSuccess}
      >
        {/* Incluez les champs spécifiques à CommunityForm ici */}
        <div className="flex flex-col gap-sub-medium">
          <H3 type="sub-heading">Community</H3>
          <div className="flex flex-col justify-between">
            <span onClick={() => setShowCommunity(true)}>
              <Input
                hiddenLabel={true}
                color={theme}
                type="search"
                id="communityResearch"
                value={searchValue}
                onChange={handleSearchCommunityChange}
              ></Input>
            </span>
            {isNotFound && (
              <p className="text-error40">{`r/${isNotFound} is not found`}</p>
            )}
            <CSSTransition
              in={showCommunity}
              timeout={300} // Durée de l'animation en millisecondes
              classNames="fade"
              unmountOnExit
            >
              <Input
                loader={
                  <BarLoader
                    className="absolute -right-[45%] "
                    loading={communities[0] === ""}
                  />
                }
                required
                hiddenLabel={true}
                color={theme}
                type="select"
                id="community"
                value={formData.community}
                onChange={handleChange}
                choices={communities}
              ></Input>
            </CSSTransition>
          </div>
          {noCommunity && (
            <p className="text-error40">You should chose a community</p>
          )}
        </div>
        <div className="flex flex-col gap-sub-medium">
          <H3 type="sub-heading">Title</H3>
          <Input
            required
            hiddenLabel={true}
            color={theme}
            type="text"
            flex="flex flex-col gap-small"
            id="title"
            value={formData.title}
            onChange={handleChange}
          ></Input>
        </div>
        <div className="flex flex-col gap-sub-medium">
          <H3 type="sub-heading">Content</H3>
          <Input
            required
            type="textarea"
            hiddenLabel={true}
            color={theme}
            id="content"
            value={formData.content}
            onChange={handleChange}
          ></Input>
        </div>
      </GenericForm>
    </div>
  );
}
