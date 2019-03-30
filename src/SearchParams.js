import React, { useState, useEffect } from "react";
import pf, { ANIMALS } from "petfinder-client";
import useDropdown from "./useDropdown";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  useEffect(() => {
    setBreed("");
    petfinder.breed.list({ animal }).then(console.log, console.error);
  }, [animal]);

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            onChange={e => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location"
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
