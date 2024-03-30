import React from 'react'

 export const 
Home = () => {
  return (
    <div className='mt-5'>
        <div className='container'>
            <div className='add_btn mt-2 mb-2'>
                <button className='btn btn-primary'>Add data</button>
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
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>                   
                    <td className='d-flex justify-content-between'>    
                        <button className='btn btn-success'><i class="fa-solid fa-eye"></i></button>
                        <button className='btn btn-primary'><i class="fa-solid fa-circle-info"></i></button>
                        <button className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
                    </td>
                    </tr> 
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>                   
                    <td className='d-flex justify-content-between'>    
                        <button className='btn btn-success'><i class="fa-solid fa-eye"></i></button>
                        <button className='btn btn-primary'><i class="fa-solid fa-circle-info"></i></button>
                        <button className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
                    </td>
                    </tr> 
                </tbody>
                </table>
        </div>
        
    </div>
  )
}
