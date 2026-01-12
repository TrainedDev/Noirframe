import React from "react";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Cross,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { useDispatch } from "react-redux";
import { storeBoolean } from "@/Redux/Slices/componentSlice";
const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Search", url: "/movie/search/lists", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

const AppSidebar = () => {
  
  const dispatch = useDispatch();

  return (
    <Sidebar className={"w-full h-full left-68 bg-neutral-900 gap-40 text-white"}>
      <SidebarContent className="w-full h-full">
        {/* width can be adjusted */}
        <SidebarGroup>
          <SidebarGroupLabel className={"flex justify-between text-white/70 font-bold capitalize text-2xl h-15"}>
            <h1 className="text-red-600">noirframe</h1>
            <button
              onClick={() => dispatch(storeBoolean({ appSideBar: false }))}
            >
              <Cross className="-rotate-45 cursor-pointer duration-800 hover:rotate-180"/>
            </button>
          </SidebarGroupLabel>

          <SidebarMenu >
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 px-3 py-5 hover:bg-transparent hover:text-red-600 "
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
