
import { NewsCard } from "@/app/(publicRoutes)/_components/news/NewsCard";
import { IPostResponse } from "@/lib/types";

export async function PremiumNewsList({ result
}: {
    result: IPostResponse
}) {


    if (!result.success || !result.data?.length) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                No premium news found.
            </p>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {result.data.map((post) => (
                    <NewsCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
