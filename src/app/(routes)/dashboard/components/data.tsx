import { Building, CheckCircle, Home, Route, Truck } from "lucide-react";
import { FaCity } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";

export const navItems: { title: string; href: string; icon?: any }[] = [
  { title: "Dashbaord", href: "/dashboard", icon: <Home /> },
  { title: "Companies", href: "/dashboard/companies", icon: <FaCity /> },
  { title: "Drivers", href: "/dashboard/drivers", icon: <MdPeopleAlt /> },
  { title: "Trucks", href: "/dashboard/trucks", icon: <Truck /> },
  {
    title: "Checkpoints",
    href: "/dashboard/checkpoints",
    icon: <CheckCircle />,
  },
  { title: "Routes", href: "/dashboard/routes", icon: <Route /> },
  { title: "Towns", href: "/dashboard/towns", icon: <Building /> },
];
