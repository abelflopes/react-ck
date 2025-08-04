import React from "react";
import { FileUploader } from "../FileUploader";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit FileUploader", () => {
  it("renders correctly", async () => {
    render(<FileUploader data-testid="file-uploader" />);
    const find = await screen.findByTestId("file-uploader");
    expect(find).toBeInTheDocument();
  });

  it("renders with description", () => {
    const description = "Upload your files here";
    render(<FileUploader description={description} data-testid="file-uploader" />);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("renders with validation message", () => {
    const validationMessage = "Please select a file";
    render(<FileUploader validationMessage={validationMessage} data-testid="file-uploader" />);

    expect(screen.getByText(validationMessage)).toBeInTheDocument();
  });

  describe("ref forwarding", () => {
    it("should forward ref to input element", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<FileUploader inputProps={{ ref }} data-testid="file-uploader" />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe("file");
    });

    it("should allow accessing input methods via ref", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<FileUploader inputProps={{ ref }} data-testid="file-uploader" />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(typeof ref.current?.click).toBe("function");
      expect(typeof ref.current?.focus).toBe("function");
      expect(typeof ref.current?.blur).toBe("function");
    });

    it("should handle inputProps.ref correctly", () => {
      const componentRef = React.createRef<HTMLDivElement>();
      const inputPropsRef = React.createRef<HTMLInputElement>();

      render(
        <FileUploader
          ref={componentRef}
          inputProps={{ ref: inputPropsRef }}
          data-testid="file-uploader"
        />,
      );

      expect(componentRef.current).toBeInstanceOf(HTMLDivElement);
      expect(inputPropsRef.current).toBeInstanceOf(HTMLInputElement);
      expect(componentRef.current).not.toBe(inputPropsRef.current);
    });
  });
});
