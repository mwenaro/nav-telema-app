// ProfilePic.js
import { Img } from '@/components';
import { IoPersonCircleSharp } from 'react-icons/io5';

const ProfilePic = ({ imageUrl ="/images/avatar.png", size = 50 }:{imageUrl?:string|null, size?:number}) => {
  return (
    // <div className="flex items-center justify-center w-full m-5">
      <div
        className={`w-[${size*1.2}] h-[${size*1.2}] max-w-[50px] max-h-[50px] bg-gray-300 rounded-full overflow-hidden flex justify-center items-center `}
        
      >
        {imageUrl ? (
          <Img
            src={imageUrl ?? "/images/avatar.png"}
            alt="Profile"
            className={`w-full h-full object-cover w-[${size*0.7}px] h-[${size*0.7}px]`}
          />
        ) : (
          <IoPersonCircleSharp size={size * 0.8} className="text-gray-600 m-auto" />
        )}
      </div>
    // </div>
  );
};

export default ProfilePic;
