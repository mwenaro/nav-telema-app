import { Building, CheckCircle, Home, Route, Truck } from "lucide-react";
import { FaCity } from "react-icons/fa";

export  const navItems: { title: string; href: string; icon?: any }[] = [
    { title: "Dashbaord", href: "/dashboard", icon: <Home /> },
    { title: "Companies", href: "/dashboard/companys", icon: <FaCity /> },
    { title: "Trucks", href: "/dashboard/trucks", icon: <Truck /> },
    {
      title: "Checkpoints",
      href: "/dashboard/checkpoints",
      icon: <CheckCircle />,
    },
    { title: "Routes", href: "/dashboard/routes", icon: <Route /> },
    { title: "Towns", href: "/dashboard/towns", icon: <Building /> },
  ];