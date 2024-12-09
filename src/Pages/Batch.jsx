import { useEffect, useState } from "react";
import axios from 'axios';

const Batch = () => {
  const [batch, setBatch] = useState({});
  useEffect(() => {
    axios.get('/api/admin/batches')
      .then(res => setBatch(res.data.data[0]))
      .catch(console.log("Error in fetching "));
  }, []);

  console.log(batch);

  return (
    <>
      <div className="flex-1 m-10" >
        <h1 className="pt-5 pl-5 pr-10 font-extrabold text-3xl font-serif">{batch.batchName}</h1>
        
      </div>
    </>
  );
};

export default Batch;
