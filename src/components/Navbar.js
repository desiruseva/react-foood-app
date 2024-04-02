// import React from "react";

// export const Navbar = () => {
//     return (
//         <header>
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//                 <div className="container-fluid">
//                     {/* <NavLink className="navbar-brand" to="/">CRUD APP</NavLink> */}
//                     <a class="navbar-brand" href="/">
//                         Food App
//                     </a>
//                     <button
//                         class="navbar-toggler"
//                         type="button"
//                         data-toggle="collapse"
//                         data-target="#navbarSupportedContent"
//                         aria-controls="navbarSupportedContent"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span class="navbar-toggler-icon"></span>
//                     </button>
//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarSupportedContent"
//                         aria-controls="navbarSupportedContent"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <a className="nav-link active" aria-current="page" href="/">
//                                     Home
//                                 </a>
//                             </li>
//                         </ul>
//                         <form className="d-flex">
//                             <input
//                                 className="form-control me-2"
//                                 type="search"
//                                 placeholder="Search"
//                                 aria-label="Search"
//                             />
//                             <button className="btn btn-outline-success" type="submit">
//                                 Search
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </nav>
//         </header>
//     );
// };


import React, { useState } from "react";


export const Navbar = ({ foodData }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter food data based on search query
    const filteredFoodData = foodData?.filter((food) =>
        food.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        Food App
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">
                                    Home
                                </a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                            {/* No need for a submit button, search is live */}
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;






