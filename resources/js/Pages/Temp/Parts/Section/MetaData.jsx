import { Button, Label, TextInput, Textarea } from "flowbite-react";
import React from "react";
import TagsInput from "react-tagsinput";
import "../../../../../css/app.css";
import { router, useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

const MetaData = () => {
    const { page } = usePage().props;
    const initialData = {
        page_id: page.id,
        title: page.metadata.title,
        description: page.metadata.description,
        keywords: JSON.parse(page.metadata.keywords),
    };

    const { data, setData } = useForm(initialData);

    function submit(e) {
        e.preventDefault();
        router.post(route("admin.page.meta-data"), data, {
            onSuccess: () => {
                toast.success("Meta Data set up successfully");
            },
            onError: (error) => {
                console.log(error);
            },
        });
    }

    return (
        <div>
            <h1 className="text-2xl font-bold"> Meta Data for Page </h1>
            <label htmlFor="metadata"> Metadata are used blah blah </label>

            {/* metadata form starts */}
            <form action="" onSubmit={submit}>
                {/* title  */}
                <div className="my-3">
                    <Label> Meta Title </Label>
                    <TextInput
                        placeholder="Add meta title for your page"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                </div>

                {/* description  */}
                <div className="my-3">
                    <Label> Meta Description </Label>
                    <Textarea
                        placeholder="Add meta description for your page"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                </div>

                {/* keywords  */}
                <div className="my-3">
                    <Label> Meta Keywords </Label>
                    <TagsInput
                        value={data.keywords}
                        onChange={(value) => setData("keywords", value)}
                        className="w-full rounded-md"
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="submit"> Save </Button>
                </div>
            </form>
            {/* metadata form ends  */}
        </div>
    );
};

export default MetaData;
