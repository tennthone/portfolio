import { router, usePage } from "@inertiajs/react";
import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";

const Filter = () => {
    const [search, setSearch] = useState();
    const {url} = usePage();

    function submit(e) {
        e.preventDefault();
        router.get(url, {search : search}, {
            onSuccess : () => {},
            onError : () => {}
        })
    }

    const handleRefresh = () => {
        router.get(route('admin.general-setting.index'))
    }

    return (
        <form onSubmit={submit}>
            <div className="my-4 flex">
                <div className="w-10/12">
                    <TextInput
                        required={true}
                        className="me-2"
                        placeholder="Search anything..."
                        size="sm"
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="w-1/12">
                    <Button
                        color="gray"
                        className="me-2"
                        onClick={() => handleRefresh()}
                    >
                        Refresh
                    </Button>
                </div>
                <div className="w-1/12">
                    <Button color="purple">Search</Button>
                </div>
            </div>
        </form>
    );
};

export default Filter;
