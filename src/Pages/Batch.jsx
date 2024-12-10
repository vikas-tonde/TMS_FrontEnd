import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
const Batch = () => {

  let batch = useLoaderData();
  console.log(batch);
  return (
    <>
      <div className="flex-1 m-10" >
        <h3 className="pt-5 pl-5 pr-10 font-bold text-3xl">{batch?.batchName}</h3>
      </div>
    </>
  );
};

export default Batch;
