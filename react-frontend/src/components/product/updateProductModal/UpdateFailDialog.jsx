import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Pop-up dialog. Indicates failure to update the product
export default function UpdateFailDialog({ isOpen, setIsOpen, errorRef }) {
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="update-product-failed-dialog"
      aria-describedby="update-product-failed-dialog-description"
    >
      <DialogTitle id="update-product-failed-dialog">Error. Product was not updated</DialogTitle>
      <DialogContent>
        <DialogContentText id="update-product-failed-dialog-description">
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