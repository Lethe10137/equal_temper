import { useState } from "react";
import "./RadioForm.css";
type RadioFormProps<T> = {
  options: Record<string, T>;
  onChange: (value: T) => void;
};

export default function RadioForm<T>({ options, onChange }: RadioFormProps<T>) {
  const [selectedKey, setSelectedKey] = useState<string>("Major_Scale");

  const handleChange = (key: string) => {
    setSelectedKey(key);
    onChange(options[key]);
  };

  return (
    <div className="radio-form">
      {Object.keys(options).map((key) => (
        <label key={key} style={{ display: "block", margin: "5px 0" }}>
          <input
            type="radio"
            name="radioGroup"
            value={key}
            checked={selectedKey === key}
            onChange={() => handleChange(key)}
          />
          {key}
        </label>
      ))}
    </div>
  );
}
