import { useNavigate } from "react-router-dom";

// MUI (UI components)
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

// Pop-up dialog. Indicates successful deletion of the product
export default function DeleteSuccessDialog({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="successfully-delete-product-dialog"
    >
      <DialogTitle id="successfully-delete-product-dialog">
        The product was deleted successfully
      </DialogTitle>
      <DialogActions>
        {/* Okay button. Navigates back to products page */}
        <Button
          onClick={() => {
            setIsOpen(false);
            navigate("/products");
          }}
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
