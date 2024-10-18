"use client"
import {Navbar, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const path = usePathname()

  return (
    <Navbar isBordered>
      <NavbarContent>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row">
      <NavbarItem>
          <Button as={Link} href="/dashboard/livro/" variant="light" color={path === "/dashboard/livro/" ? "primary" : "default"}>
            Livro
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/dashboard/cautelas/" variant="light" color={path === "/dashboard/cautelas/" ? "primary" : "default"}>
            Cautelas
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/dashboard/materiais/" variant="light" color={path === "/dashboard/materiais/" ? "primary" : "default"}>
            Materiais
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/dashboard/militares/" variant="light" color={path === "/dashboard/militares/" ? "primary" : "default"}>
            Militares
          </Button>
        </NavbarItem>
        </div>
        <NavbarItem>
          <Button as={Link} color="danger" variant="light" href="/" >
          Fechar Livro
          </Button>
        </NavbarItem>
        </div>
      </NavbarContent>
    </Navbar>
  );
}