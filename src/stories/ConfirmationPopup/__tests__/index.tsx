import React from "react";
import { render, cleanup, fireEvent } from "../../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import ConfirmationPopup from "../index";
import { Button } from "@equinor/eds-core-react";

afterEach(cleanup);

describe("ConfirmationPopup", () => {
  it("renders without crashing", () => {
    render(<ConfirmationPopup show={true}></ConfirmationPopup>);
  });

  it("renders when show is true", () => {
    render(<ConfirmationPopup show={true} />);
    expect(document.getElementById("eds-dialog-title")).toBeInTheDocument();
  });

  it("renders title when value is given", () => {
    const title = "Alec Trevelyan";
    const { getByText } = render(
      <ConfirmationPopup show={true} title={title} />
    );
    expect(getByText(title).innerHTML).toBe(title);
  });

  it("renders body when value is given", () => {
    const body = "This is a popup body";
    const { getByText } = render(<ConfirmationPopup show={true} body={body} />);
    expect(getByText(body).innerHTML).toBe(body);
  });

  it("renders buttons when value is given", () => {
    const buttons = [
      <Button key={"cancel"} variant="ghost" onClick={undefined}>
        Cancel
      </Button>,
      <Button key={"ok"} variant="ghost" color="danger" onClick={undefined}>
        Ok
      </Button>,
    ];
    const { getByText } = render(
      <ConfirmationPopup show={true} actions={buttons} />
    );
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Ok")).toBeInTheDocument();
  });

  it("triggers callback functions on actions given", () => {
    let number = 0;
    const buttons = [
      <Button key={"cancel"} variant="ghost" onClick={() => number++}>
        Cancel
      </Button>,
      <Button key={"ok"} variant="ghost" color="danger" onClick={() => number++}>
        Ok
      </Button>,
    ];
    const { getByText } = render(
      <ConfirmationPopup show={true} actions={buttons} />
    );
    fireEvent.click(getByText("Cancel"));
    expect(number).toBe(1);
    fireEvent.click(getByText("Ok"));
    expect(number).toBe(2);
  });
});
