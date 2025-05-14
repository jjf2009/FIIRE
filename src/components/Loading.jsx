import { Loader2 } from "lucide-react";

const Loading = ({ message = "Loading, please wait...", size = 12 }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className={`h-${size} w-${size} animate-spin text-emerald-500`} />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
