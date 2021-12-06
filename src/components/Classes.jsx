import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { db, collection, addDoc } from "../firebase";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { fetchClasses } from "../redux/ducks/classes";
import { modalToggle } from "../redux/ducks/modal";
import modalStyles from "./styles/modalStyles";

const columns = [{ field: "className", headerName: "Class Name", width: 130 }];

function Classes() {
  const open = useSelector((state) => state.modalReducer.modalOpen);
  const dispatch = useDispatch();
  const classRedux = useSelector((state) => state.classesR.classes);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);
  async function saveClass() {
    try {
      await addDoc(collection(db, "classes"), {
        className: nameInput,
      });
      setNameInput("");
      setOpen(false);
      dispatch(fetchClasses());
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  function setOpen(val) {
    dispatch(modalToggle(val));
  }
  return (
    <div>
      <Box mt={4} px={4}>
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          justifyContent="space-between"
        >
          <Typography variant="h5" mb={2}>
            Class list
          </Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Class
          </Button>
        </Box>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={classRedux}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Box>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyles()}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Class
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Class Name"
              variant="outlined"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />

            <Box>
              <Button variant="contained" onClick={saveClass}>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Classes;
