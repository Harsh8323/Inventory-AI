import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import FileUpload from '../components/upload/FileUpload';
import PageShell from '../components/layout/PageShell';
import { uploadDataset } from '../services/api';

function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleUpload = async (file) => {
    try {
      setUploading(true);
      setUploadError(null);
      const response = await uploadDataset(file);
      setResult(response);
    } catch (err) {
      setUploadError(err.response?.data?.detail || 'Upload failed. Please check your CSV format.');
      setResult(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <PageShell
      badge="Data import"
      title="Upload Dataset"
      subtitle="Upload your inventory sales data in CSV format to begin analysis."
      headerExtra={
        <div className="rounded-xl border border-primary/20 bg-accent p-3 dark:border-lime-400/25 dark:bg-lime-400/10">
          <Upload className="h-6 w-6 text-primary dark:text-lime-300" />
        </div>
      }
    >
      <div className="rounded-2xl border border-border bg-muted/30 p-6 shadow-sm dark:border-lime-400/20 dark:bg-zinc-950/80 dark:shadow-[0_0_30px_rgba(132,204,22,0.06)]">
        <h2 className="mb-4 text-lg font-semibold text-card-foreground">Required CSV Format</h2>
        <div className="mb-6 overflow-x-auto rounded-xl border border-border bg-card p-4 dark:border-zinc-800 dark:bg-black/40">
          <code className="font-mono text-sm text-muted-foreground">
            date,product,sales,inventory
            <br />
            2025-01-01,Laptop,50,100
            <br />
            2025-01-01,Mouse,120,250
            <br />
            2025-01-02,Keyboard,80,150
          </code>
        </div>

        <FileUpload onUpload={handleUpload} uploading={uploading} result={result} />

        {uploadError ? (
          <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4 dark:border-rose-500/30 dark:bg-rose-500/10">
            <p className="text-sm text-destructive dark:text-rose-300">{uploadError}</p>
          </div>
        ) : null}
      </div>
    </PageShell>
  );
}

export default UploadPage;
