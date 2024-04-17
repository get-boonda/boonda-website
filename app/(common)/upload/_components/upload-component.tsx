'use client';

import { Button } from '@/components/ui/button';
import { Dropzone } from '@/components/ui/dropzone';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useUpload } from '@/hooks/use-upload';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileCheck2Icon, Loader } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const UploadSchema = z.object({
  file: z.instanceof(File).nullable(),
});

export function UploadComponent() {
  const { mutate: upload, isPending: isUploading } = useUpload();
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
      // const allowedTypes = [
      //   { name: 'csv', types: ['text/csv'] },
      //   {
      //     name: 'excel',
      //     types: [
      //       'application/vnd.ms-excel',
      //       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      //     ],
      //   },
      // ];

      // const fileType = allowedTypes.find((allowedType) =>
      //   allowedType.types.find((type) => type === acceptedFiles[0].type)
      // );

      const fileType = acceptedFiles[0].type;

      if (!fileType) {
        form.setValue('file', null);
        form.setError('file', {
          message: 'File type is not valid',
          type: 'typeError',
        });
      } else {
        form.setValue('file', acceptedFiles[0]);
        form.clearErrors('file');
      }
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

    upload(values.file);
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col items-center justify-center w-96 h-36 gap-2"
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
                  dropMessage="Drop a file or click here"
                  handleOnDrop={handleOnDrop}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch('file') && (
          <div className="flex items-center justify-center gap-3 p-4 relative">
            <FileCheck2Icon className="h-4 w-4" />
            <p className="text-sm font-medium">{form.watch('file')?.name}</p>
          </div>
        )}
        <Button type="submit" disabled={isUploading}>
          {isUploading && <Loader className="size-4 animate-spin mr-2" />}
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
