import {
  calculateRetention,
  millisecondsToStr,
} from "@/app/utils/calculateRetention";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MAX_ANON_SIZE_BYTES, MAX_LOGGED_SIZE_BYTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import React, { ChangeEvent, useRef } from "react";

interface DropzoneProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  classNameWrapper?: string;
  className?: string;
  dropMessage: string;
  isLoggedIn: boolean;
  handleOnDrop: (acceptedFiles: FileList | null) => void;
}

export const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  (
    {
      className,
      classNameWrapper,
      dropMessage,
      handleOnDrop,
      isLoggedIn,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    // Function to handle drag over event
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handleOnDrop(null);
    };

    // Function to handle drop event
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const { files } = e.dataTransfer;
      if (inputRef.current) {
        inputRef.current.files = files;
        handleOnDrop(files);
      }
    };

    // Function to simulate a click on the file input element
    const handleButtonClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    let maxSize = isLoggedIn ? MAX_LOGGED_SIZE_BYTES : MAX_ANON_SIZE_BYTES;
    let selectedFile =
      (inputRef.current?.files?.[0]?.size ?? 0) <= maxSize
        ? inputRef.current?.files?.[0]
        : null;
    let retention = calculateRetention({
      isLoggedIn,
      sizeInBytes: selectedFile?.size || 0,
    });

    return (
      <Card
        ref={ref}
        className={cn(
          `border-2 flex justify-center items-center border-dashed h-full bg-muted hover:cursor-pointer hover:border-muted-foreground/50`,
          classNameWrapper
        )}
      >
        <CardContent
          className="flex flex-col w-full h-full items-center justify-center space-y-2 px-2 py-4 text-xs"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="flex items-center justify-center text-muted-foreground">
            {selectedFile ? (
              <div className="flex flex-col gap-1">
                <span className="font-medium text-sm">
                  {`File selected: ${selectedFile.name}`}
                </span>
                <span className="font-medium text-center">
                  {`Retention: ${millisecondsToStr(retention)}`}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <Upload size={24} />
                <span className="font-medium">{dropMessage}</span>
                <span className="font-medium">
                  File size limit: {isLoggedIn ? "50MB" : "30MB"}
                </span>
              </div>
            )}

            <Input
              {...props}
              value={undefined}
              ref={inputRef}
              type="file"
              multiple={false}
              className={cn("hidden", className)}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleOnDrop(e.target.files)
              }
            />
          </div>
        </CardContent>
      </Card>
    );
  }
);
