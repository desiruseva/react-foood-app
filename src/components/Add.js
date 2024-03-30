// import React from 'react'
import { NavLink, useParams, useNavigate} from 'react-router-dom'
import { useState, React, useContext, useEffect } from "react";
import { adddata } from './context/ContextProvider';
import validator from 'validator';


export const Add = () => {

  const { updata, setUPdata } = useContext(adddata);

  const history = useNavigate();

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


  const addinpdata = async (e) => {
      e.preventDefault();

      const { description, kcal, protein, fat, carbs } = inpt;

      if (description == "") {
          alert("description is required")
      } else if (kcal == "") {
          alert("kcal is required")
      }  else if (protein == "") {
          alert("protein is required")
      } else if (fat == "") {
          alert("fat is required")
      } else if (carbs == "") {
          alert("carbs is required")
      } else {

          const res = await fetch("/create", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                description, kcal, protein, fat, carbs
              })
          });

          const data = await res.json();
          console.log(data);

          if (res.status === 422 || !data) {
              console.log("error ");
              alert("error");

          } else {
              history.push("/")
              setUPdata(data)
              console.log("data added");

          }
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
          <input type="number" name="kcal" value={inpt.kcal} onChange={setdata} validate={(val) => (val ? false : "Name Required")} class="form-control"  placeholder="Kcal"></input>
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12">
          <label for="exampleInputProtein">Protein(g)</label>
          <input type="number" name="protein" value={inpt.protein} onChange={setdata} validate={(val) => (val ? false : "Name Required")} class="form-control"  placeholder="Protein(g)"></input>
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12">
          <label for="exampleInputFat">Fat(g)</label>
          <input type="number" name="fat" value={inpt.fat} onChange={setdata} validate={(val) => (val ? false : "Name Required")} class="form-control"  placeholder="Fat(g)"></input>
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12">
          <label for="exampleInputCarbs">Carbs(g)</label>
          <input type="number" name="carbs" value={inpt.carbs} onChange={setdata}  class="form-control"  placeholder="Carbs(g)"></input>
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
    
  )
}
export default Add