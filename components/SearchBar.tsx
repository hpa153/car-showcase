"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import SearchManufacturer from "./SearchManufacturer";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="search"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = () => {
  const [manufacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!manufacturer.trim() && !model.trim()) {
      return alert("Please provide search elements!");
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManuFacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          alt="car model"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
        />
        <input
          type="text"
          name="model"
          className="searchbar__input"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
