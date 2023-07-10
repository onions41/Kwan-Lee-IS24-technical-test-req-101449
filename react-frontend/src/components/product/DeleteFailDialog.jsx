import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Pop-up dialog. Indicates failure to delete the product
export default function DeleteFailDialog({ isOpen, setIsOpen, errorRef }) {
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="delete-product-failed-dialog"
      aria-describedby="delete-product-failed-dialog-description"
    >
      <DialogTitle id="delete-product-failed-dialog">Error. Product was not deleted</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-product-failed-dialog-description">
          {errorRef.current}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            errorRef.current = "";
            setIsOpen(false);
          }}
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}