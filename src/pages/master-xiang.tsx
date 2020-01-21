import React, { useState, useEffect } from "react";
import { Button, Wrapper, Selector } from "../components/Controller";
import math from "../utils/math";
import draw from "../draw/master-xiang";
import { Layout, MainCanvas } from "../components";

const effectList = {
  normal: [0, 0, 0, 0, 1, 0, 0, 0, 0],
  gaussianBlur: [0.045, 0.122, 0.045, 0.122, 0.332, 0.122, 0.045, 0.122, 0.045],
  gaussianBlur2: [1, 2, 1, 2, 4, 2, 1, 2, 1],
  gaussianBlur3: [0, 1, 0, 1, 1, 1, 0, 1, 0],
  unsharpen: [-1, -1, -1, -1, 9, -1, -1, -1, -1],
  sharpness: [0, -1, 0, -1, 5, -1, 0, -1, 0],
  sharpen: [-1, -1, -1, -1, 16, -1, -1, -1, -1],
  edgeDetect: [
    -0.125,
    -0.125,
    -0.125,
    -0.125,
    1,
    -0.125,
    -0.125,
    -0.125,
    -0.125
  ],
  edgeDetect2: [-1, -1, -1, -1, 8, -1, -1, -1, -1],
  edgeDetect3: [-5, 0, 0, 0, 0, 0, 0, 0, 5],
  edgeDetect4: [-1, -1, -1, 0, 0, 0, 1, 1, 1],
  edgeDetect5: [-1, -1, -1, 2, 2, 2, -1, -1, -1],
  edgeDetect6: [-5, -5, -5, -5, 39, -5, -5, -5, -5],
  sobelHorizontal: [1, 2, 1, 0, 0, 0, -1, -2, -1],
  sobelVertical: [1, 0, -1, 2, 0, -2, 1, 0, -1],
  previtHorizontal: [1, 1, 1, 0, 0, 0, -1, -1, -1],
  previtVertical: [1, 0, -1, 1, 0, -1, 1, 0, -1],
  boxBlur: [0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111],
  triangleBlur: [
    0.0625,
    0.125,
    0.0625,
    0.125,
    0.25,
    0.125,
    0.0625,
    0.125,
    0.0625
  ],
  emboss: [-2, -1, 0, -1, 1, 1, 0, 1, 2]
};

const colorSequenceList = [
  "rrrr",
  "rrrg",
  "rrrb",
  "rrra",
  "rrgr",
  "rrgg",
  "rrgb",
  "rrga",
  "rrbr",
  "rrbg",
  "rrbb",
  "rrba",
  "rrar",
  "rrag",
  "rrab",
  "rraa",
  "rgrr",
  "rgrg",
  "rgrb",
  "rgra",
  "rggr",
  "rggg",
  "rggb",
  "rgga",
  "rgbr",
  "rgbg",
  "rgbb",
  "rgba",
  "rgar",
  "rgag",
  "rgab",
  "rgaa",
  "rbrr",
  "rbrg",
  "rbrb",
  "rbra",
  "rbgr",
  "rbgg",
  "rbgb",
  "rbga",
  "rbbr",
  "rbbg",
  "rbbb",
  "rbba",
  "rbar",
  "rbag",
  "rbab",
  "rbaa",
  "rarr",
  "rarg",
  "rarb",
  "rara",
  "ragr",
  "ragg",
  "ragb",
  "raga",
  "rabr",
  "rabg",
  "rabb",
  "raba",
  "raar",
  "raag",
  "raab",
  "raaa",
  "grrr",
  "grrg",
  "grrb",
  "grra",
  "grgr",
  "grgg",
  "grgb",
  "grga",
  "grbr",
  "grbg",
  "grbb",
  "grba",
  "grar",
  "grag",
  "grab",
  "graa",
  "ggrr",
  "ggrg",
  "ggrb",
  "ggra",
  "gggr",
  "gggg",
  "gggb",
  "ggga",
  "ggbr",
  "ggbg",
  "ggbb",
  "ggba",
  "ggar",
  "ggag",
  "ggab",
  "ggaa",
  "gbrr",
  "gbrg",
  "gbrb",
  "gbra",
  "gbgr",
  "gbgg",
  "gbgb",
  "gbga",
  "gbbr",
  "gbbg",
  "gbbb",
  "gbba",
  "gbar",
  "gbag",
  "gbab",
  "gbaa",
  "garr",
  "garg",
  "garb",
  "gara",
  "gagr",
  "gagg",
  "gagb",
  "gaga",
  "gabr",
  "gabg",
  "gabb",
  "gaba",
  "gaar",
  "gaag",
  "gaab",
  "gaaa",
  "brrr",
  "brrg",
  "brrb",
  "brra",
  "brgr",
  "brgg",
  "brgb",
  "brga",
  "brbr",
  "brbg",
  "brbb",
  "brba",
  "brar",
  "brag",
  "brab",
  "braa",
  "bgrr",
  "bgrg",
  "bgrb",
  "bgra",
  "bggr",
  "bggg",
  "bggb",
  "bgga",
  "bgbr",
  "bgbg",
  "bgbb",
  "bgba",
  "bgar",
  "bgag",
  "bgab",
  "bgaa",
  "bbrr",
  "bbrg",
  "bbrb",
  "bbra",
  "bbgr",
  "bbgg",
  "bbgb",
  "bbga",
  "bbbr",
  "bbbg",
  "bbbb",
  "bbba",
  "bbar",
  "bbag",
  "bbab",
  "bbaa",
  "barr",
  "barg",
  "barb",
  "bara",
  "bagr",
  "bagg",
  "bagb",
  "baga",
  "babr",
  "babg",
  "babb",
  "baba",
  "baar",
  "baag",
  "baab",
  "baaa",
  "arrr",
  "arrg",
  "arrb",
  "arra",
  "argr",
  "argg",
  "argb",
  "arga",
  "arbr",
  "arbg",
  "arbb",
  "arba",
  "arar",
  "arag",
  "arab",
  "araa",
  "agrr",
  "agrg",
  "agrb",
  "agra",
  "aggr",
  "aggg",
  "aggb",
  "agga",
  "agbr",
  "agbg",
  "agbb",
  "agba",
  "agar",
  "agag",
  "agab",
  "agaa",
  "abrr",
  "abrg",
  "abrb",
  "abra",
  "abgr",
  "abgg",
  "abgb",
  "abga",
  "abbr",
  "abbg",
  "abbb",
  "abba",
  "abar",
  "abag",
  "abab",
  "abaa",
  "aarr",
  "aarg",
  "aarb",
  "aara",
  "aagr",
  "aagg",
  "aagb",
  "aaga",
  "aabr",
  "aabg",
  "aabb",
  "aaba",
  "aaar",
  "aaag",
  "aaab",
  "aaaa"
];
type EffectName = keyof typeof effectList;
const colorSequenceOption = Object.fromEntries(
  colorSequenceList.map(k => [k, k])
);
const effctOption = Object.fromEntries(
  Object.keys(effectList).map(k => [k, k])
);
export default function MasterXiang() {
  const [effectName, setEffetName] = useState<EffectName>("boxBlur");
  const [colorSequence, setColorSequence] = useState("agrb");

  useEffect(() => {
    draw(effectList[effectName], colorSequence);
  }, [effectName, colorSequence]);

  const random = () => {
    setEffetName(math.choose(Object.keys(effectList)) as EffectName);
    setColorSequence(math.choose(colorSequenceList));
  };

  return (
    <Layout>
      <MainCanvas id="image" />
      <Wrapper>
        <Button onClick={() => random()}>Random</Button>{" "}
        <Selector
          active={effectName}
          onChange={val => setEffetName(val as EffectName)}
          options={effctOption}
        />
        <Selector
          active={colorSequence}
          onChange={val => setColorSequence(val)}
          options={colorSequenceOption}
        />
      </Wrapper>
    </Layout>
  );
}
