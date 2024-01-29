import { router, usePage } from "@inertiajs/react";
import { Button, TextInput, Tooltip } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import AdvancedFilter from "./AdvancedFilter";
import { MdFilterList } from "react-icons/md";
import { useContext } from "react";
import { AdminContext } from "@/Context/AdminContext";

const Filter = () => {
    const [search, setSearch] = useState("");
    const { admins } = usePage().props;
    const [openSearchResult, setOpenSearchResult] = useState(false);
    const [openAdvancedFilter, setOpenAdvancedFilter] = useState(false);
    const [openColList, setOpenColList] = useState(false);
    const initValue = {
        name: "",
        email: "",
        role: "",
        status: "",
        startDate: "",
        endDate: "",
        startYear: "",
        endYear: "",
        startMonth: "",
        endMonth: "",
    };
    const [advancedFilter, setAdvancedFilter] = useState(initValue);
    const handleRandomSearch = (e) => {
        e.preventDefault();
        searchDetails({ search: search });
    };

    const handleSearchField = (e) => {
        setSearch(e.target.value);
        setOpenSearchResult(false);
    };

    const handleCancel = () => {
        router.get(route("admin.admin-management"));
    };

    const handleAdvancedFilter = (e) => {
        e.preventDefault();
        searchDetails(advancedFilter);
    };

    const handleFilterChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setAdvancedFilter((values) => ({
            ...values,
            [key]: value,
        }));
    };

    function searchDetails($params) {
        router.get(route("admin.admin-management"), $params, {
            onSuccess: () => {
                setOpenSearchResult(true);
                setOpenAdvancedFilter(false);
            },
            preserveState: true,
        });
    }

    const handleClearFilter = () => {
        setAdvancedFilter(initValue);
    };

    return (
        <React.Fragment>
            {/* search results  */}
            {openSearchResult && (
                <div className="my-4">
                    <p>
                        Total {admins.length} results is found for `{search}`
                    </p>
                </div>
            )}
            <div className="relative">
                <form onSubmit={handleRandomSearch}>
                    <div className="flex justify-between my-3 items-center">
                        <div className="w-1/12">
                            <Tooltip content="Advanced Filter">
                                <Button
                                    type="button"
                                    size="sm"
                                    color="purple"
                                    onClick={() =>
                                        setOpenAdvancedFilter(
                                            !openAdvancedFilter
                                        )
                                    }
                                >
                                    <CiFilter size={23} />
                                </Button>
                            </Tooltip>
                        </div>
                        <div className="w-1/12">
                            <Tooltip content="Show Colums">
                                <Button
                                    type="button"
                                    size="sm"
                                    color="purple"
                                    onClick={() => setOpenColList(!openColList)}
                                >
                                    <MdFilterList size={23} />
                                </Button>
                            </Tooltip>
                        </div>
                        <div className="w-8/12">
                            <TextInput
                                placeholder="Search For Admins"
                                type="search"
                                className="me-2"
                                value={search}
                                onChange={(e) => handleSearchField(e)}
                            />
                        </div>
                        <div className="w-1/12">
                            <Button
                                color="gray"
                                className="me-2"
                                onClick={() => handleCancel()}
                            >
                                Cancel
                            </Button>
                        </div>
                        <div className="w-1/12">
                            <Button type="submit" color="purple">
                                Search
                            </Button>
                        </div>
                    </div>
                </form>
                {openAdvancedFilter && (
                    <AdvancedFilter
                        setOpenAdvancedFilter={setOpenAdvancedFilter}
                        handleAdvancedFilter={handleAdvancedFilter}
                        handleFilterChange={handleFilterChange}
                        handleClearFilter={handleClearFilter}
                        advancedFilter={advancedFilter}
                    />
                )}
                {openColList && (
                    <ColumnList />
                )}
            </div>
        </React.Fragment>
    );
};

const ColumnList = () => {
    const {colHeaders, setcolHeaders} = useContext(AdminContext)
    
    const handleColListChange = (id) => {
        const selectedCount = colHeaders.filter(item => item.selected == true).length;
        setcolHeaders((prevFields) => {
            return prevFields.map((field) => {
              if (field.id === id) {
                return { ...field, selected: !field.selected };
              }
              return field;
            });
          });
    }
    return (
        <React.Fragment>
            <div className="absolute top-12 left-6 w-1/5 bg-slate-200 z-50 rounded-sm">
                <div className="py-2">
                    <ul>
                        {colHeaders.map((item) => (
                            <li
                                key={item.id}
                                className={`py-2 px-1 m-2 
                            ${
                                item.selected
                                    ? "bg-indigo-600 text-slate-100"
                                    : "bg-slate-200 text-slate-900"
                            } 
                            rounded-md cursor-pointer`}
                            onClick={() => handleColListChange (item.id)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Filter;
