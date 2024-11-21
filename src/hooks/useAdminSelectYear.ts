import { useState } from "react";

const useAdminSelectYear = (yearsOptions: number[]) => {
  const [selectedYear, setSelectedYear] = useState<number>(yearsOptions[0]);

  const handleYearChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setSelectedYear(parseInt(value));
  };

  return { selectedYear, handleYearChange };
};

export default useAdminSelectYear;
