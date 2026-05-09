import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface Props {
  value?: string;
  onChange: (url: string) => void;
  bucketPath?: string;
}

export default function ImageField({ value, onChange, bucketPath = "site-content" }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${bucketPath}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("landing-images").upload(path, file);
    if (error) { toast.error(error.message); setUploading(false); return; }
    const { data } = supabase.storage.from("landing-images").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
    toast.success("Imagem enviada!");
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <Input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="https://..." />
        <label className="cursor-pointer shrink-0">
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          <div className="bg-primary text-primary-foreground px-3 h-10 rounded-md text-sm flex items-center gap-1">
            <Upload className="w-4 h-4" /> {uploading ? "..." : "Upload"}
          </div>
        </label>
      </div>
      {value && <img src={value} alt="" className="h-20 rounded border border-border object-cover" />}
    </div>
  );
}