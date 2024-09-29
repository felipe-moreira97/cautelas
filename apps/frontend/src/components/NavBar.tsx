"use client"
import {Navbar, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const path = usePathname()

  return (
    <Navbar isBordered>
      <NavbarContent>
      <NavbarItem>
          <Button as={Link} href="/dashboard/livro" variant="light" color={path === "/dashboard/livro" ? "primary" : "default"}>
            Livro
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/dashboard/cautelas" variant="light" color={path === "/dashboard/cautelas" ? "primary" : "default"}>
            Cautelas
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/dashboard/categorias" variant="light" color={path === "/dashboard/categorias" ? "primary" : "default"}>
            Categorias
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/dashboard/militares" variant="light" color={path === "/dashboard/militares" ? "primary" : "default"}>
            Militares
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="danger" variant="light" href="/" >
          Fechar Livro
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}