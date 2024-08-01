import { Link } from "react-router-dom";
import { GoDatabase } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";

const Collection = ({ name, collections, documents, _id }) => {
  return (
    <Link>
      <li className="shadow-lg rounded-xl mt-10 max-w-[280px] h-48">
        <div className="bg-green-100 h-2 rounded-t-xl"></div>
        <div className="p-6">
          <div className="flex gap-6 items-center">
            <GoDatabase className="text-authblue" />
            <h2 className="font-medium capitalize">collection</h2>
          </div>
          <div className="my-4 font-medium">Documents: 0</div>
          <div className="flex items-center gap-3 justify-end">
            <span className="bg-stone-100 rounded-lg">
              <MdOutlineModeEditOutline className="m-3 text-sm text-stone-400" />
            </span>
            <span className="bg-stone-100 rounded-lg">
              <RiDeleteBinFill className="m-3 text-sm text-stone-400" />
            </span>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default Collection;
