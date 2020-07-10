/** @jsx jsx */
import { jsx, css } from "@emotion/core";

export const LogoutBtn = ({ logoutHandler }: { logoutHandler: any }) => (
  <div
    css={css`
      margin-top: 20px;
    `}
  >
    <button onClick={logoutHandler}>Log Out</button>
  </div>
);
