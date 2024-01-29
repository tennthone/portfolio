import { router, usePage } from "@inertiajs/react";
import { Pagination } from "flowbite-react";
import { useState } from "react";

const CustomPagination = ({route, params = {}}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const {totalCount} = usePage().props;
    const totalPages = Math.ceil(totalCount/5);
    const handlePagination = (page) => {
        setCurrentPage(page)
        router.get(route, {
            page : page,
            ...params
        }, {
            preserveState : true,
            onSuccess : () => {

            },
            onError : () => {

            }
        });
    }
    return (
        <div className="flex overflow-x-auto sm:justify-center mb-5">
            <Pagination
                layout="pagination"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => handlePagination(page)}
                previousLabel="ရှေ့သို့"
                nextLabel="နောက်သို့"
                showIcons
            />
        </div>
    );
};

export default CustomPagination;
