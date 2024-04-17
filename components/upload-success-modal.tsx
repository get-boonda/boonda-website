'use client';

import { Check, Copy } from 'lucide-react';
import { Button } from './ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import clipboard from 'clipboardy';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

type UploadSuccessModalProps = {
  fileURL: string;
};

export function UploadSuccessModal({ fileURL }: UploadSuccessModalProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const copiedTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  async function copyToClipboard() {
    if (copiedTimeoutRef.current) {
      clearTimeout(copiedTimeoutRef.current);
    }

    await clipboard.write(fileURL);
    setIsCopied(true);
    toast.success('Copied to clipboard');
    const t = setTimeout(() => {
      setIsCopied(false);
    }, 3000);

    copiedTimeoutRef.current = t;
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Upload Successful</DialogTitle>
        <DialogDescription>
          Your file has been uploaded successfully. You can now share the link
          with others.
        </DialogDescription>
      </DialogHeader>
      <Label htmlFor="file-url">File URL</Label>
      <div className="flex items-start justify-start w-full gap-1">
        <Input
          ref={inputRef}
          id="file-url"
          value={fileURL}
          onFocus={() => {
            inputRef.current?.select();
          }}
        />

        <Button
          className="relative"
          size="icon"
          variant="ghost"
          onClick={copyToClipboard}
        >
          <Copy
            className="size-4 absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 data-[copied=true]:opacity-0 transition-all"
            data-copied={isCopied}
          />
          <Check
            className="size-4 absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 opacity-0 data-[copied=true]:opacity-100 transition-all"
            data-copied={isCopied}
          />
          <span className="opacity-0"></span>
        </Button>
      </div>
    </DialogContent>
  );
}
