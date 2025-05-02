import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-base-200 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
          {/* Profile Header with Avatar */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-28 sm:size-32 rounded-full object-cover ring-2 ring-base-300"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute -bottom-1 -right-1 
                  bg-primary p-2.5 rounded-full cursor-pointer 
                  hover:scale-105 transition shadow-sm
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-4 h-4 text-primary-content" />
                <input type="file" id="avatar-upload" className="hidden" accept="image/*" 
                  onChange={handleImageUpload} disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold">{authUser?.fullName}</h1>
              <p className="text-sm text-base-content/60 mt-1">{authUser?.email}</p>
              {isUpdatingProfile && <p className="text-xs text-primary mt-2">Uploading...</p>}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="bg-base-100 rounded-lg p-4 space-y-2">
              <h2 className="font-semibold mb-4">Personal Info</h2>
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-base-content/60" />
                <span className="text-base-content/60">Full Name</span>
                <span className="ml-auto font-medium">{authUser?.fullName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-base-content/60" />
                <span className="text-base-content/60">Email</span>
                <span className="ml-auto font-medium">{authUser?.email}</span>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-base-100 rounded-lg p-4 space-y-2">
              <h2 className="font-semibold mb-4">Account Status</h2>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-base-content/60">Member Since</span>
                <span className="ml-auto font-medium">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-base-content/60">Status</span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                  <span className="text-success font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;