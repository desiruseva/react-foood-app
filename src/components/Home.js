import React, { useEffect, useState, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'


export const Home = () => {
    const [getuserdata, setuserdata] = useState([]);
    console.log(getuserdata);

    const { udata, setUdata } = useContext(adddata);

    const {updata, setUPdata} = useContext(updatedata);

    const {dltdata, setDLTdata} = useContext(deldata);

    const getdata = async (e) => {
        // e.preventDefault();

        // const { description, kcal, protein, fat, carbs } = inpt;

        const res = await fetch("http://localhost:8005/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({
            //   description, kcal, protein, fat, carbs
            // })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ", data.message);
            // alert("error"+ data.message);
        } else {
            setuserdata(data);
            console.log("get data");
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const deleteuser = async (id) => {

        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("food deleted");
            alert("food deleted");
            setDLTdata(deletedata)
            getdata();
        }

    }

    return (
        <>
        {
            udata ?
                <>
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>{udata.description}</strong>  added succesfully!
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </> : ""
        }
           {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.description}</strong>  updated succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.description}</strong>  deleted succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
       

        <div className="mt-5">
          <div className="container">
            <div className="add_btn mt-2 mb-2">
              <NavLink to="/add" className="btn btn-primary">
                Add data
              </NavLink>
            </div>
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Description</th>
                  <th scope="col">Kcal</th>
                  <th scope="col">Protein</th>
                </tr>
              </thead>
              <tbody>
                {getuserdata.map((element, id) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{id + 1}</th>
                        <td>{element.description}</td>
                        <td>{element.fat}</td>
                        <td>{element.kcal}</td>
                        <td className="d-flex justify-content-between">
                          <NavLink to={`view/${element._id}`}>
                            {" "}
                            <button className="btn btn-success">
                              <RemoveRedEyeIcon />
                            </button>
                          </NavLink>
                          <NavLink to={`edit/${element._id}`}>
                            {" "}
                            <button className="btn btn-primary">
                              <InfoIcon />
                            </button>
                          </NavLink>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteuser(element._id)}
                          >
                            <DeleteIcon />
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}

                {/* <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>                   
                    <td className='d-flex justify-content-between'>    
                         <button className='btn btn-success'><RemoveRedEyeIcon /></button>
                         <button className='btn btn-primary'><InfoIcon /></button>
                         <button className='btn btn-danger'><DeleteIcon /></button>
                    </td>
                    </tr>  */}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
};
