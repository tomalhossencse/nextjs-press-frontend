"use client"

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export function NewsSearchBar() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const debounceReference = useRef<ReturnType<typeof setTimeout> | null>(null)


    const handleChange = (value: string) => {
        if (debounceReference.current) {
            clearTimeout(debounceReference.current)
        }
        // const params = new URLSearchParams();

        // if (value) {
        //     params.set("searchTerm", value);
        // } else {
        //     params.delete("searchTerm")
        // }

        // router.replace(`${pathname}?${params.toString()}`)

        debounceReference.current = setTimeout(() => {
            // console.log(value, "value")
            const params = new URLSearchParams();

            if (value) {
                params.set("searchTerm", value);
            } else {
                params.delete("searchTerm")
            }

            router.replace(`${pathname}?${params.toString()}`)
        }, 500)


    }

    return (
        <div className="relative w-full max-w-sm">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                defaultValue={searchParams.get("searchTerm") ? searchParams.get("searchTerm")?.toString() : ""}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Search news..."
                className="pl-9"
            />
        </div>
    )
}
