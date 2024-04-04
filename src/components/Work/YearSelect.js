import { useState } from "react";

export default function YearSelect(props) {
    const [year2, setYear] = useState(new Date().getFullYear());
  
    const onChangeYearHandler = (e) => {
      setYear(parseInt(e.target.value));
      props.onYearChange(year2, parseInt(e.target.value));
    };



  
    const years = [];
    for (let i = 2000; i <= new Date().getFullYear(); i++) {
      years.push(i);
    }
  
    return (
      <div>
        <select value={year2} name="year" onChange={onChangeYearHandler}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    );
  }
