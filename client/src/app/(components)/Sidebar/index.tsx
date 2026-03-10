"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { Archive, CircleDollarSign, Clipboard, Layout, LucideIcon, Menu, SlidersHorizontal, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarLinksProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isSidebarCollapsed: boolean;
}

const SidebarLinks = ({
  href,
  icon: Icon,
  label,
  isSidebarCollapsed,
}: SidebarLinksProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isSidebarCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
          hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
            isActive ? "text-white bg-blue-200" : ""
          }`}
      >
        <Icon className="w-5 h-5 !text-gray-700" />

        <span
          className={`${isSidebarCollapsed ? "hidden" : "block"} text-gray-700 font-medium`}
        >
          {label}
        </span>
      </div>
    </Link>
  );};


export default function Sidebar() {

  
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  )

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  }

  const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

    return (
      <div className={sidebarClassNames}>
        {/* Top Logo */}
        <div
          className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? "px-5" : "px-9"}`}
        >
          <Image
            src="https://s3-stockify-bucket.s3.eu-north-1.amazonaws.com/logo+(1).png"
            alt="stockify-logo"
            width={27}
            height={27}
            className="rounded w-8"
          />
          <h1
            className={`${isSidebarCollapsed ? "hidden" : "block"} font-extrabold text-2xl`}
          >
            STOCKIFY
          </h1>
          <button
            className="md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100"
            onClick={toggleSidebar}
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-grow mt-8">
          <SidebarLinks
            href="/dashboard"
            icon={Layout}
            label="Dashboard"
            isSidebarCollapsed={isSidebarCollapsed}
          />
          <SidebarLinks
            href="/inventory"
            icon={Archive}
            label="Inventory"
            isSidebarCollapsed={isSidebarCollapsed}
          />
          <SidebarLinks
            href="/products"
            icon={Clipboard}
            label="Products"
            isSidebarCollapsed={isSidebarCollapsed}
          />
          <SidebarLinks
            href="/users"
            icon={User}
            label="Users"
            isSidebarCollapsed={isSidebarCollapsed}
          />
          <SidebarLinks
            href="/settings"
            icon={SlidersHorizontal}
            label="Settings"
            isSidebarCollapsed={isSidebarCollapsed}
          />
          <SidebarLinks
            href="/expenses"
            icon={CircleDollarSign}
            label="Expenses"
            isSidebarCollapsed={isSidebarCollapsed}
          />
        </div>

        {/* Footer */}
        <div className={`${isSidebarCollapsed ? `hidden` : `block`} mb-10`}>
          <p className="text-center text-xs text-gray-500">
            &copy; 2025 Stockify
          </p>
        </div>
      </div>
    );
}