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
        width: "calc(45px + 25.5rem)",
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
    opacity: 1;
    -webkit-transition: 0.2s;
    transition: all 0.2s ease;
  }
  

  .PB-range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0.4em;
    height: 5em;
    border-radius: 1000px;
    background-color: rgba(200,0,0,1);
    shadow: inset 0px 0px 10px 10px #000000;
    transition: all 0.3s ease;
  }

  .PB-range-slider::-webkit-slider-thumb:hover {
    transition: 0.3s ease-in-out;
  }
  .PB-range-slider::-webkit-slider-thumb:active {
    transform: scale(1.2);
    transition: 0.3s ease-in-out;
  }

`;

export default Slider;
