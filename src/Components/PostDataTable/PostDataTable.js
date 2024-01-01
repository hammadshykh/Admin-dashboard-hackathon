import {
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import "../../Reusable Styling/Table.sass";

const PostDataTable = ({ onRowClick, tableRows }) => {
  const theme = useTheme();

  // Example: Delete a document by its ID

  const tableCellNamesForTransaction = [
    "Product",
    "Title",
    "Description",
    "Date",
    "Status",
  ];

  return (
    <div
      component={Paper}
      className="table"
      sx={{
        pl: { sm: 1 },
        pr: { xs: 1, sm: 1 },
        "& th, & td": {
          fontSize: theme.breakpoints.values.sm < 600 ? "12px" : "inherit",
        },
        mt: 2,
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="Table">
        <TableHead>
          <TableRow>
            {tableCellNamesForTransaction.map((name, i) => (
              <TableCell
                className="table_cell"
                sx={{ p: 1 }}
                key={i}
                style={{ color: "#20B2AA" }}
              >
                {name}{" "}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows &&
            tableRows.map((row) => (
              <TableRow key={row.id} onClick={() => onRowClick(row.id)}>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  <div className="cell_wrapper">
                    <img src={row.image} alt="Table" className="cell_img" />
                  </div>
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  {row.title}
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  {row.description}
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  {row.data}
                </TableCell>
                <TableCell sx={{ p: 1 }}>
                  <span
                    className={`status ${
                      row.status && row.status.toLowerCase()
                    }`}
                  >
                    {row.status}
                  </span>
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  <button
                    style={{
                      background: "orange",
                      border: "none",
                      color: "white",
                      fontWeight: "bold",
                      padding: "6px 18px",
                    }}
                  >
                    Edit
                  </button>
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  <button
                    style={{
                      background: "red",
                      fontWeight: "bold",
                      border: "none",
                      color: "white",
                      padding: "6px 18px",
                    }}
                    type="button"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Passing onRowClick as an empty default function
PostDataTable.defaultProps = {
  onRowClick: () => {},
};

PostDataTable.propTypes = {
  onRowClick: PropTypes.func,
};

export default PostDataTable;
