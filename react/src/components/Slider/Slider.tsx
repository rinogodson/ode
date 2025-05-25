"use client";
import React from "react";
import styled from "styled-components";

const Slider = ({
  minimum = 0,
  maximum = 100,
  value,
  onChangeFn,
}: {
  minimum?: number;
  maximum?: number;
  value: number;
  onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: "calc(45rem - 5rem - (80rem / 20))",
        translate: "0 3px",
      }}
    >
      <StyledWrapper
        className="w-full"
        style={{ transition: "all 300ms ease" }}
      >
        <input
          style={{ width: "100%" }}
          type="range"
          min={minimum}
          max={maximum}
          value={value}
          onChange={onChangeFn}
          className="PB-range-slider"
          id="myRange"
        />
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .PB-range-slider {
    -webkit-appearance: none;
    width: calc(45rem - 5rem - (80rem / 14));
    height: 15px;
    border-radius: 5px;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    cursor: ew-resize;
    transition: all 0.2s ease;
  }
  .PB-range-slider:active {
    height: 20px;
  }

  .PB-range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    background-color: #ffffff;
    border: 3px solid #1b1b1b;
    transition: all 0.3s ease;
  }

  .PB-range-slider::-webkit-slider-thumb:hover {
    transition: 0.3s ease-in-out;
  }
  .PB-range-slider::-webkit-slider-thumb:active {
    transition: 0.3s ease-in-out;
  }

  .PB-range-slider::-moz-range-thumb {
    width: 15px;
    height: 25px;
    border-radius: 5px;
    background-color: #fff;
    border: 2px solid #000;
    cursor: ew-resize;
  }
`;

export default Slider;
