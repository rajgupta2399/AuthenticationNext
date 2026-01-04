"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";
import Checkbox from "../../ui/input/Checkbox";

export default function CheckboxComponents({ checked, onChange, label }) {
  return (
    <div className="border rounded-md dark:border-gray-700">
      <div className="flex items-center gap-4 p-3">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={checked}
            onChange={onChange}
            label={
              label ||
              "By accessing this website we assume you accept these terms and conditions. Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page. *"
            }
          />
        </div>
      </div>
    </div>
  );
}
// "use client";
// import React, { useState } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import Checkbox from "../../ui/input/Checkbox";

// export default function CheckboxComponents({ checked, onChange, label }) {
//   const [isChecked, setIsChecked] = useState(false);
//   const [isCheckedTwo, setIsCheckedTwo] = useState(true);
//   const [isCheckedDisabled, setIsCheckedDisabled] = useState(false);
//   return (
//     <ComponentCard title="Checkbox">
//       <div className="flex items-center gap-4">
//         <div className="flex items-center gap-3">
//           <Checkbox checked={isChecked} onChange={setIsChecked} />
//           <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
//             Default
//           </span>
//         </div>
//         <div className="flex items-center gap-3">
//           <Checkbox
//             checked={isCheckedTwo}
//             onChange={setIsCheckedTwo}
//             label="Checked"
//           />
//         </div>
//         <div className="flex items-center gap-3">
//           <Checkbox
//             checked={isCheckedDisabled}
//             onChange={setIsCheckedDisabled}
//             disabled
//             label="Disabled"
//           />
//         </div>
//       </div>
//     </ComponentCard>
//   );
// }
