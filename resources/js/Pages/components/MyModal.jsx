import { router, usePage } from "@inertiajs/react";
import { Button, Modal } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const MyModal = ({
    openModal,
    setOpenModal,
    children,
    routeName,
    heading,
    setErrors,
    reset,
    name,
    data,
    param,
    buttonName = "Save",
    processingLabel = "Saving",
}) => {
    const [loading, setLoading] = useState(false);
    const { flash } = usePage().props;

    function submit(e) {
        e.preventDefault();
        setLoading(true);
        router.post(route(routeName, param), data, {
            forceFormData : true,
            onSuccess: () => {
                setLoading(false);
                setOpenModal(false);
                if (flash.success) {
                    toast.success(flash.success);
                } else {
                    toast.error(flash.error);
                }
                reset();
            },
            onError: (err) => {
                setLoading(false);
                setErrors(err);
            },
        });
    }

    // useEffect(() => {
    //     if (flash.success) {
    //         toast.success(flash.success);
    //     } else {
    //         toast.error(flash.error);
    //     }
    // }, [flash.success, flash.error])

    return (
        <>
            <Toaster position="top-right" />
            <Modal
                show={openModal}
                size="2xl"
                onClose={() => setOpenModal(false)}
            >
                <form onSubmit={submit}>
                    <Modal.Header> {heading} </Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">{children}</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="w-full flex justify-between">
                            <Button 
                              type="button"
                              size="sm"
                              onClick={() => setOpenModal(false)}
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
                                processingLabel={processingLabel}
                            >
                                {buttonName}
                            </Button>
                        </div>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default MyModal;
