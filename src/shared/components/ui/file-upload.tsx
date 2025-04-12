import { UploadCloud, X, Image as ImageIcon, Video } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "../../utils/cn";

interface FileUploadProps {
  onChange: (file: File) => void;
  value?: string | File;
  onRemove: () => void;
  accept: "video" | "image";
  disabled?: boolean;
}

const FileUpload = ({
  onChange,
  value,
  onRemove,
  accept,
  disabled,
}: FileUploadProps) => {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setLoading(true);
        const file = acceptedFiles[0];
        onChange(file);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      ...(accept === "video" ? { "video/*": [] } : {}),
      ...(accept === "image" ? { "image/*": [] } : {}),
    },
    disabled: disabled || loading,
    maxFiles: 1,
    maxSize: accept === "video" ? 100 * 1024 * 1024 : 5 * 1024 * 1024, // 100MB для видео, 5MB для фото
  });

  // Если файл уже загружен, показываем превью
  if (value) {
    return (
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        {accept === "image" ? (
          <img
            src={value instanceof File ? URL.createObjectURL(value) : value}
            alt="Upload"
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={value instanceof File ? URL.createObjectURL(value) : value}
            className="w-full h-full object-cover"
            controls
            playsInline
          />
        )}
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 rounded-full bg-black/50 hover:bg-black/75 transition"
          type="button"
        >
          <X className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "w-full p-4 flex flex-col items-center justify-center gap-4",
        "border-2 border-dashed rounded-lg transition-colors",
        "hover:border-gray-400 cursor-pointer",
        {
          "opacity-50 cursor-not-allowed": disabled,
          "border-gray-400": isDragActive,
          "border-gray-200": !isDragActive,
        }
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="p-4 rounded-full bg-gray-100">
          {loading ? (
            <UploadCloud className="h-6 w-6 animate-bounce" />
          ) : accept === "image" ? (
            <ImageIcon className="h-6 w-6" />
          ) : (
            <Video className="h-6 w-6" />
          )}
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">
            {loading ? (
              "Загрузка..."
            ) : (
              <>
                Перетащите {accept === "image" ? "изображение" : "видео"} сюда
                или <span className="text-blue-500">выберите файл</span>
              </>
            )}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {accept === "image" ? "PNG, JPG до 5MB" : "MP4, WebM до 100MB"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
