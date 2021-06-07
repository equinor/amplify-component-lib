import { filter_list } from "@equinor/eds-icons";
import React from "react";
import { act } from "react-dom/test-utils";
import { render, cleanup, fireEvent } from "../../../test-utils";
import FilterMenu from "../index";

afterEach(cleanup);

const dummyData = {
  data: ["test", "best", "123"],
  icon: filter_list,
  menuTitle: "Select an item",
  onChange: () => undefined,
};

describe("ComponentToTest", () => {
  it("renders without crashing", () => {
    render(<FilterMenu {...dummyData}></FilterMenu>);
  });

  it("renders a menu button with menu closed by default", () => {
    const { queryByTestId } = render(<FilterMenu {...dummyData}></FilterMenu>);
    expect(queryByTestId("menuButton")).toBeInTheDocument();
    expect(queryByTestId("menuContainer")).toHaveStyle("visibility: hidden");
  });

  it("renders a the menu when button is clicked", async () => {
    const { findByTestId } = render(<FilterMenu {...dummyData}></FilterMenu>);
    var button = await findByTestId("menuButton");
    fireEvent.click(button);

    var menu = await findByTestId("menuContainer");
    expect(menu).toHaveStyle("visibility: visible");
  });

  it("renders a the menu items", () => {
    const { getByText } = render(<FilterMenu {...dummyData}></FilterMenu>);
    expect(getByText("test")).toBeInTheDocument();
    expect(getByText("best")).toBeInTheDocument();
    expect(getByText("123")).toBeInTheDocument();
  });

  it("renders a the chip when menu item is selected", async () => {
    const { findByTestId, getByText } = render(<FilterMenu {...dummyData}></FilterMenu>);
    const menuItemText = dummyData.data[2];

    const button = await findByTestId("menuButton");
    fireEvent.click(button);

    const menuItem = getByText(menuItemText);
    fireEvent.click(menuItem);

    const chip = await findByTestId("chip");
    expect(chip.innerHTML).toContain(menuItemText);
  });
});
