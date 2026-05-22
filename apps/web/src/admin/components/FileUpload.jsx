
import React, { useMemo, useRef, useState } from 'react';
import {
  UploadCloud,
  X,
  File as FileIcon,
  Image as ImageIcon,
} from 'lucide-react';
import { toast } from 'sonner';

const MAX_FILE_SIZE_MB = 10;

export default function FileUpload({
  onFileSelect,
  accept = '*',
  label,
  currentFileUrl,
  previewType = 'auto',
}) {
  const inputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const previewUrl = useMemo(() => {
    if (!selectedFile) return null;

    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const isImage = (file) => {
    if (!file) return false;

    return file.type.startsWith('image/');
  };

  const validateFile = (file) => {
    const fileSizeMB = file.size / 1024 / 1024;

    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      toast.error(
        `O arquivo excede o limite de ${MAX_FILE_SIZE_MB}MB.`
      );

      return false;
    }

    return true;
  };

  const handleFile = (file) => {
    if (!file) return;

    if (!validateFile(file)) return;

    setSelectedFile(file);

    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (
      event.type === 'dragenter' ||
      event.type === 'dragover'
    ) {
      setDragActive(true);
    }

    if (event.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const clearFile = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedFile(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  const renderPreview = () => {
    if (selectedFile) {
      const imageFile = isImage(selectedFile);

      return (
        <div
          className="flex w-full max-w-md items-center gap-4 rounded-2xl border border-admin-border bg-white p-4 shadow-sm"
          onClick={(event) => event.stopPropagation()}
        >
          {imageFile ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="h-20 w-20 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gray-100">
              <FileIcon className="h-8 w-8 text-admin-dark" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-admin-dark">
              {selectedFile.name}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <button
            type="button"
            onClick={clearFile}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-admin-danger"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      );
    }

    if (currentFileUrl) {
      const shouldRenderImage =
        previewType === 'image' ||
        (previewType === 'auto' &&
          /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(currentFileUrl));

      return (
        <div className="flex flex-col items-center gap-3">
          {shouldRenderImage ? (
            <img
              src={currentFileUrl}
              alt="Arquivo atual"
              className="max-h-48 rounded-2xl border border-admin-border object-cover shadow-sm"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gray-100">
              <FileIcon className="h-10 w-10 text-admin-dark" />
            </div>
          )}

          <p className="text-sm text-gray-500">
            Clique ou arraste um arquivo para substituir
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-admin-gold/10">
          <UploadCloud className="h-10 w-10 text-admin-gold" />
        </div>

        <p className="text-sm font-semibold text-admin-dark">
          Clique para enviar ou arraste um arquivo
        </p>

        <p className="mt-2 text-xs text-gray-500">
          Formatos suportados: {accept}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          Tamanho máximo: {MAX_FILE_SIZE_MB}MB
        </p>
      </div>
    );
  };

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-admin-dark">
          {label}
        </label>
      )}

      <div
        className={`relative flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-6 transition-all duration-200 ${
          dragActive
            ? 'border-admin-gold bg-admin-gold/5'
            : 'border-admin-border bg-gray-50 hover:border-admin-dark/40 hover:bg-white'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {renderPreview()}
      </div>
    </div>
  );
}