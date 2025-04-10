import { FolderFormValues } from "@/schema/folder.schema";
import { foldersService } from "../services/folders.service";
import { ContentType } from "../types/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const FOLDERS_QUERY_KEY = "folders";

interface UseFoldersOptions {
  type?: ContentType;
  enabled?: boolean;
}

export const useFolders = (options?: UseFoldersOptions) => {
  return useQuery({
    queryKey: [FOLDERS_QUERY_KEY, options?.type],
    queryFn: () => foldersService.getFolders(options?.type),
    enabled: options?.enabled,
  });
};

export const FOLDER_QUERY_KEY = "folder";

export const useFolder = (id: string) => {
  return useQuery({
    queryKey: [FOLDER_QUERY_KEY, id],
    queryFn: () => foldersService.getFolder(id),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!id,
  });
};

export const useCreateFolder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: {
      name: string;
      type: ContentType;
      description: string;
      about: string;
    }) =>
      foldersService.createFolder(
        data.name,
        data.type,
        data.description,
        data.about
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [FOLDERS_QUERY_KEY],
      });
      navigate("/admin/folders");
      toast.success("Папка успешно создана");
    },
    onError: () => {
      navigate("/admin/folders");
      toast.error("Ошибка при создании папки");
    },
  });
};

// Обновление папки
export const useUpdateFolder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { id: string; folder: FolderFormValues }) =>
      foldersService.updateFolder(data.id, data.folder),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [FOLDERS_QUERY_KEY],
      });
      await queryClient.invalidateQueries({
        queryKey: [FOLDER_QUERY_KEY, variables.id],
      });
      navigate("/admin/folders");
      toast.success("Папка обновлена");
    },
    onError: () => {
      navigate("/admin/folders");
      toast.error("Ошибка при обновлении папки");
    },
  });
};

// Удаление папки
export const useDeleteFolder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: string) => foldersService.deleteFolder(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [FOLDERS_QUERY_KEY],
      });
      navigate("/admin/folders");
      toast.success("Папка удалена");
    },
    onError: () => {
      navigate("/admin/folders");
      toast.error("Ошибка при удалении папки");
    },
  });
};
