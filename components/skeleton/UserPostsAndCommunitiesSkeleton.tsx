import Button from "../ui/button/Button";
import SnippetSkeleton from "./SnippetSkeleton";
import { v4 as uuidv4 } from "uuid";

export default function UserPostsAndCommunitiesSkeleton({
  postAmount,
  communityAmount,
  showContent,
}: {
  postAmount: number;
  communityAmount: number;
  showContent: "posts" | "communities";
}) {
  const PostSnippetSkeletons = () => {
    const skeletonElements = [];
    for (let i = 0; i < postAmount; i++) {
      skeletonElements.push(<SnippetSkeleton key={uuidv4()} />);
    }
    return skeletonElements;
  };

  const CommunitySnippetSkeletons = () => {
    const skeletonElements = [];
    for (let i = 0; i < postAmount; i++) {
      skeletonElements.push(<SnippetSkeleton key={uuidv4()} />);
    }
    return skeletonElements;
  };

  return (
    <section className="flex w-full animate-pulse flex-col gap-sub-large laptop:w-[600px]">
      <div>
        <div className="brutalism-border flex h-[60px] w-full justify-between overflow-hidden rounded-medium border-primary80   text-primary80 dark:border-primary1 dark:bg-primary80 dark:text-primary1">
          <Button
            disabled={true}
            intent="pastelPrimary"
            size="small"
            transparent={showContent === "posts" ? false : true}
            className=" h-full w-1/2 rounded-l-small border-r dark:border-primary1"
          ></Button>
          <Button
            disabled={true}
            intent="pastelPrimary"
            size="small"
            transparent={showContent === "communities" ? false : true}
            className="h-full w-1/2 rounded-r-small border-l dark:border-primary1"
          ></Button>
        </div>
        <div className="ml-small">
          <div className="brutalism-border flex h-[60px] w-1/4 justify-center  overflow-hidden rounded-b-medium border-primary80 border-t-transparent   text-primary80 dark:border-primary1 dark:bg-primary80 dark:text-primary1"></div>
        </div>
      </div>
      <ul className="flex  w-full flex-col  justify-center gap-sub-large">
        {showContent === "posts"
          ? PostSnippetSkeletons()
          : CommunitySnippetSkeletons()}
      </ul>
    </section>
  );
}
