import { Link } from "react-router-dom";
import { useLoaderData } from "react-router";

const Batch = () => {
  let batch = useLoaderData();
  console.log(batch);
  return (
    <>
    <div className="flex-1 bg-gray-500 bg-opacity-40 pb-6 backdrop-blur-md min-h-screen">
        <Link
          to='#'
          className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
        >
          {batch?.batchName}
        </Link>

        <div className="mt-4 mx-6 shadow-xl rounded-lg p-3 bg-white">
          
        </div>
      </div>
    </>
  );
};

export default Batch;
