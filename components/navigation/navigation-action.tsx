"use client";
import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/shares/action-tooltip";

export const NavigationAction = () => {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add to server">
        
        {/* onclick TODO */}
        <button onClick={() => {}} className="group flex items-center">
          <div
            className="flex h-[48px] w-[48px] mx-3
             items-center justify-center rounded-[24px]
             group-hover:rounded-[16px] group-hover:bg-emerald-700 transition-all
             bg-background dark:bg-neutral-700 overflow-hidden
             "
          >
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={24}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
