import React, { useEffect, useState } from 'react'
// import CreateIcon from '@mui/icons-material/Info';
// import DeleteIcon from '@mui/icons-material/Delete';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { NavLink, useParams, useNavigate } from 'react-router-dom';


export const Details = () => {

    const [getuserdata, setuserdata] = useState([]);
    console.log(getuserdata);

    const { id } = useParams("");
    console.log(id);

    const  navigate = useNavigate();


    const getdata = async () => {

        const res = await fetch(`/getfood/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setuserdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    

    const deletefood = async (id) => {

        const res2 = await fetch(`/deletefood/${id}`, {
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
            navigate("/", { replace: true });
            getdata();
        }

    }

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>Details </h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${getuserdata._id}`}>  <button className="btn btn-primary mx-2"><InfoIcon /></button></NavLink>
                        <button className="btn btn-danger" onClick={() => deletefood(getuserdata._id)}><DeleteIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/food.png" style={{ width: 50 }} alt="profile" />
                            <h3 className="mt-3">Description: <span >{getuserdata.description}</span></h3>
                            <p className="mt-3">Kcal: <span >{getuserdata.kcal}</span></p>
                            <p className="mt-3">Protein(g): <span>{getuserdata.protein}</span></p>
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">                     
                            <p className="mt-5">Fat(g): <span>{getuserdata.fat}</span></p>
                            <p className="mt-3">Carbs(g): <span> {getuserdata.carbs}</span></p>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Details
