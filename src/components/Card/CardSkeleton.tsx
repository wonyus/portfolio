export const CardSkeleton = () => {
    return (
        <div className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full animate-pulse">
            <div className="w-full h-[230px] rounded-t-2xl bg-gray-600" />
            <div className="p-2 pt-4 space-y-4">
                <div className="h-4 w-1/2 bg-gray-600 rounded" />
                <div className="h-4 w-3/4 bg-gray-600 rounded" />
                <div className="h-20 w-full bg-gray-600 rounded" />
                <div className="h-4 w-1/4 bg-gray-600 rounded" />
            </div>
        </div>
    );
};
