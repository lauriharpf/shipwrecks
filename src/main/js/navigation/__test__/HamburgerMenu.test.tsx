import React from "react";
import {
  cleanup,
  render,
  GetByText,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HamburgerMenu from "../HamburgerMenu";

describe("HamburgerMenu", () => {
  afterEach(cleanup);

  const renderMenu = (onlyShowStarred: boolean) =>
    render(
      <HamburgerMenu
        onlyShowStarred={onlyShowStarred}
        setOnlyShowStarred={() => void false}
      />
    );

  describe("switch to only show starred ships", () => {
    const getSwitch = (result: RenderResult) =>
      result.getByLabelText("Only show starred");

    it("is not checked when all ships are shown", () => {
      const result = renderMenu(false);
      expect(getSwitch(result)).not.toBeChecked();
    });

    it("is checked when only starred ships are shown", () => {
      const result = renderMenu(true);
      expect(getSwitch(result)).not.toBeChecked();
    });
  });
});
