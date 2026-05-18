
import React, { useRef, useState } from 'react';
import { UploadCloud, X, File as FileIcon } from 'lucide-react';

export default function FileUpload({ onFileSelect, accept, label, currentFileUrl }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setSelectedFile(file);
    if (onFileSelect) onFileSelect(file);
  };

  const clearFile = (e) => {
    e.preventDefault();
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
    if (onFileSelect) onFileSelect(null);
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      
      <div 
        className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-colors ${
          dragActive ? 'border-admin-gold bg-admin-gold/5' : 'border-gray-300 hover:border-admin-dark/50 bg-gray-50'
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
        
        {selectedFile ? (
          <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200 w-full max-w-xs" onClick={(e) => e.stopPropagation()}>
            <FileIcon className="w-8 h-8 text-admin-dark" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button onClick={clearFile} className="p-1 hover:bg-gray-100 rounded-full text-gray-500">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : currentFileUrl ? (
          <div className="flex flex-col items-center gap-2">
            <img src={currentFileUrl} alt="Current" className="h-24 object-contain rounded-md" />
            <p className="text-sm text-gray-500">Clique ou arraste para substituir</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center cursor-pointer">
            <UploadCloud className="w-10 h-10 text-gray-400 mb-3" />
            <p className="text-sm font-medium text-gray-700">Clique para fazer upload ou arraste o arquivo</p>
            <p className="text-xs text-gray-500 mt-1">Formatos suportados: {accept || 'Qualquer arquivo'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
