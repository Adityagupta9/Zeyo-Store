import React from 'react'
import '../../../style/categoryForm.css'

const CategoryForm = ({handelSubmit,value,setValue}) => {
  return (
    <div id="category-form">
      <form action="" onSubmit={handelSubmit}>
        <input type="text" placeholder='New Category' value={value} onChange={(e)=>setValue(e.target.value)} />
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default CategoryForm
