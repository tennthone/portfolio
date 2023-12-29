import React, {useState } from "react";
import { Modal, Label, Button, Alert, FloatingLabel } from "flowbite-react";
import { router, useForm, usePage } from "@inertiajs/react";
import { toast, Toaster } from "react-hot-toast";
import { HiInformationCircle } from "react-icons/hi";

const Commit = ({ openCommitModal, setOpenCommitModal, templateId }) => {
    const [loading, setLoading] = useState(false);
    const { flash } = usePage().props;
    const [errors, setErrors] = useState([]);
    const [commitName, setcommitName] = useState("")
    
    const initData = {
        template_id : templateId,
        commit_name: commitName,
    }

    function submit(e) {
        e.preventDefault();
        setLoading(true);
        router.post(
            route("admin.gitaction.push"),
            initData,
            {
                onSuccess: () => {
                    setLoading(false);
                    setOpenCommitModal(false);
                    if (flash.success) {
                        toast.success(flash.success);
                    } else {
                        toast.error(flash.error);
                    }
                    setcommitName("");
                },
                onError: (err) => {
                  setErrors(err)
                  setLoading(false)
                },
            }
        );
    }

    return (
        <div>
            <Modal
                show={openCommitModal}
                size="md"
                onClose={() => setOpenCommitModal(false)}
                popup
            >
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={submit}>
                        <div className="space-y-6">
                            {/* commit name  */}
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email"
                                        value="Commit Name ထည့်ရန်"
                                    />
                                </div>
                                <FloatingLabel
                                    label="Commit Name"
                                    variant="outlined"
                                    helperText="File တွင်ပြောင်းလဲမှုရှိသောအခါ code အသစ်များ  ပေါင်းထည့်ရန်"
                                    value={initData.commit_name}
                                    onChange={(event) =>
                                        setcommitName(event.target.value)
                                    }
                                />
                            </div>
                            {
                              errors && errors.commit_name && 
                              <div className="text-red-700"> {errors.commit_name} </div>
                            }
                            <Alert color="failure" icon={HiInformationCircle}>
                                <span className="font-medium"> သတိပေးချက် </span>{" "}
                                သင် code များကို မိမိ branch ထဲမှ pull ဆွဲပြီးမှသာ commit လုပ်ပါရန်။ 
                            </Alert>

                            <div className="w-full">
                                <Button 
                                  size="sm"
                                  isProcessing={loading}
                                  processingLabel="Commiting"
                                  type="submit" 
                                  color="purple"
                                >
                                  Commit 
                                </Button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <Toaster position="top-right" />
        </div>
    );
};

export default Commit;
