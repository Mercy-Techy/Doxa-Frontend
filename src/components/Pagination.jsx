import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const Pagination = ({
  data,
  page,
  setPage,
  margin = "my-16",
  margin2 = "my-16",
}) => {
  const nextPage = () => {
    if (page < data?.totalPages) setPage(page + 1);
    return;
  };
  const prevPage = () => {
    if (page > 1) setPage(page - 1);
    return;
  };
  return (
    <div className={`flex justify-center items-center ${margin} w-full`}>
      <div className={`flex items-center gap-2 ${margin2}`}>
        <MdNavigateBefore
          onClick={prevPage}
          className={`${
            page === 1 ? "text-gray-500" : "text-black"
          } text-lg font-bold`}
        />
        <button className="px-2 text-center rounded-full text-black bg-textlime">
          {page}
        </button>
        <MdNavigateNext
          onClick={nextPage}
          className={`${
            data?.totalPages === page ? "text-gray-500" : "text-black"
          } text-lg font-bold`}
        />
      </div>
    </div>
  );
};

export default Pagination;
