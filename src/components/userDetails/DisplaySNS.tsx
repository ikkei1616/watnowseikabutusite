import type { UserDetail } from "@/types/User";
import { GITHUB_URL, INSTAGRAM_URL, X_URL } from "@/const";
import ItemList from "@/components/ItemList";
import Item from "@/components/Item";

interface DisplaySNSProps
  extends Pick<UserDetail, "githubID" | "instagramID" | "xID"> {}

const DisplaySNS = ({ user }: { user: DisplaySNSProps }) => {
  return (
    <ItemList>
      {user.githubID && (
        <Item
          text={`@${user.githubID}`}
          href={`${GITHUB_URL}${user.githubID}`}
          src={"/github.svg"}
          alt={"GitHubのアイコン"}
        />
      )}
      {user.xID && (
        <Item
          text={`@${user.xID}hgeohogheogheoghoehg`}
          href={`${X_URL}${user.xID}`}
          src={"/x.svg"}
          alt={"xのアイコン"}
        />
      )}
      {user.instagramID && (
        <Item
          text={`@${user.instagramID}`}
          href={`${INSTAGRAM_URL}${user.instagramID}`}
          src={"/instagram.png"}
          alt={"Instagramのアイコン"}
        />
      )}
    </ItemList>
  );
};

export default DisplaySNS;
