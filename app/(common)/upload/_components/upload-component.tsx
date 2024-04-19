'use client';

import { Button } from '@/components/ui/button';
import { Dropzone } from '@/components/ui/dropzone';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { createPushModal } from 'pushmodal';
import { Dialog } from '@/components/ui/dialog';
import { UploadSuccessModal } from '@/components/upload-success-modal';
import { useUpload } from '@/hooks/use-upload';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useSession } from '@/hooks/use-session';
import { MAX_ANON_SIZE_BYTES, MAX_LOGGED_SIZE_BYTES } from '@/lib/constants';
import { useEffect, useState } from 'react';

export const {
  pushModal,
  popModal,
  popAllModals,
  replaceWithModal,
  useOnPushModal,
  onPushModal,
  ModalProvider,
} = createPushModal({
  modals: {
    // Short hand
    // Longer definition where you can choose what wrapper you want
    // Only needed if you don't want `Dialog.Root` from '@radix-ui/react-dialog'
    // shadcn drawer needs a custom Wrapper
    UploadSuccessDialog: {
      // @ts-ignore - Library still needs improvement
      Wrapper: Dialog,
      Component: UploadSuccessModal,
    },
  },
});

const UploadSchema = z.object({
  file: z.instanceof(File).nullable(),
});

export function UploadComponent() {
  const { mutate: upload, isPending: isUploading } = useUpload();
  const { data } = useSession();

  const defaultValues: { file: null | File } = {
    file: null,
  };

  const form = useForm<z.infer<typeof UploadSchema>>({
    resolver: zodResolver(UploadSchema),
    defaultValues,
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
  });

  function handleOnDrop(acceptedFiles: FileList | null) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const maxSize = data ? MAX_LOGGED_SIZE_BYTES : MAX_ANON_SIZE_BYTES;
      if (acceptedFiles[0].size > maxSize) {
        form.setValue('file', null);
        return form.setError('file', {
          message: 'File is too big',
          type: 'typeError',
        });
      }

      form.setValue('file', acceptedFiles[0]);
      form.clearErrors('file');
    } else {
      form.setValue('file', null);
      form.setError('file', {
        message: 'File is required',
        type: 'typeError',
      });
    }
  }

  function handleFormSubmit(values: z.infer<typeof UploadSchema>) {
    if (!values.file) {
      return;
    }

    upload(values.file, {
      onSuccess: (url) => {
        if (!url) {
          toast.error('An error occurred while uploading the file');
          return;
        }

        pushModal('UploadSuccessDialog', {
          fileURL: url,
        });
      },
    });
  }

  return (
    <>
      <ModalProvider />
      <FormProvider {...form}>
        <form
          className="flex flex-col items-center justify-center w-96 min-h-36 gap-2 z-[1] relative"
          onSubmit={form.handleSubmit(handleFormSubmit)}
          noValidate
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="w-full h-full">
                <FormControl>
                  <Dropzone
                    {...field}
                    classNameWrapper="bg-zinc-950/55 border-0 hover:bg-zinc-950/65 transition-colors backdrop-blur-md"
                    dropMessage="Drag and drop a file or click to select one"
                    isLoggedIn={!!data}
                    handleOnDrop={handleOnDrop}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center w-full">
            <Button
              className="w-full opacity-100 cursor-pointer"
              type="submit"
              disabled={(!form.watch('file') && !isUploading) || isUploading}
            >
              {isUploading && <Loader className="size-4 animate-spin mr-2" />}
              Upload
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
