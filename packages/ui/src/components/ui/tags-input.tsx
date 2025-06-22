"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Input } from "./input";

interface TagsInputProps {
  values: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagsInput({ values, onChange, placeholder }: TagsInputProps) {
  const [input, setInput] = useState("");

  const addTag = (tag: string) => {
    if (tag && !values.includes(tag)) {
      onChange([...values, tag]);
    }
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(values.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input.trim());
    }
  };

  return (
    <div className="flex items-center flex-wrap gap-1 border rounded-md px-2 py-1">
      {values.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="flex items-center gap-1"
        >
          {tag}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="w-4 h-4 p-0"
            onClick={() => removeTag(tag)}
          >
            <X className="w-3 h-3" />
          </Button>
        </Badge>
      ))}
      <Input
        className="border-none outline-none focus-visible:ring-0 px-1 w-auto"
        value={input}
        placeholder={placeholder}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
