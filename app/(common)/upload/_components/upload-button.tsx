'use client';

import { Button } from '@/components/ui/button';
import { useUpload } from '@/hooks/use-upload';
import { Loader } from 'lucide-react';
import { useRef, useState } from 'react';

export function UploadButton() {
  const [files, setFiles] = useState<File[] | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { mutate: upload, isPending: isUploading } = useUpload();

  return (
    <>
      <div className="flex flex-col gap-4">
        <Button asChild>
          <label htmlFor="upload">Select File</label>
        </Button>
        <div className="flex flex-col gap-1">
          <div className="w-96 max-w-full flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Selected File</span>
          </div>
          <ul className="flex flex-col gap-1">
            {files && files.length > 0 ? (
              files.map((file) => (
                <li>
                  {file.name} - {file.size}
                </li>
              ))
            ) : (
              <span className="text-sm text-foreground">No selected file</span>
            )}
          </ul>
        </div>

        {files && files.length > 0 && (
          <Button disabled={isUploading} onClick={() => upload(files[0])}>
            {isUploading && <Loader className="size-4 animate-spin" />}
            Submit file
          </Button>
        )}
      </div>
      <input
        ref={inputFileRef}
        onChange={(e) =>
          e.target.files
            ? setFiles(Array.from(e.target.files ?? []))
            : setFiles(null)
        }
        disabled={isUploading}
        type="file"
        name="upload"
        id="upload"
        hidden
      />
    </>
  );
}
