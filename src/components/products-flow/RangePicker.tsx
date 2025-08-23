"use client"
import { cn } from "@/lib/utils";
import React, { useCallback, useRef, useState } from "react";
import { DualRangeSlider } from '@/components/ui/dual-range-slider';

/******************************************************************************
 * Types
 */

interface NumberInputProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
}

/******************************************************************************
 * Main Component
 */
const RangePicker = React.forwardRef<
  HTMLDivElement, 
  React.ComponentPropsWithoutRef<React.ElementType> & {
    minLimit?: number,
    maxLimit?: number,
  }
>((
  {
    minLimit=10,
    maxLimit=500,
    ...props
  }, 
  forwardedRef
) => {
  const [values, setValues] = useState([minLimit, maxLimit]);

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-full flex flex-col justify-start items-start gap-8",
      )}
    >
      <div
        className="flex flex-row justify-start items-start gap-4"
      >
        <NumberInput
          value={values[0]}
          onChange={(value) => setValues(prev => [value, prev[1]])}
          min={minLimit}
          max={values[1] - 1}
        />
        <NumberInput
          value={values[1]}
          onChange={(value) => setValues(prev => [prev[0], value])}
          min={values[0] + 1}
          max={maxLimit}
        />
      </div>
      <div
        className="w-full flex flex-row justify-center items-start gap-4"
      >
        <DualRangeSlider
          className="w-[180px]"
          label={(value) => value}
          value={values}
          onValueChange={setValues}
          min={minLimit}
          max={maxLimit}
          step={1}
        />
      </div>

    </div>
  )
});

RangePicker.displayName = "RangePicker";

export default RangePicker;

/******************************************************************************
 * Secondary Components
 */

function NumberInput ({
  value,
  min=0,
  max=undefined,
  onChange=()=>null,
  className="",
}: NumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onInternalChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const parsed = parseInt(event.target.value);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  }, []);

  return (
    <span
      className={cn(
        "flex h-9 w-fit px-2 py-1", 
        "rounded-md border border-input bg-transparent  text-base",
        className
      )}
      onClick={() => { inputRef.current?.focus(); }}
    >
      <span className="select-none">$</span>
      <input
        ref={inputRef}
        type="number"
        className={cn(
          "min-w-4 w-full focus:outline-none",
          "font-inherit text-inherit tracking-inherit leading-inherit",
          "border-none bg-transparent outline-none",
          "p-0 m-0",
          "appearance-none size-auto",
          "[margin:0] [padding:0]"
        )}
        value={value}
        onChange={onInternalChange}
        min={min}
        max={max}
      />
    </span>
  )
}