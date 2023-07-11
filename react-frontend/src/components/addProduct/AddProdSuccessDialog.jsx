import { useNavigate } from "react-router-dom";

// MUI (UI components)
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

// Pop-up dialog. Indicates product was updated successfully
export default function AddProdSuccessDialog({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="successfully-added-product-dialog"
    >
      <DialogTitle id="successfully-added-product-dialog">
        The product was added successfully
      </DialogTitle>
      <DialogActions>
        {/* Okay button. Closes this dialog and naviages back to the product listing page */}
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