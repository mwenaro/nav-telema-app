import React from "react";
// import { Nav, NavItem, Link } from 'react-nav-link';
import {  Route, Truck } from "lucide-react";
import Link from "next/link";

const SidebarNavigation: React.FC = () => {
  return (
    <nav>
      <Link href="/">
        
        <Truck />
        Home
      </Link>

      <Link href="/companies">
        <Route />
        Companies
      </Link>

      <Link href="/trucks">
        <Truck />
        Trucking
      </Link>

      <Link href="/routes">
        <Route />
        Routes
      </Link>
    </nav>
  );
};

export default SidebarNavigation;
