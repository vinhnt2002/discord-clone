import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <div className="h-full ">
        <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
            <NavigationSidebar/>

            <main className="md:pl-[72px] h-full">
                {children}
            </main>
        </div>
    </div>
  );
}
