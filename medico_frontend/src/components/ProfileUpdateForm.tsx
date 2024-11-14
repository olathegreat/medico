import { Toaster } from "./ui/sonner";
import { UserCircle } from "lucide-react";

const ProfileUpdateForm = () => {
 
  return (
    <form>
        <Toaster/>
      <div  >
        <label htmlFor="picture" className="relative cursor-pointer">
          <img src="" alt="profile-pics" />
          <span >
            <UserCircle />
          </span>
        </label>
        <input type="file" name="picture" hidden/>
      </div>
    </form>
  );
};

export default ProfileUpdateForm;
