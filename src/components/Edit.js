// import React from 'react'
import { NavLink, useParams, useNavigate} from 'react-router-dom'
import { useState, React, useContext, useEffect} from "react";
import { adddata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'


export const Edit = () => {

  // const [getuserdata, setuserdata] = useState([]);
  // console.log(getuserdata);

  const {updata, setUPdata} = useContext(updatedata);

  const navigate = useNavigate();

  const [inpt, setINP] = useState({
    description: "", 
    kcal: "", 
    protein: "", 
    fat: "", 
    carbs : ""
  })

  const setdata = (e) => {
      console.log(e.target.value);
      const { name, value } = e.target;
      setINP((preval) => {
          return {
              ...preval,
              [name]: value
          }
      })
  }

  const { id } = useParams("");
  console.log(id);

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
          setINP(data)
          console.log("get data");

      }
  }

  useEffect(() => {
      getdata();
  }, []);

// update user data
  const updateuser = async(e)=>{
      e.preventDefault();

      const { description, kcal, protein, fat, carbs } = inpt;

      const res2 = await fetch(`/updateuser/${id}`,{
          method: "PATCH",
          headers: {
              "Content-Type": "application/json"
          },
          body:JSON.stringify({
            description, kcal, protein, fat, carbs
          })
      });

      const data2 = await res2.json();
      console.log(data2);

      if(res2.status === 422 || !data2){
          alert("fill the data");
      }else{
          navigate("/", { replace: true });
          setUPdata(data2);
          alert("data updated");
      }
  }

  return (
    <div className='container'>
      <NavLink to="/">Home</NavLink>
      <form className='mt-4'>
        <div className='row'>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
          <label for="exampleInputDescription">Description</label>
          <input type="text" name="description" onChange={setdata} value={inpt.description} class="form-control" placeholder="Enter description"></input>
            
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12">
          <label for="exampleInputKcal">Kcal</label>
          <input type="number" name="kcal" value={inpt.kcal} onChange={setdata} class="form-control"  placeholder="Kcal"></input>
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12">
          <label for="exampleInputProtein">Protein(g)</label>
          <input type="number" name="protein" value={inpt.protein} onChange={setdata} class="form-control"  placeholder="Protein(g)"></input>
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12">
          <label for="exampleInputFat">Fat(g)</label>
          <input type="number" name="fat" value={inpt.fat} onChange={setdata} class="form-control"  placeholder="Fat(g)"></input>
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12">
          <label for="exampleInputCarbs">Carbs(g)</label>
          <input type="number" name="carbs" value={inpt.carbs} onChange={setdata}  class="form-control"  placeholder="Carbs(g)"></input>
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
    
  )
}
export default Edit