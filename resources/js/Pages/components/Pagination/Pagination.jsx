import { router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { useState } from "react";

const CustomPagination = ({searchData, setSearchData, totalCount }) => {
    const {url} = usePage();
    const [paginationState, setPaginationState] = useState({
        disabledPrevious: true,
        disabledNext: false,
    });

    const totalPages = Math.ceil(totalCount / 6);

    const handlePageChange = (page) => {
        setPaginationState((prevState) => ({
            ...prevState,
            disabledPrevious: page === 1,
            disabledNext: page >= totalPages,
        }));
        setSearchData((prevState) => ({
            ...prevState,
            page: page
        }));
    };

    useEffect(() => {
        router.post(
            url,searchData,
            {
                preserveState: true,
                preserveScroll : true,
                onSuccess: () => {},
                onError: () => {},
            }
        );
    }, [searchData.page])

    return (
        <div className="flex justify-between mb-5">
            <div className="mt-4">
                <p className="text-sm text-slate-400">
                    Page {searchData.page} of {totalPages}
                </p>
            </div>
            <div className="mt-4">
                <div className="flex">
                    <button
                        className={`p-2 rounded-md text-slate-700 border border-slate-400 text-sm me-3  ${paginationState.disabledPrevious ? 'hover:cursor-not-allowed' : 'hover:bg-indigo-700 hover:text-slate-200'}`}
                        onClick={() => handlePageChange(searchData.page - 1)}
                        disabled={paginationState.disabledPrevious}
                    >
                        Previous
                    </button>
                    <button
                        className={`p-2 rounded-md text-slate-700 border border-slate-400 text-sm ${paginationState.disabledNext ? 'hover:cursor-not-allowed' : 'hover:bg-indigo-700 hover:text-slate-200'}`}
                        onClick={() => handlePageChange(searchData.page + 1)}
                        disabled={paginationState.disabledNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomPagination;
