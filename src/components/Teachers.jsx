import React, { useState, useEffect } from "react";
import { db, collection, getDocs, addDoc } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { fetchClasses } from "../redux/ducks/classes";
import { modalToggle } from "../redux/ducks/modal";
import modalStyles from "./styles/modalStyles";
const columns = [
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "city", headerName: "City", width: 130 },
  {
    field: "classObj",
    headerName: "Class",
    width: 130,
    valueGetter: (params) => params?.value?.className,
  },
];

function Teachers() {
  const classRedux = useSelector((state) => state.classesR.classes);
  const open = useSelector((state) => state.modalReducer.modalOpen);
  const dispatch = useDispatch();
  const [teachersList, setTeachersList] = useState([]);
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    city: "",
    classId: "",
  });

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  useEffect(() => {
    getTeachersList();
  }, [classRedux]);
  async function getTeachersList() {
    const res = await getDocs(collection(db, "teachers"));
    let data = res.docs
      .map((data) => {
        return {
          id: data.id,
          data: data.data(),
        };
      })
      .map((a) => {
        return {
          ...a.data,
          id: a.id,
        };
      })
      .map((a) => {
        classRedux.map((b) => {
          if (a.classId === b.id) {
            a.classObj = b;
          }
          return a;
        });
        return a;
      });
    setTeachersList(data);
  }
  async function saveTeacher() {
    try {
      await addDoc(collection(db, "teachers"), teacher);
      setOpen(false);
      setTeacher({ firstName: "", lastName: "", city: "", classId: "" });
      getTeachersList();
    } catch (e) {
      console.log("Error", e);
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
            Teachers List
          </Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Teacher
          </Button>
        </Box>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={teachersList}
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
            Add New Teacher
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "auto" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="First Name"
              variant="outlined"
              value={teacher.firstName}
              onChange={(e) =>
                setTeacher({ ...teacher, firstName: e.target.value })
              }
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={teacher.lastName}
              onChange={(e) =>
                setTeacher({ ...teacher, lastName: e.target.value })
              }
            />
            <TextField
              label="City"
              variant="outlined"
              value={teacher.city}
              onChange={(e) => setTeacher({ ...teacher, city: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Class</InputLabel>
              <Select
                style={{ width: "180px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={teacher.classId}
                label="Class"
                onChange={(e) =>
                  setTeacher({ ...teacher, classId: e.target.value })
                }
              >
                {classRedux.map(({ id, className }) => {
                  return (
                    <MenuItem value={id} key={id}>
                      {className}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Box>
              <Button variant="contained" onClick={saveTeacher}>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Teachers;
