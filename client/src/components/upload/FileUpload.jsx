import React, { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, CheckCircle, XCircle } from 'lucide-react';

function FileUpload({ onUpload, uploading, result }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file) => {
    setError(null);
    if (!file.name.endsWith('.csv')) {
      setError('Only CSV files are accepted');
      return;
    }
    onUpload(file);
  };

  const dropZoneClass = isDragging
    ? 'border-primary bg-accent shadow-md dark:border-lime-400 dark:bg-lime-400/10 dark:shadow-[0_0_40px_rgba(163,230,53,0.15)]'
    : 'border-border hover:border-primary/40 hover:bg-muted/50 dark:border-zinc-700 dark:hover:border-lime-400/40 dark:hover:bg-zinc-900/50';

  return (
    <div className="space-y-4">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all ${dropZoneClass} ${
          uploading ? 'pointer-events-none opacity-60' : ''
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full border border-primary/25 bg-accent p-4 dark:border-lime-400/30 dark:bg-lime-400/10">
            <Upload className="h-8 w-8 text-primary dark:text-lime-300" />
          </div>
          <div>
            <p className="text-lg font-medium text-card-foreground">Drop your CSV file here</p>
            <p className="mt-1 text-sm text-muted-foreground">or click to browse</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <FileSpreadsheet className="h-4 w-4" />
            <span>CSV format only</span>
          </div>
        </div>
      </div>

      {error ? (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
          <XCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      ) : null}

      {result ? (
        <div className="rounded-2xl border border-primary/25 bg-primary/5 p-6 dark:border-lime-400/25 dark:bg-lime-400/5">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl border border-primary/25 bg-accent p-2 dark:border-lime-400/30 dark:bg-lime-400/10">
              <CheckCircle className="h-5 w-5 text-primary dark:text-lime-300" />
            </div>
            <h3 className="font-semibold text-card-foreground">Upload Successful</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-border bg-card p-3 text-center dark:border-zinc-800 dark:bg-black/40">
              <p className="text-2xl font-bold text-card-foreground">{result.rows}</p>
              <p className="text-xs text-muted-foreground">Total Rows</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center dark:border-zinc-800 dark:bg-black/40">
              <p className="text-2xl font-bold text-card-foreground">{result.products}</p>
              <p className="text-xs text-muted-foreground">Products</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center dark:border-zinc-800 dark:bg-black/40">
              <p className="text-sm font-medium text-card-foreground">
                {result.date_range.start} - {result.date_range.end}
              </p>
              <p className="text-xs text-muted-foreground">Date Range</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default FileUpload;
