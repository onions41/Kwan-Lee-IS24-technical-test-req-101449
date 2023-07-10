import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

// Pop-up dialog. Confirms before sending request to API to add new product
export default function ConfirmUpdateDialog({ isOpen, setIsOpen, handleConfirm }) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="confirm-update-product-dialog"
    >
      <DialogTitle id="confirm-update-product-dialog">Really update product?</DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            handleConfirm();
            setIsOpen(false);
          }}
        >
          Yes
        </Button>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
