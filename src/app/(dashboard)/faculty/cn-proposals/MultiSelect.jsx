"use client";
import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";

const MultiSelect = ({ options = [], placeholder, value = [], onChange }) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (val) => {
    let updated;

    if (value.includes(val)) {
      updated = value.filter((v) => v !== val);
    } else {
      updated = [...value, val];
    }

    onChange(updated);
  };

  return (
    <div className="relative w-full">
      {/* Selected Box */}
      <div
        onClick={() => setOpen((o) => !o)}
        className="
          flex items-center justify-between px-3 py-2 rounded-md border 
          dark:bg-dark-900 bg-white cursor-pointer
        "
      >
        <div className="flex flex-wrap gap-2 text-sm">
          {value.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            value.map((val) => {
              const label = options.find((o) => o.value === val)?.label;
              return (
                <span
                  key={val}
                  className="bg-primary/10 text-primary px-2 py-1 rounded-md flex items-center gap-1"
                >
                  {label}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOption(val);
                    }}
                  />
                </span>
              );
            })
          )}
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute left-0 w-full mt-1 rounded-md border shadow-lg z-20 
            dark:bg-dark-900 bg-white max-h-52 overflow-y-auto
          "
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => toggleOption(opt.value)}
              className={`
                px-3 py-2 cursor-pointer text-sm
                flex justify-between items-center
                hover:bg-primary/10
                ${value.includes(opt.value) ? "bg-primary/5" : ""}
              `}
            >
              {opt.label}

              {value.includes(opt.value) && (
                <span className="text-primary font-semibold">✔</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
