"use client";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/shares/action-tooltip";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface NavigationItemProps {
  name: string;
  imgUrl: string;
  id: string;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  name,
  imgUrl,
  id,
}) => {
  const params = useParams();
  const router = useRouter();

  const handleClick = () =>{
    router.push(`/servers/${id}`)
  }

  return (
    <div>
      <ActionTooltip side="right" align="center" label={name}>
        {/* TODO button later  */}
        <button onClick={handleClick} className="group relative flex items-center">
          <div
            className={cn(
              "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
              params?.serverId !== id && "group-hover:h-[20px]",
              params?.serverId === id ? "h-[36px]" : "h-[8px]"
            )}
          />
          <div
            className={cn(
              "relative flex group mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
              params?.serverId === id &&
                "bg-primary/10 text-primary rounded-[16px]"
            )}
          >
            <Image fill src={imgUrl} alt="Channel" />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
