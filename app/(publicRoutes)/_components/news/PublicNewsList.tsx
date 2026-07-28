import { IPostResponse } from "@/lib/types";
import { NewsCard } from "./NewsCard";

export async function PublicNewsList({ result }: { result: IPostResponse }) {



    if (!result.success || !result.data?.length) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                No news found.
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
