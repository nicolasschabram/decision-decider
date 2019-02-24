/** @jsx jsx */ jsx;
import { css, jsx } from "@emotion/core";
import Rect from "@reach/rect";
import { FunctionComponent, memo, useContext } from "react";
import {
  LETTER_FILTERING_DURATION,
  LETTER_ROTATION_DURATION
} from "../settings";
import { getRandomChar } from "../utils/randomChar";
import { CharCard, CharCardBack, CharCardFront } from "./CharCard";
import { DeciderContext } from "./Decider";
import { Chars } from "./useDecider";

export const CharWall: FunctionComponent = memo(() => {
  const { chars, terms, winner, lifecyclePhase } = useContext(DeciderContext);
  const numberOfLetters = Object.keys(chars).length;

  return (
    <Rect>
      {({ ref, rect }: any) => {
        let remainder = 0;
        let charWidth = 0;
        let charHeight = 0;

        // Fit squares into rect. https://stackoverflow.com/a/38567903/7480786
        if (rect && rect.height) {
          const rectRatio = rect.width / rect.height;
          let columns = Math.sqrt(numberOfLetters * rectRatio);
          let rows = columns / rectRatio;
          columns = Math.ceil(columns);
          rows = Math.ceil(rows);
          charWidth = rect.width / columns;
          charHeight = rect.height / rows;

          remainder = rows * columns - numberOfLetters;
        }

        // If necessary, add dummy chars to fill last row.
        const charsWithDummies: Chars = { ...chars };
        for (let i = numberOfLetters; i < numberOfLetters + remainder; i++) {
          charsWithDummies[i] = {
            position: i,
            randomChar: getRandomChar()
          };
        }

        return (
          <ul
            ref={ref}
            css={css`
              grid-row-start: charwall;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-items: center;
              align-content: center;
              list-style-type: none;
              margin: 0;
              padding: 0;
              perspective: 1000px;
              overflow: hidden;
            `}
          >
            {Object.keys(charsWithDummies)
              .map(k => Number(k))
              .sort((a, b) => a - b)
              .map(position => (
                <CharCard
                  is="li"
                  key={charsWithDummies[position].position}
                  visibleSide={
                    charsWithDummies[position].fixedChar === undefined
                      ? "front"
                      : "back"
                  }
                  widthPx={charWidth}
                  heightPx={charHeight}
                  css={[
                    ["ROTATING_LETTERS", "FILTERING_LETTERS", "DONE"].includes(
                      lifecyclePhase
                    ) &&
                      css`
                        transition-duration: ${LETTER_ROTATION_DURATION}ms;
                        transform: rotateY(
                          ${charsWithDummies[position].term !== winner
                            ? getRandom([4, 5, 6, 7, 8, 9]) * 360
                            : getRandom([4, 5, 6, 7, 8, 9]) * 360 + 180}deg
                        );
                      `,
                    ["FILTERING_LETTERS", "DONE"].includes(lifecyclePhase) &&
                      (charsWithDummies[position].term === winner
                        ? css`
                            transition: all ${LETTER_FILTERING_DURATION}ms
                              ease-out;
                            /* TODO: These three properties below cause weird, unpredictable behavior on iOS (flickering, disappearing letters). Find a workaround.*/
                            width: ${1.5 * charWidth}px;
                            height: ${1.5 * charHeight}px;
                            font-size: ${charWidth}px;
                          `
                        : css`
                            transition: all ${LETTER_FILTERING_DURATION}ms
                              ease-out;
                            transform: scale(0.5);
                            width: 0;
                            margin: 0;
                            border: 0;
                            padding: 0;
                            opacity: 0;
                            overflow: hidden;
                          `)
                  ]}
                >
                  <CharCardFront bgColor="#f5f5f5" />
                  <CharCardBack
                    {...(charsWithDummies[position].fixedChar
                      ? {
                          char: charsWithDummies[position].fixedChar,
                          bgColor:
                            charsWithDummies[position].fixedChar !== " " &&
                            terms[charsWithDummies[position].term!].color,
                          color: "white"
                        }
                      : {
                          char: charsWithDummies[position].randomChar,
                          bgColor: "#f5f5f5",
                          color: "black"
                        })}
                  />
                </CharCard>
              ))}
          </ul>
        );
      }}
    </Rect>
  );
});

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * (arr.length - 1))];
}
