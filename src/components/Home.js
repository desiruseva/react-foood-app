import React, { useEffect, useState, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'

export const Home = () => {
    const [getuserdata, setuserdata] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const { udata, setUdata } = useContext(adddata);
    const { updata, setUPdata } = useContext(updatedata);
    const { dltdata, setDLTdata } = useContext(deldata);

    const getdata = async () => {
        const res = await fetch("http://localhost:8005/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (res.status === 422 || !data) {
            console.log("error ", data.message);
        } else {
            setuserdata(data);
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
        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("food deleted");
            alert("food deleted");
            setDLTdata(deletedata);
            getdata();
        }
    }

    // Filter the user data based on the search query
    const filteredUserData = getuserdata.filter((userData) =>
        userData.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {udata &&
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{udata.description}</strong> added succesfully!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
            {updata &&
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{updata.description}</strong> updated succesfully!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
            {dltdata &&
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{dltdata.description}</strong> deleted succesfully!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }

            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/add" className="btn btn-primary">
                            Add data
                        </NavLink>
                    </div>
                    {/* Search input field */}
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Search by description"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Description</th>
                                <th scope="col">Kcal</th>
                                <th scope="col">Protein</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUserData.map((element, id) => (
                                <tr key={id}>
                                    <th scope="row">{id + 1}</th>
                                    <td>{element.description}</td>
                                    <td>{element.fat}</td>
                                    <td>{element.kcal}</td>
                                    <td className="d-flex justify-content-between">
                                        <NavLink to={`view/${element._id}`}>
                                            <button className="btn btn-success">
                                                <RemoveRedEyeIcon />
                                            </button>
                                        </NavLink>
                                        <NavLink to={`edit/${element._id}`}>
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
