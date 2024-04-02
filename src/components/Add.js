import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Add = () => {
  const navigate = useNavigate();

  const [inpt, setINP] = useState({
    description: "",
    kcal: "",
    protein: "",
    fat: "",
    carbs: ""
  });

  const [errors, setErrors] = useState({
    description: "",
    kcal: "",
    protein: "",
    fat: "",
    carbs: ""
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => ({ ...preval, [name]: value }));
    // Reset the error message for the field when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    // Validate each field
    if (!inpt.description.trim()) {
      newErrors.description = "Description is required";
    }else if (!/^[a-zA-Z\s]*$/.test(inpt.description.trim())) {
      newErrors.description = "Description must contain only letters";
    }
    if (!inpt.kcal.trim()) {
      newErrors.kcal = "Kcal is required";
    } else if (isNaN(inpt.kcal)) {
      newErrors.kcal = "Kcal must be a number";
    }
    if (!inpt.protein.trim()) {
      newErrors.protein = "Protein is required";
    } else if (isNaN(inpt.protein)) {
      newErrors.protein = "Protein must be a number";
    }
    if (!inpt.fat.trim()) {
      newErrors.fat = "Fat is required";
    } else if (isNaN(inpt.fat)) {
      newErrors.fat = "Fat must be a number";
    }
    if (!inpt.fat.trim()) {
      newErrors.carbs = "Carbs is required";
    } else if (isNaN(inpt.carbs)) {
      newErrors.carbs = "Carbs must be a number";
    }
    // Update the state with new errors
    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const addinpdata = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // If there are validation errors, return early
      return;
    }
    // If form is valid, proceed with form submission
    // Your existing fetch logic here
    const res = await fetch("http://localhost:8005/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inpt)
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      console.log("error ", data.message);
      alert("error" + data.message);
    } else {
      navigate("/", { replace: true });
      alert("data added");
      console.log("data added");
    }
  };

  return (
    <div className="container">
      <NavLink to="/">Home</NavLink>
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputDescription">Description</label>
            <input
              type="text"
              name="description"
              onChange={setdata}
              value={inpt.description}
              className="form-control"
              placeholder="Enter description"
            />
            {errors.description && (
              <div className="text-danger">{errors.description}</div>
            )}
          </div>
          {/* Repeat the same pattern for other input fields */}
          {/* Kcal */}
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputKcal">Kcal</label>
            <input
              type="number"
              name="kcal"
              value={inpt.kcal}
              onChange={setdata}
              className="form-control"
              placeholder="Kcal"
            />
            {errors.kcal && <div className="text-danger">{errors.kcal}</div>}
          </div>
          {/* Protein */}
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputProtein">Protein(g)</label>
            <input
              type="number"
              name="protein"
              value={inpt.protein}
              onChange={setdata}
              className="form-control"
              placeholder="Protein(g)"
            />
            {errors.protein && (
              <div className="text-danger">{errors.protein}</div>
            )}
          </div>
          {/* Fat */}
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputFat">Fat(g)</label>
            <input
              type="number"
              name="fat"
              value={inpt.fat}
              onChange={setdata}
              className="form-control"
              placeholder="Fat(g)"
            />
            {errors.fat && <div className="text-danger">{errors.fat}</div>}
          </div>
          {/* Carbs */}
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputCarbs">Carbs(g)</label>
            <input
              type="number"
              name="carbs"
              value={inpt.carbs}
              onChange={setdata}
              className="form-control"
              placeholder="Carbs(g)"
            />
            {errors.carbs && (
              <div className="text-danger">{errors.carbs}</div>
            )}
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button
            type="submit"
            onClick={addinpdata}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Add;
