'use client'

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { IPostResponse } from '@/lib/types'

export function Paginations({ result }: { result: IPostResponse }) {
    const totalPages = result?.meta?.totalPages || 1

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const currentPage = Number(searchParams.get("page") || 1)

    const handleChange = (page: number) => {

        if (page === currentPage) return;

        const params = new URLSearchParams(searchParams.toString());

        params.set("page", page.toString());

        router.replace(`${pathname}?${params.toString()}`)

    }

    return (
        <div className="flex flex-col gap-8">
            {
                totalPages > 1 && <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handleChange(Math.max(1, currentPage - 1))}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    isActive={currentPage === page}
                                    onClick={() => handleChange(page)}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handleChange(Math.min(totalPages, currentPage + 1))}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            }
        </div >
    )
}
