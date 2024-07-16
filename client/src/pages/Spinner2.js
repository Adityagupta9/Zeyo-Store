import React from 'react'
import '../../src/style/spinner2.css';
import PuffLoader from 'react-spinners/PuffLoader';
const Spinner2 = () => {
  return (
    <div className="spinner2-container">
      <PuffLoader className="dash-spinner" color={"#00074c"} size={100} width={100}/>
    </div>
  )
}

export default Spinner2
