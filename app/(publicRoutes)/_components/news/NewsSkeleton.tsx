export function NewsSkeleton() {
    return (
        <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-120 animate-pulse rounded-2xl bg-muted" />
            ))}
        </div>
    );
}
