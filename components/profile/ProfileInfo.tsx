import P from "../ui/text/P";

import { formatDateConverter } from "@/utils/utils";
import Link from "next/link";
import { FC } from "react";
import Avatar from "../ui/Avatar";
import { buttonVariants } from "../ui/button/Button";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface ProfileInfoProps {
  email: string | null | undefined;
  name: string | null | undefined;
  image: string | null | undefined;
  createdAt: Date | null | undefined;
  postAmount: number | null | undefined;
  communityAmount: number | null | undefined;
}

export default async function ProfileInfo({
  email,
  name,
  image,
  createdAt,
  postAmount,
  communityAmount,
}: ProfileInfoProps) {
  const session: Session | null = await getServerSession(authOptions);
  return (
    <>
      <div className="flex items-end gap-small">
        <Avatar
          size={5}
          className="h-[50px] rounded-small"
          src={image}
        ></Avatar>
        <P className="w-full whitespace-nowrap font-medium laptop:block">
          u/{name}
        </P>
      </div>
      <hr className=" border border-primary80 opacity-20 dark:border-primary10"></hr>

      <div className="flex flex-col gap-extra-small">
        <P className="font-medium">Cake day</P>
        <P>{createdAt ? formatDateConverter(createdAt) : null}</P>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-extra-small">
          <P className="flex gap-extra-small">
            <span className="font-medium">{postAmount}</span> Post
          </P>
        </div>
        <div className="flex flex-col gap-extra-small">
          <P className="flex gap-extra-small">
            <span className="font-medium">{communityAmount}</span> Communities
          </P>
        </div>
      </div>
      {session?.user?.email !== email || !session ? (
        <div>
          <hr className=" border border-primary80 opacity-20 dark:border-primary10"></hr>
          <Link
            href="/create/post"
            // className="brutalism-border border-primary80 rounded-extra-small button--small text-center bg-primary10 text-primary80 primary-hover"
            className={buttonVariants({
              intent: "pastelPrimary",
              size: "small",
              modifier: "brutalism",
              rounded: "small",
              hover: true,
            })}
          >
            Create a post
          </Link>
          <Link
            href="/create/community"
            // className="brutalism-border border-primary80 rounded-extra-small button--small text-center bg-primary10 text-primary80 primary-hover"
            className={buttonVariants({
              size: "small",
              intent: "primary",
              modifier: "brutalism",
              transparent: true,
              hover: true,
              rounded: "small",
            })}
          >
            Create a community
          </Link>
        </div>
      ) : null}
    </>
  );
}
