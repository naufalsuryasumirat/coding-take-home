"use client"

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type CheckboxEl = {
  checked: boolean,
  checkedChange: (v: boolean) => void,
  text: string,
};

interface ChoicesProps {
  isShowMissing: boolean; // defined again because tied to graying out Select
  missingCount: number,
  keyItem: "color" | "language",
  setKeyItem: (v: "color" | "language") => void,
  keyItems: string[],
  valueItem: string|null,
  setValueItem: (v: string|null) => void,
  valueItems: string[],
  checkboxes: CheckboxEl[];
};

export default function Component({
  isShowMissing,
  missingCount,
  keyItem,
  setKeyItem,
  keyItems,
  valueItem,
  setValueItem,
  valueItems,
  checkboxes,
}: ChoicesProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-center mb-3 gap-6">
        <div className="flex-1 flex flex-col justify-between">
          <Label htmlFor="select-key" className="font-medium mb-1">Key</Label>
          <Select
            value={keyItem}
            onValueChange={setKeyItem}
          >
            <SelectTrigger id="select-key" className="w-full">
              <SelectValue placeholder="Select Key"/>
            </SelectTrigger>
            <SelectContent className="bg-[#242424]">
              {keyItems.map((k) => (
                <SelectItem key={k} value={k}>{k.charAt(0).toUpperCase() + k.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <Label htmlFor="select-value" className="font-medium mb-1">Value</Label>
          <Select
            value={valueItem == null ? "" : valueItem}
            onValueChange={setValueItem}
            disabled={isShowMissing}
          >
            <SelectTrigger id="select-value" className="w-full">
              <SelectValue placeholder="Select Value"/>
            </SelectTrigger>
            <SelectContent className="bg-[#242424]">
              {valueItems.map((v) => (
                <SelectItem key={v} value={v.toLowerCase()}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-center">
        {checkboxes.map((checkbox) => (
          <Label
            key={checkbox.text}
            className="flex items-center justify-center w-[250px] cursor-pointer">
            <Checkbox
              className="h-4 w-4 mr-4 cursor-pointer rounded"
              checked={checkbox.checked}
              onCheckedChange={checkbox.checkedChange}
            />
            <span className="whitespace-nowrap">{checkbox.text}</span>
          </Label>
        ))}
      </div>
      <h3>
        Fetched <u>{isShowMissing ? "missing" : valueItem}</u> {keyItem}s, Missing: <u>{missingCount}</u> listings
      </h3>
    </div>
  );
}
