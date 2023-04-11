import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const Datatable = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const {data} = useFetch(`http://localhost:8000/api/${path}`);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    setListData(data);
  }, [data])

  const handleDelete = async(id) => {
    try {
      await axios.delete(`http://localhost:8000/api/${path}/${id}`);
      setListData(listData.filter((item) => item._id !== id));
    } catch (error) {
      
    }
    
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={listData}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row)=>row._id}
      />
    </div>
  );
};

export default Datatable;