import { ContentType, IFolder } from "../types/interfaces";
import api from "../utils/axios-instance";
import { FolderFormValues } from "@/schema/folder.schema";

class FoldersService {
  async getFolders(type?: "player" | "coach" | "parent"): Promise<IFolder[]> {
    const response = await api.get(`/folders`, {
      params: {
        type,
      },
    });
    return response.data;
  }

  async getFolder(id: string): Promise<IFolder | null> {
    const response = await api.get(`/folders/${id}`);
    console.log(response);
    return response.data;
  }

  async createFolder(
    name: string,
    type: ContentType,
    description: string,
    about: string
  ): Promise<IFolder> {
    const response = await api.post(`/folders`, {
      name,
      type,
      description,
      about,
    });
    return response.data;
  }

  async updateFolder(id: string, folder: FolderFormValues): Promise<IFolder> {
    const response = await api.put(`/folders/${id}`, folder);
    return response.data;
  }

  async deleteFolder(id: string): Promise<void> {
    await api.delete(`/folders/${id}`);
  }
}

export const foldersService = new FoldersService();
