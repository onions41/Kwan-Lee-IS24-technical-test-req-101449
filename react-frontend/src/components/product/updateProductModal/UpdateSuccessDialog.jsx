// MUI (UI components)
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

// Pop-up dialog. Indicates product was updated successfully
export default function UpdateSuccessDialog({ isOpen, setIsOpen, setIsModalOpen }) {
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="successfully-updated-product-dialog"
    >
      <DialogTitle id="successfully-updated-product-dialog">
        The product was updated successfully
      </DialogTitle>
      <DialogActions>
        {/* Okay button. Closes this dialog and the UpdateProductModal */}
        <Button
          onClick={() => {
            setIsOpen(false);
            setIsModalOpen(false);
          }}
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
