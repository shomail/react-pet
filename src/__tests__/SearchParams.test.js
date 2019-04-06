import React from "react";
import { render, cleanup } from "react-testing-library";
import petfinder, { _breeds, _dogs, ANIMALS } from "petfinder-client";
import SearchParams from "../SearchParams";

afterEach(cleanup);

test("SearchParams", async () => {
  const pf = petfinder();
  const { getByTestId } = render(<SearchParams />);

  const animalDropdown = getByTestId("use-dropdown-animal");
  expect(animalDropdown.children.length).toEqual(ANIMALS.length + 1);
});
