// External imports
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

// MUI (UI components)
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const columns = [
  {
    width: 5,
    label: "Row #",
    dataKey: "row#",
    fontSize: 12
  },
  {
    width: 5,
    label: "Product ID",
    dataKey: "id",
    fontSize: 12
  },
  {
    width: 20,
    label: "Product Name",
    dataKey: "name",
    fontSize: 12
  },
  {
    width: 70,
    label: "Description",
    dataKey: "description",
    fontSize: 12
  },
  {
    width: 5,
    label: "Colour",
    dataKey: "colour",
    fontSize: 12
  },
  {
    width: 5,
    label: "Size",
    dataKey: "size",
    fontSize: 12
  }
];

// Determines which table components to use from Virtuoso table library
const VirtuosoTableComponents = {
  Scroller: forwardRef((props, ref) => (
    <TableContainer
      component={Paper}
      {...props}
      ref={ref}
    />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: forwardRef((props, ref) => (
    <TableHead
      {...props}
      ref={ref}
      sx={{ boxShadow: "0px 1px 3px 0px #989898", WebkitBoxShadow: "0px 1px 3px 0px #989898" }}
    />
  )),
  TableRow,
  TableBody: forwardRef((props, ref) => (
    <TableBody
      {...props}
      ref={ref}
    />
  ))
};

// Generates table headers
function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          style={{ width: column.width }}
          sx={{
            backgroundColor: "grey.300",
            fontSize: "htmlFontSize",
            fontWeight: "fontWeightMedium",
            padding: "14px 4px 10px 16px",
            textAlign: column.dataKey === "row#" ? "center" : "left",
            lineHeight: "1"
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

// Generates content of each cell by mapping columns against rows of data
function itemContent(index, row) {
  return (
    <>
      {columns.map((column) => {
        // Row # column
        if (column.dataKey === "row#") {
          // Developers column
          // Separates developer names with bullet and stops line break occuring inside a name
          return (
            <TableCell
              key={column.dataKey}
              sx={{ fontSize: column.fontSize, textAlign: "center" }}
            >
              {index + 1}
            </TableCell>
          );
        }
        // Name. Cells are links
        if (column.dataKey === "name") {
          return (
            <TableCell
              key={column.dataKey}
              sx={{ fontSize: column.fontSize }}
            >
              {/* To do, use routerlink as component */}
              <Link
                component={RouterLink}
                to={`/products/${row.id}`}
                underline="hover"
                sx={{ overflowWrap: "break-word" }}
              >
                {row[column.dataKey]}
              </Link>
            </TableCell>
          );
        }
        // All other columns
        return (
          <TableCell
            key={column.dataKey}
            sx={{ fontSize: column.fontSize }}
          >
            {row[column.dataKey]}
          </TableCell>
        );
      })}
    </>
  );
}

export { VirtuosoTableComponents, fixedHeaderContent, itemContent };
