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
    const {url, props} = usePage();
    const admins = props.admins;
    const [openSearchResult, setOpenSearchResult] = useState(false);
    const [openAdvancedFilter, setOpenAdvancedFilter] = useState(false);
    const [openColList, setOpenColList] = useState(false);
    const {searchData, setSearchData, resetSearchData} = useContext(AdminContext)

    // handle random search

    const handleSearch = (e) => {
        e.preventDefault();
        searchDetails(searchData);
    };

    const handleAdvancedFilterState = () => {
        setOpenAdvancedFilter(!openAdvancedFilter)
        setSearchData({...searchData, advancedSearch : !openAdvancedFilter})
    }

    const handleFilterChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setSearchData((values) => ({
            ...values,
            [key]: value,
        }));
    };

    const handleDateFilterChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setSearchData((values) => ({
            ...values,
            createdAt : {
                ...values.createdAt,
                [key]: value,
            }
        }));
    }

    function searchDetails(params) {
        router.post(url, params, {
            onSuccess: () => {
                setOpenSearchResult(true);
                setOpenAdvancedFilter(false);
            },
            onError : (e) => {
                console.log(e)
            },  
            preserveState: true,
        });
    }

    const handleClearFilter = () => {
        setSearchData(initValue);
    };

    return (
        <React.Fragment>
            {/* search results  */}
            {openSearchResult && (
                <div className="my-4">
                    <p>
                        Total {admins.length} results is found for `{searchData.search}`
                    </p>
                </div>
            )}
            <div className="relative">
                <form onSubmit={handleSearch}>
                    <div className="flex justify-between my-3 items-center">
                        {/* simple search input  */}
                        <div className="w-8/12">
                            <TextInput
                                placeholder="Search For Admins"
                                type="search"
                                className="me-2"
                                value={searchData.search}
                                required={true}
                                onChange={(e) => setSearchData({...searchData, search : e.target.value})}
                            />
                        </div>
                        {/* refresh button  */}
                        <div className="w-1/12">
                            <Button
                                color="gray"
                                className="me-2"
                                onClick={() => resetSearchData()}
                            >
                                Refresh
                            </Button>
                        </div>
                        {/* search button  */}
                        <div className="w-1/12">
                            <Button type="submit" color="purple">
                                Search
                            </Button>
                        </div>
                        {/* advanced filter  */}
                        <div className="w-1/12">
                            <Tooltip content="Advanced Filter">
                                <Button
                                    type="button"
                                    size="sm"
                                    color="purple"
                                    onClick={handleAdvancedFilterState}
                                >
                                    <CiFilter size={23} />
                                </Button>
                            </Tooltip>
                        </div>
                        {/* show columns  */}
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
                    </div>
                </form>
                {openAdvancedFilter && (
                    <AdvancedFilter
                        setOpenAdvancedFilter={setOpenAdvancedFilter}
                        handleAdvancedFilter={handleSearch}
                        handleFilterChange={handleFilterChange}
                        handleClearFilter={handleClearFilter}
                        handleDateFilterChange={handleDateFilterChange}
                        advancedFilter={searchData}
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
            <div className="absolute top-12 right-0 w-1/5 bg-slate-200 z-50 rounded-md">
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
