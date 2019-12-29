import styled from "@emotion/styled";
import React, { useEffect } from "react";
import draw from "./draw";

import MainCanvas from "../../components/MainCanvas";

export default function Triangle() {
  useEffect(() => {
    draw();
  }, []);

  return (
    <>
      <MainCanvas id="three" />
    </>
  );
}
