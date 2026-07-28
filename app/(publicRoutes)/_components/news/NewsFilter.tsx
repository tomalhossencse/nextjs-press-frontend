"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function NewsFilter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()



    const handleChange = (key: string, value: string) => {


        const params = new URLSearchParams(searchParams.toString());

        params.set(key, value);


        params.set("page", "1");

        router.replace(`${pathname}?${params.toString()}`)
    }
    return (
        <div className="flex w-full items-center gap-2 sm:w-auto">
            <SlidersHorizontal className="size-4 shrink-0 text-muted-foreground" />

            <Select value={searchParams.get("sortBy") || ""}
                onValueChange={(value: string) => handleChange("sortBy", value)}>
                <SelectTrigger className="w-full sm:w-37.5">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="createdAt">
                        Date
                    </SelectItem>


                    <SelectItem value="title">
                        Title
                    </SelectItem>

                    <SelectItem value="views">
                        Most viewed
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select value={searchParams.get("sortOrder") || ""} onValueChange={(value: string) => handleChange("sortOrder", value)}>
                <SelectTrigger className="w-full sm:w-35">
                    <SelectValue placeholder="Order" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="desc">
                        Descending
                    </SelectItem>

                    <SelectItem value="asc">
                        Ascending
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

