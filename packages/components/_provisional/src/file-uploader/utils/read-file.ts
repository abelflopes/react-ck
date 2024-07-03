export interface FileReadResult extends Pick<File, "name" | "lastModified" | "size" | "type"> {
  content: NonNullable<ProgressEvent<FileReader>["target"]>["result"];
}

export type ProgressFunction<T = number> = (data: T) => void;

/**
 * Returns file info and encoded content
 */
export const readFile = async (
  file: File,
  onProgress?: ProgressFunction,
): Promise<FileReadResult> =>
  new Promise<FileReadResult>((resolve, reject) => {
    const reader = new FileReader();

    function trackProgress(e: ProgressEvent<FileReader>): void {
      const percent = e.loaded === 0 && e.total === 0 ? 100 : (e.loaded * 100) / e.total;
      onProgress?.(percent);
    }

    function handleError(e: ProgressEvent<FileReader>): void {
      const error = e.target?.error;
      reject(new Error(error ? `${error.name} - ${error.message}` : "Unknown Error"));
    }

    reader.addEventListener("loadstart", trackProgress);
    reader.addEventListener("progress", trackProgress);

    reader.addEventListener("abort", handleError);
    reader.addEventListener("error", handleError);

    reader.addEventListener("load", (e) => {
      if (!e.target) throw new Error("Missing file reader target");

      resolve({
        name: file.name,
        lastModified: file.lastModified,
        size: file.size,
        type: file.type,
        content: e.target.result,
      });
    });

    reader.readAsDataURL(file);
  });

export const readFileList = async (
  fileList: FileList,
  onProgress?: ProgressFunction<{
    loadedFiles: number;
    totalFiles: number;
    totalProgress: number;
  }>,
): Promise<FileReadResult[]> => {
  const progressMap: Record<string, number> = {};

  function getStats(): void {
    const progressValues = Object.values(progressMap);
    const totalFiles = progressValues.length;
    const loadedFiles = progressValues.filter((i) => i === 100).length;
    const totalProgress =
      progressValues.reduce((prev, curr) => curr + prev) / progressValues.length;

    onProgress?.({ totalFiles, loadedFiles, totalProgress });
  }

  const result = await Promise.all(
    [...fileList].map(
      async (i): Promise<FileReadResult> =>
        readFile(i, (progress) => {
          const id = [i.name, i.lastModified, i.size, i.type].join();
          progressMap[id] = progress;
          getStats();
        }),
    ),
  );
  return result;
};
