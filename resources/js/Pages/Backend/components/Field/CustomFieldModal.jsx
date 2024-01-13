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
        store,
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
            >
            <form onSubmit={store}>
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
                    <div className="flex justify-between w-full">
                        <Button
                            type="button"
                            color="gray"
                            className="me-3 w-1/2"
                            onClick={() => changeFieldType()}
                        > 
                            Back to Fields 
                        </Button>
                        <Button
                            type="submit"
                            color="purple"
                            isProcessing={loading}
                            processingLabel="Saving"
                            className="w-1/2"
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
