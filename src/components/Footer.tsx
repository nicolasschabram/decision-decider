/** @jsx jsx */ jsx;
import { css, jsx } from "@emotion/core";
import "@reach/dialog/styles.css";
import { FunctionComponent, useState } from "react";
import { Dialog } from "./Dialog";
import { Imprint } from "./Imprint";
import { Privacy } from "./Privacy";

type Props = { className?: string };

export const Footer: FunctionComponent<Props> = ({ className }) => {
  const [isImprintVisible, setIsImprintVisible] = useState(false);
  const [isPrivacyVisible, setIsPrivacyVisible] = useState(false);

  return (
    <footer
      css={[
        css`
          padding: 1.25vh 2vh;
          border-top: 1px solid black;
          font-size: 0.6rem;
          opacity: 0.6;
          transition: opacity 0.25s ease-out;

          &:hover,
          &:hover {
            opacity: 1;
          }
        `
      ]}
      className={className}
    >
      <ul
        css={css`
          display: flex;
          list-style-type: none;
          margin: 0;
          padding: 0;
          justify-content: center;

          li {
            display: flex;

            &::before {
              content: "※";
              margin-right: 1ch;
            }

            + li {
              display: inline-block;
              margin-left: 2.5ch;
            }
          }
        `}
      >
        <li>
          <span>
            A weird side project by{" "}
            <a href="http://nicolasschabram.com">Nicolas Schabram</a>
          </span>
        </li>
        <li>
          <span>
            <a href="#0" onClick={() => setIsImprintVisible(true)}>
              Imprint
            </a>
          </span>
        </li>
        <li>
          <span>
            <a href="#0" onClick={() => setIsPrivacyVisible(true)}>
              Privacy
            </a>
          </span>
        </li>
      </ul>

      {isImprintVisible && (
        <Dialog onDismiss={() => setIsImprintVisible(false)}>
          <Imprint />
        </Dialog>
      )}
      {isPrivacyVisible && (
        <Dialog onDismiss={() => setIsPrivacyVisible(false)}>
          <Privacy />
        </Dialog>
      )}
    </footer>
  );
};
