import { Suspense } from "react";
import { NewsSearchBar } from "../_components/news/NewsSearchBar";
import { NewsSkeleton } from "../_components/news/NewsSkeleton";
import { PremiumNewsList } from "../_components/news/PremiumNewsList";
import { getPremiumNews } from "../_actions/getPremiumNews";

const PremiumPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {

    const query = await searchParams
    // console.log(search, "search")


    const result = await getPremiumNews({ query });

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Premium News : ({result.data.length})</h1>
                    <p className="text-sm text-muted-foreground">
                        Exclusive stories for our subscribers.
                    </p>
                </div>

                <NewsSearchBar />
            </div>

            <Suspense fallback={<NewsSkeleton />}>
                <PremiumNewsList result={result} />
            </Suspense>
        </div>
    );
};

export default PremiumPage;
