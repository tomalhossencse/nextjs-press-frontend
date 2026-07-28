import { Suspense } from "react";
import { NewsSkeleton } from "../_components/news/NewsSkeleton";
import { PublicNewsList } from "../_components/news/PublicNewsList";
import { getNews } from "../_actions/getNews";
import { NewsSearchBar } from "../_components/news/NewsSearchBar";
import { Paginations } from "../_components/news/Pagination";
import { IPostResponse } from "@/lib/types";

const NewsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {

    const query = await searchParams


    const result = (await getNews({ query })) as IPostResponse;

    return (
        <div className="max-w-7xl mx-auto space-y-6 px-4 py-10 sm:px-6 lg:px-8 min-h-[90vh] flex flex-col justify-between">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold">News({result?.meta?.total ?? 0})</h1>
                    <p className="text-sm text-muted-foreground">
                        Browse the latest published stories.
                    </p>
                </div>
                <NewsSearchBar />
            </div>


            <Suspense fallback={<NewsSkeleton />}>
                <PublicNewsList result={result} />
            </Suspense>


            <Paginations result={result} />


        </div >
    );
};

export default NewsPage;
