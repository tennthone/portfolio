import { DataContext } from "@/Context/DataContext";
import { Alert, Button, Modal} from "flowbite-react";
import { useContext} from "react";
import { GrTemplate } from "react-icons/gr";

const CustomFieldModal = ({
    openModal,
    setOpenModal,
    children,
    heading,
}) => {
    const {
        showAlert,
        submit,
        loading,
        changeFieldType,
        data
    } = useContext(DataContext)

    return (
        <>
            <Modal
                show={openModal}
                size="4xl"
                onClose={() => setOpenModal(false)}
                popup
            >
            <form onSubmit={submit}>
                <Modal.Header>  
                    {/* icon  */}
                    <div className="flex items-center">
                        <GrTemplate size={30} className="me-3 " />
                        <div>
                            <p className="text-lg font-bold"> {heading} </p>
                            <p className="text-sm"> {data.type} </p>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6">
                        <div className="space-y-6">
                            {children}
                        </div>
                    </div>
                    {
                        showAlert && 
                        <Alert 
                            color="indigo" 
                            onDismiss={() => setShowAlert(false)}>
                            <span className="font-medium">Info alert!</span> These settings can't be changed later
                        </Alert>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex">
                        <Button
                            type="button"
                            className="me-3"
                            onClick={() => changeFieldType()}
                        > 
                            Back to Fields 
                        </Button>
                        <Button
                            type="submit"
                            isProcessing={loading}
                            processingLabel="Saving"
                        >
                            Save
                        </Button>
                    </div>
                </Modal.Footer>
            </form>
            </Modal>
        </>
    );
};

export default CustomFieldModal;
