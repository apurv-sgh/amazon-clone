import React from "react";

export const ProductCard = (props) => {
  const { title, img, offer } = props;
  return (
    <>
      <div className="bg-white py-4 relative z-10 text-black w-full max-w-100 mx-2 flex flex-col justify-evenly">
        <div>
          <h1 className="px-4 font-semibold text-[21px] leading-6 text-[#0F1111] overflow-hidden">
            {title}
          </h1>
        </div>
        <div className=" p-4">
          <img className=" w-full" src={img} alt="" />
        </div>
        <div>
          <span className="text-[#007185] no-underline cursor-pointer transition-all duration-300 ease-in-out px-4 overflow-hidden hover:text-red-500">{offer}</span>
        </div>
      </div>
    </>
  );
};

export const ProductCard2 = (props) => {
  const { title, Detail } = props;
  return (
    <>
      <div className="bg-white py-4 relative z-10 text-black w-full max-w-100 mx-2 flex flex-col justify-evenly">
        <div>
          <h1 className="px-4 font-semibold text-[21px] leading-6 text-[#0F1111] overflow-hidden">
            {title}
          </h1>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 place-items-center p-4 gap-2">
          {
            Detail.map((item) => (
              <div className="" key={item.id}>
                <img className=" w-full" src={item.offerImage} />
                <p className="text-sm font-normal leading-4.5 overflow-hidden text-ellipsis max-w-36.5 max-h-9">{item.offer}</p>
              </div>
            ))
          }
        </div>
        <div>
          <span className="text-[#007185] no-underline cursor-pointer transition-all duration-300 ease-in-out px-4 overflow-hidden hover:text-red-500">See all Offers</span>
        </div>
      </div>
    </>
  );
};
