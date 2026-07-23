"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Terminal, LogOut, Settings, User, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Contact", href: "/contact" },
]

const userMenuItems = [
    { title: "Profile", href: "#", icon: User },
    { title: "Settings", href: "#", icon: Settings },
]

const user = {
    name: "Jane Doe",
    email: "jane@acme.com",
    avatar: "/user-avatar.png",
    initials: "JD",
}

export function Navbar() {
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex shrink-0 items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <Terminal className="size-4" />
                    </span>
                    <span className="text-base font-semibold tracking-tight">Acme</span>
                </Link>

                {/* Desktop nav links */}
                <nav className="hidden items-center gap-6 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors",
                                pathname === link.href
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            {link.title}
                        </Link>
                    ))}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-2">
                    {/* User dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu" />
                            }
                        >
                            <Avatar className="size-8">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm font-medium">{user.name}</span>
                                        <span className="text-xs font-normal text-muted-foreground">
                                            {user.email}
                                        </span>
                                    </div>
                                </DropdownMenuLabel>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                {userMenuItems.map((item) => (
                                    <DropdownMenuItem key={item.title} render={<Link href={item.href} />}>
                                        <item.icon />
                                        {item.title}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mobile menu */}
                    <Sheet>
                        <SheetTrigger
                            render={<Button variant="ghost" size="icon" className="md:hidden" />}
                        >
                            <Menu />
                            <span className="sr-only">Toggle menu</span>
                        </SheetTrigger>
                        <SheetContent side="right" className="flex w-72 flex-col p-0 pt-4">
                            <SheetHeader>
                                <SheetTitle className="flex items-center gap-2">
                                    <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                        <Terminal className="size-4" />
                                    </span>
                                    Acme
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-1 px-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.title}
                                        href={link.href}
                                        className={cn(
                                            "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                            pathname === link.href
                                                ? "bg-accent text-accent-foreground"
                                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                        )}
                                    >
                                        {link.title}
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-auto border-t border-border px-4 py-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-9">
                                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                        <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex min-w-0 flex-col">
                                        <span className="truncate text-sm font-medium">{user.name}</span>
                                        <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                                    </div>
                                </div>
                                <div className="mt-3 flex flex-col gap-1">
                                    {userMenuItems.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                        >
                                            <item.icon className="size-4" />
                                            {item.title}
                                        </Link>
                                    ))}
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                                    >
                                        <LogOut className="size-4" />
                                        Log out
                                    </button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
