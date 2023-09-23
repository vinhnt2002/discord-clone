
import { Menu, icons } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationSidebar } from "../navigation/navigation-sidebar";
import { Button } from "../ui/button";
import { ServerSidebar } from "../server/server-sidebar";

interface MobileToggleProps {
    serverId: string
}
const MobileToggle = ({serverId}: MobileToggleProps) => {
  return (
    <div>
      <Sheet >
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0 flex gap-0">
          <div className="w-[72px]">
             <NavigationSidebar/>
          </div>
            <ServerSidebar serverId={serverId}/>
        </SheetContent>
      </Sheet>
    </div>
  );
};  

export default MobileToggle;
