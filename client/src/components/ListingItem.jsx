import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0] || "https://anywhere.re/wp-content/uploads/2023/05/633f08923c4c51e97e723cde_State-of-Luxury-Real-Estate-in-Partnership-with-AREAA-2048x1406-1-1024x703.jpeg"}
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105  transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold">{listing.name}</p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            ${""}
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === 'rent' && ' / month'}
          </p>
          <div className="text-slate-600 flex gap-4">
               <div className=" font-bold text-xs">
               {listing.bedrooms > 1 ? `${listing.bedrooms}
                   beds ` : `${listing.bedrooms} bed` } 
               </div>
               <div className=" font-bold text-xs">
               {listing.bathrooms > 1 ? `${listing.bathrooms}
                   bath ` : `${listing.bathrooms} bath` } 
               </div>
               
        </div>       
        </div> 
      </Link>
    </div>
  );
}
