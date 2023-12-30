import React, { useState } from "react";
import { Modal, Label, TextInput, Button, FloatingLabel } from "flowbite-react";
import { router, useForm, usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";

const Create = ({ openCreateModal, setOpenCreateModal }) => {
    const { repos } = usePage().props;
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { data, setData, reset } = useForm({
        name: "",
        description: "",
    });

    function submit(e) {
        e.preventDefault();
        const filteredItem = repos.filter((item) => item.name == data.name);
        if (filteredItem.length > 0) {
            setErrors({ info: "Repository name already exists" });
            return false;
        }
        setLoading(true);
        router.post(route("admin.gitrepo.store"), data, {
            onSuccess: () => {
                setLoading(false);
                setOpenCreateModal(false);
                toast.success("Repo created successfully");
                reset();
            },
            onError: (err) => {
                setErrors(err);
            },
        });
    }

    return (
        <div>
            <Modal
                show={openCreateModal}
                size="2xl"
                onClose={() => setOpenCreateModal(false)}
            >   
                <form action="" onSubmit={submit}>
                <Modal.Header>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Create Repository
                    </h3>
                </Modal.Header>
                <Modal.Body>
                        <div className="space-y-6">
                            {/* errors  */}
                            {errors && errors.info && (
                                <div className="my-3 text-red-700 font-bold text-sm">
                                    {errors.info}
                                </div>
                            )}
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email"
                                        value="Repository Name"
                                    />
                                </div>
                                <FloatingLabel
                                    label="Enter GitHub Repository Name"
                                    helperText="GitHub Url တွင် အသုံးပြုမည့်အမည်။​ https://reponame.git"
                                    variant="outlined"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {errors && errors.name && (
                                    <div className="my-3 text-red-700 font-bold text-sm">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email"
                                        value="Description"
                                    />
                                </div>
                                <FloatingLabel
                                    variant="outlined"
                                    label="Description ထည့်မည် "
                                    helperText="Remote Url သည် မည့်သည့်အတွက် ဖြစ်ကြောင်း ဖော်ပြချက်"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-full flex justify-between">
                        <Button 
                        type="button"
                        size="sm"
                        onClick={() => setOpenCreateModal(false)}
                        color="gray"
                        className="w-1/2 me-3"
                        >
                            Cancel 
                        </Button>
                        <Button
                            className="w-1/2"
                            type="submit"
                            color="purple"
                            isProcessing={loading}
                            processingLabel="Creating"
                        >
                            Create 
                        </Button>
                    </div>
                </Modal.Footer>
                </form>
            </Modal>
            <Toaster position="top-right" />
        </div>
    );
};

export default Create;
