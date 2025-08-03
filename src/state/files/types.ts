// File upload state
export type FilesState = {
  isLoading: boolean;
  error?: string;
};

// The response type from the upload API
export type FileUploadResponse = {
  filePath: string;
};
