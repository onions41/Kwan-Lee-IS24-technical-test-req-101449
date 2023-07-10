import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

// Pop-up dialog. Confirms before sending request to API to add new product
export default function ConfirmDeleteDialog({ isOpen, setIsOpen, handleConfirm }) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="confirm-delete-product-dialog"
    >
      <DialogTitle id="confirm-delete-product-dialog">Really delete product?</DialogTitle>
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
