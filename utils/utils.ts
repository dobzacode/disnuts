import { HfInference } from "@huggingface/inference";
import { Community, User } from "@prisma/client";
import { ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

const hf = new HfInference(process.env.HF_TOKEN);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateDifference(dateString: Date): string {
  const currentDate: Date = new Date();
  const inputDate: Date = new Date(dateString);

  const differenceInMilliseconds: number =
    currentDate.getTime() - inputDate.getTime();

  const differenceInDays: number = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24),
  );
  const differenceInMonths: number = Math.floor(differenceInDays / 30);
  const differenceInYears: number = Math.floor(differenceInMonths / 12);

  if (differenceInYears > 0) {
    return `${differenceInYears} year${differenceInYears > 1 ? "s" : ""} ago`;
  } else if (differenceInMonths > 0) {
    return `${differenceInMonths} month${
      differenceInMonths > 1 ? "s" : ""
    } ago`;
  } else if (differenceInDays > 0) {
    return `${differenceInDays} day${differenceInDays > 1 ? "s" : ""} ago`;
  } else return `Today`;
}

export function formatDateConverter(dateString: Date) {
  const formattedDate = format(new Date(dateString), "MMMM dd, yyyy");
  return formattedDate;
}

export function countSections(element: HTMLElement | null): number {
  let numb;
  if (element) {
    const sections = element.querySelectorAll("section");
    numb = sections.length;
  } else {
    numb = 0;
  }
  return numb;
}

export async function getUserInformation() {
  const session: Session | null = await getSession();
  if (!session) return null;
  const res = await fetch(
    `/api/user/getuserinformation?email=${session?.user?.email}`,
  );
  const { user }: { user: User } = await res.json();
  return user;
}

export default async function getUserCommunities() {
  const session: Session | null = await getSession();
  const data = await fetch(`/api/communities?email=${session?.user?.email}`);
  const userCommunities: { communities: Community[] } = await data.json();

  const communityNames: string[] = userCommunities.communities.map(
    (community) => community.name,
  );

  return communityNames;
}

export async function zeroShotClassify(input: string[], parameters: string[]) {
  return await hf.zeroShotClassification({
    model: "facebook/bart-large-mnli",
    inputs: input,
    parameters: { candidate_labels: parameters },
  });
}

export async function uploadMedia(file: File) {
  try {
    const res = await fetch(`${BASE_URL}/api/media`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      }),
    });

    const { putUrl, getUrl } = await res.json();

    console.log(putUrl);

    const uploadResponse = await fetch(putUrl, {
      body: file,
      method: "PUT",
      headers: { "Content-Type": file.type },
    });

    return { status: uploadResponse.ok, uploadedUrl: getUrl };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL
    : "http://localhost:3000";
