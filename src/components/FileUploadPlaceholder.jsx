import React, { useState, useCallback } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const FileUploadPlaceholder = ({ onFileUpload, label = "Upload Files", description = "Drag & drop files here or click to browse" }) => {
  const [files, setFiles] = useState([]);
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    if (newFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      if (onFileUpload) {
        onFileUpload([...files, ...newFiles]);
      }
      toast({
        title: "Files Selected (Simulated)",
        description: `${newFiles.length} file(s) have been selected. In a real app, they would be uploaded.`,
      });
    }
  };

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
      if (onFileUpload) {
        onFileUpload([...files, ...droppedFiles]);
      }
      toast({
        title: "Files Dropped (Simulated)",
        description: `${droppedFiles.length} file(s) have been dropped. In a real app, they would be uploaded.`,
      });
    }
  }, [files, onFileUpload, toast]);

  const removeFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
    if (onFileUpload) {
        const updatedFiles = files.filter(file => file.name !== fileName);
        onFileUpload(updatedFiles);
      }
  };

  return (
    <div className="space-y-4">
      <div
        className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer border-input hover:border-primary transition-colors"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload-input').click()}
      >
        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
        <p className="mb-2 text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
        <input id="file-upload-input" type="file" multiple className="hidden" onChange={handleFileChange} />
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Selected files:</h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between p-2 text-sm rounded-md bg-secondary">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{file.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">({(file.size / 1024).toFixed(2)} KB)</span>
                </div>
                <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => removeFile(file.name)}>
                  <X className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Note: This is a frontend simulation. Actual file uploads require backend integration.
      </p>
    </div>
  );
};

export default FileUploadPlaceholder;