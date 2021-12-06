import React, { useState, useEffect } from "react";
import { db, collection, getDocs, addDoc } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { fetchClasses } from "../redux/ducks/classes";
import { modalToggle } from "../redux/ducks/modal";
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
import modalStyles from "./styles/modalStyles";

const columns = [
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "fatherName", headerName: "Father", width: 130 },
  { field: "motherName", headerName: "Mother", width: 130 },
  { field: "city", headerName: "City", width: 130 },
  { field: "phone", headerName: "Phone", width: 130 },
  {
    field: "classObj",
    headerName: "Class",
    width: 130,
    valueGetter: (params) => params?.value?.className,
  },
];

const Students = () => {
  const dispatch = useDispatch();
  const classesRedux = useSelector((state) => state.classesR.classes);
  const open = useSelector((state) => state.modalReducer.modalOpen);
  const [studentList, setStudentList] = useState([]);
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    phone: "",
    city: "",
    classId: "",
  });
  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);
  useEffect(() => {
    getStudentList();
  }, [classesRedux]);
  async function getStudentList() {
    const res = await getDocs(collection(db, "students"));
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
        classesRedux.map((b) => {
          if (a.classId === b.id) {
            a.classObj = b;
          }
          return a;
        });
        return a;
      });
    setStudentList(data);
  }
  async function saveStudent() {
    try {
      await addDoc(collection(db, "students"), student);
      setOpen(false);
      setStudent({
        firstName: "",
        lastName: "",
        fatherName: "",
        motherName: "",
        phone: "",
        city: "",
        classId: "",
      });
      getStudentList();
    } catch (e) {
      console.log("error", e);
    }
  }
  function setOpen(val) {
    dispatch(modalToggle(val));
  }
  return (
    <div>
      {/* <h3>Count is: {count}</h3>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button> */}
      <Box mt={4} px={4}>
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          justifyContent="space-between"
        >
          <Typography variant="h5" mb={2}>
            Students List
          </Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Student
          </Button>
        </Box>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={studentList}
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
            Add New Student
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
              value={student.firstName}
              onChange={(e) =>
                setStudent({ ...student, firstName: e.target.value })
              }
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={student.lastName}
              onChange={(e) =>
                setStudent({ ...student, lastName: e.target.value })
              }
            />
            <TextField
              label="Father Name"
              variant="outlined"
              value={student.fatherName}
              onChange={(e) =>
                setStudent({ ...student, fatherName: e.target.value })
              }
            />
            <TextField
              label="Mother Name"
              variant="outlined"
              value={student.motherName}
              onChange={(e) =>
                setStudent({ ...student, motherName: e.target.value })
              }
            />
            <TextField
              label="Phone"
              variant="outlined"
              value={student.phone}
              onChange={(e) =>
                setStudent({ ...student, phone: e.target.value })
              }
            />
            <TextField
              label="City"
              variant="outlined"
              value={student.city}
              onChange={(e) => setStudent({ ...student, city: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Class</InputLabel>
              <Select
                style={{ width: "180px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={student.classId}
                label="Class"
                onChange={(e) =>
                  setStudent({ ...student, classId: e.target.value })
                }
              >
                {classesRedux.map(({ id, className }) => {
                  return (
                    <MenuItem value={id} key={id}>
                      {className}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Box>
              <Button variant="contained" onClick={saveStudent}>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Students;
