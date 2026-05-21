"use client"

import * as React from "react"
import {
  Home,
  ShoppingBag,
  User,
  Lock,
  LogOut,
  ShieldCheck,
} from "lucide-react"

import { NavMain } from "@/shared/components/sidebar/nav-main"
import { NavUser } from "@/shared/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shared/components/ui/sidebar"
import { useSession } from "@/features/user/hooks/use-session"

const data = {
  navMain: [
    {
      title: "Pedidos",
      url: "/orders",
      icon: ShoppingBag,
      items: [
        {
          title: "Mis pedidos",
          url: "/orders",
        },
      ],
    },
    {
      title: "Cuenta",
      url: "/account",
      icon: User,
      items: [
        {
          title: "Perfil",
          url: "/account",
        },
        {
          title: "Cambiar contraseña",
          url: "/account?tab=password",
        },
        {
          title: "Desactivar cuenta",
          url: "/account?tab=deactivate",
        },
      ],
    },
    {
      title: "Seguridad",
      url: "/account",
      icon: ShieldCheck,
      items: [
        {
          title: "Cerrar sesión",
          url: "/logout",
        },
        {
          title: "Cerrar todas las sesiones",
          url: "/logout-all",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isLoading, userData } = useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>

          <div className="grid gap-1 px-4 py-3">
            <p className="text-sm font-semibold">Bonjour, {userData && <span>{userData.name}</span>}</p>
            <p className="text-xs text-muted-foreground">Cliente autenticado</p>
          </div>
        
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {userData && <NavUser user={userData} />} 
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
