"use client";
import { useState } from "react";
import { JsonData, JsonEditor } from "json-edit-react";

export default function ConfigPage() {
  const [jsonData, setJsonData] = useState<JsonData>({});
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">Configuration</h1>
      <p className="text-gray-500">Configure your app settings here.</p>
      <div className="flex flex-col gap-4">
        <JsonEditor data={jsonData} setData={setJsonData} enableClipboard={true} />
      </div>
    </div>
  );
}
