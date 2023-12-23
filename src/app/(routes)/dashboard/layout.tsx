import { ReactNode } from "react";
import { DashboardHeader} from "./components";
import DashboardNav from "./components/DashboardNav";


type DashboardLayoutProps = {
  children: ReactNode;
  params: any;
};
export default function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  return (
    <div className="w-full flex tm-dashbaord-bg min-h-screen h-fit px-2 py-2 relative">
            <DashboardNav />
            <div className="flex-1 min-h-screen px-2">
            <DashboardHeader />
            <div className="w-full">{children}</div>
          
            </div>

 
    </div>
  );
}
