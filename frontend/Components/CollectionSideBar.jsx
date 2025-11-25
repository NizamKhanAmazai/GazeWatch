import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";

function CollectionSideBar({
  setPrdctType,
  SubCtgy,
  MianCtgy, 
  showFilter,
  setShowFilter,
}) {
  return (
    <div
      className={`w-[100%] border-r-2 border-slate-500 ${
        showFilter ? "h-[100vh]" : "h-[40px]"
      }  md:min-h-[100vh]`}
    >
      <p className="text-[24px] inline text-[#cadbbf] pl-5 font-serif cursor-pointer" onClick={() => setShowFilter((prev) => !prev)}>
        Filters
        {showFilter ? (
          <IoMdArrowDropupCircle
            className="text-[30px] ml-5 inline md:hidden cursor-pointer "
            // onClick={() => setShowFilter((prev) => !prev)}
          />
        ) : (
          <IoMdArrowDropdownCircle
            className="text-[30px] ml-5 inline md:hidden  cursor-pointer"
            // onClick={() => setShowFilter((prev) => !prev)}
          />
        )}
      </p>
      <div className={`${showFilter ? "" : "hidden"} md:block`}>
        <div className="Category w-[70%] md:w-[90%] md:h-[140px] h-[160px] bg-[#d3f7dc] border-2 border-blue-900 ring-2  shadow-lg shadow-gray-500 ring-blue-600 m-auto mt-2 rounded-xl flex flex-col  justify-center ">
          <p className="md:text-[20px] lg:text-[24px] text-[#100c38] pl-1 font-semibold">
            Main Category
          </p>
          <div className="h-[1px] w-[90%] bg-slate-400 mt-2 m-auto"></div>
          <label
            htmlFor="Man"
            className="md:w-[70%] cursor-pointer lg:w-[90%] ml-5 text-[#0305a0] h-[50px] flex flex-row flex-nowrap justify-start items-center "
          >
            <input
              type="checkbox"
              id="Man"
              className="size-[18px]"
              value={"Men"}
              onChange={MianCtgy}
            />
            <span className="inline ml-3 font-semibold ">MAN</span>
          </label>
          <label
            htmlFor="Women"
            className="md:w-[70%] cursor-pointer lg:w-[90%] ml-5  text-[#0305a0] h-[50px] flex flex-row flex-nowrap justify-start items-center "
          >
            <input
              type="checkbox"
              id="Women"
              value={"Women"}
              className="size-[18px]"
              onChange={MianCtgy}
            />
            <span className="inline ml-3 font-semibold ">WOMAN</span>
          </label>
          <label className="md:w-[70%] cursor-pointer lg:w-[90%] ml-5   text-[#0305a0] h-[50px] flex flex-row flex-nowrap justify-start items-center ">
            <input
              type="checkbox"
              value={"Kid"}
              className="size-[18px]"
              onChange={MianCtgy}
            />
            <span className="inline ml-3 font-semibold ">KID's</span>
          </label>
        </div>
        {/* ----------------------------------Sub category ---------------------- */}
        {/* <div className="h-[20px]"></div> */}
        <div className="Category w-[70%] md:w-[90%] mt-3 md:h-[130px] h-[140px] bg-[#d3f7dc] border-2 border-blue-900 ring-2  shadow-lg shadow-gray-500 ring-blue-600 m-auto   rounded-xl flex flex-col  justify-center ">
          <p className="md:text-[20px] lg:text-[24px] text-[#100c38] pl-1 font-semibold">
            Sub-Category
          </p>
          <div className="h-[1px] w-[90%] bg-slate-400 mt-2 m-auto"></div>
          {/* -------------------------- */}
          <div className="">
            <label
              htmlFor="Affordable"
              className="md:w-[70%] lg:w-[90%] cursor-pointer ml-5 text-[#0305a0] h-[40px] flex flex-row flex-nowrap justify-start items-center "
            >
              <input
                type="checkbox"
                id="Affordable"
                value={"Affordable"}
                className="w-[18px] h-[18px]"
                onChange={SubCtgy}
              />
              <span className="inline ml-2 font-semibold ">Affordable</span>
            </label>
            <label
              htmlFor="Luxury"
              className="md:w-[70%] lg:w-[90%] ml-5 cursor-pointer text-[#0305a0] h-[40px] flex flex-row flex-nowrap justify-start items-center "
            >
              <input
                type="checkbox"
                id="Luxury"
                value={"Luxury"}
                className="size-[18px]"
                onChange={SubCtgy}
              />
              <span className="inline ml-3 font-semibold ">Luxury</span>
            </label>
          </div>
          {/* ------------------------------------- */}
        </div>

        <div className="Category w-[70%] md:w-[90%] mt-3 md:h-[130px] h-[140px] bg-[#d3f7dc] border-2 border-blue-900 ring-2  shadow-lg shadow-gray-500 ring-blue-600 m-auto   rounded-xl flex flex-col  justify-center ">
          <p className="md:text-[20px]  lg:text-[24px] text-[#100c38] pl-1 font-semibold">
            Product Type
          </p>
          <div className="h-[1px] w-[90%] bg-slate-400 mt-2 m-auto"></div>
          {/* -------------------------- */}
          <div className="">
            <label
              htmlFor="Watches"
              className="md:w-[70%] lg:w-[90%] cursor-pointer ml-5 text-[#0305a0] h-[30px] flex flex-row flex-nowrap justify-start items-center "
            >
              <input
                type="checkbox"
                id="Watches"
                value={"Watch"}
                className="size-[18px]"
                onChange={setPrdctType}
              />
              <span className="inline ml-3 font-semibold ">Watches</span>
            </label>
            <label
              htmlFor="Glasses"
              className="md:w-[70%] lg:w-[90%] ml-5 cursor-pointer text-[#0305a0] h-[50px] flex flex-row flex-nowrap justify-start items-center "
            >
              <input
                type="checkbox"
                id="Glasses"
                value={"Glass"}
                className="size-[18px]"
                onChange={setPrdctType}
              />
              <span className="inline ml-3 font-semibold ">Glasses</span>
            </label>
          </div>
          {/* ------------------------------------- */}
        </div>
        {/* hdden div below */}
      </div>
    </div>
  );
}

export default CollectionSideBar;
