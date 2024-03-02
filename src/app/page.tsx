"use client";

import React, { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  SelectSection,
  Textarea,
} from "@nextui-org/react";

type Inputs = {
  bathroom: number;
  bedroom: number;
  parking: number;
  rental_form: string;
  lease_terms: number;
  pet_allowed: boolean;
  water: boolean;
  hydro: boolean;
  heat: boolean;
  internet: boolean;
  air_conditioning: boolean;
  gym: boolean;
  pool: boolean;
  dishwasher: boolean;
  EV_charging: boolean;
  storage: boolean;
  in_suite_laundry: boolean;
  property_type: string;
  description: string;
  title: string;
  address: string;
};

export default function RentalForm() {
  const {
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const a = 1;
  };

  React.useEffect(() => {
    setFocus("bathroom");
  }, [setFocus]);

  const [fields, setFields] = useState({
    bathroom: "0",
    bedroom: "0",
    parking: "0",
    lease_terms: "0",
    rental_form: "",
    property_type: "",
    pet_allowed: false,
    water: false,
    hydro: false,
    heat: false,
    internet: false,
    air_conditioning: false,
    gym: false,
    pool: false,
    dishwasher: false,
    EV_charging: false,
    storage: false,
    in_suite_laundry: false,
    title: "",
    address: "",
    description: "",
  });

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "title" || field === "address" || field === "description"
          ? e.target.value
          : Number(e.target.value) >= 0
            ? e.target.value
            : "0";
      setFields((prevFields) => ({ ...prevFields, [field]: value }));
    };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleCheckboxChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked;
      setFields((prevFields) => ({ ...prevFields, [field]: value }));
    };

  const rentalOptions = [
    "room_rental",
    "fixed_term",
    "short_term",
    "long_term",
    "month_to_month",
    "shared_living",
    "sublet",
    "other",
  ];

  const propertyOptions = [
    "condo",
    "basement",
    "apartment",
    "house",
    "other",
    "townhouse",
    "studio",
    "loft",
    "penthouse",
    "duplex",
    "laneway",
    "triplex",
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "6px",
        backgroundColor: "#f3f3f3",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          maxWidth: "1200px",
          padding: "32px",
          backgroundColor: "#fff",
          boxShadow: "0px 0px 30px rgba(0,0,0,0.1)",
          borderRadius: "10px",
        }}
      >
        <div className="flex justify-between">
          <div className="flex-1 p-2">
            <div className="flex flex-col">
              <Input
                type="text"
                label="Title"
                placeholder="Enter your title"
                value={fields.title}
                onChange={handleInputChange("title")}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex-1 p-2">
            <div className="flex flex-col">
              <Textarea
                label="Description"
                placeholder="Enter your description"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="w-1/4 p-2">
            <Input
              label="Bathroom"
              value={fields.bathroom}
              onChange={handleInputChange("bathroom")}
              placeholder="Bathroom"
              type="number"
              step="0.5"
            />
            {errors.bathroom && <span>{errors.bathroom.message}</span>}
          </div>

          <div className="w-1/4 p-2">
            <Input
              label="Bedroom"
              value={fields.bedroom}
              onChange={handleInputChange("bedroom")}
              placeholder="Bedroom"
              type="number"
              step="1"
            />
            {errors.bedroom && <span>{errors.bedroom.message}</span>}
          </div>

          <div className="w-1/4 p-2">
            <Input
              label="Parking"
              value={fields.parking}
              onChange={handleInputChange("parking")}
              placeholder="Parking"
              type="number"
              step="1"
            />
            {errors.parking && <span>{errors.parking.message}</span>}
          </div>

          <div className="w-1/4 p-2">
            <Input
              label="Lease Terms"
              value={fields.lease_terms}
              onChange={handleInputChange("lease_terms")}
              placeholder="Lease Terms"
              type="number"
              step="1"
            />
            {errors.lease_terms && <span>{errors.lease_terms.message}</span>}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex-1 p-2">
            <Select
              label="rentalForm"
              placeholder="Select Rental Form"
              style={{ flex: 1 }}
              value={fields.rental_form}
              onChange={handleSelectChange}
            >
              <SelectSection>
                {rentalOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectSection>
            </Select>
          </div>

          <div className="flex-1 p-2">
            <Select
              label="propertyType"
              placeholder="Select Property Type"
              style={{ flex: 1 }}
              value={fields.property_type}
              onChange={handleSelectChange}
            >
              <SelectSection>
                {propertyOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectSection>
            </Select>
          </div>
        </div>

        <div className="mt-28 md:mt-36">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Checkbox
                checked={fields.pet_allowed}
                onChange={handleCheckboxChange("pet_allowed")}
              >
                Pet Allowed
              </Checkbox>
            </div>
            <div className="flex-1">
              <Checkbox
                checked={fields.hydro}
                onChange={handleCheckboxChange("hydro")}
              >
                Hydro
              </Checkbox>
            </div>
            <div className="flex-1">
              <Checkbox
                checked={fields.heat}
                onChange={handleCheckboxChange("heat")}
              >
                Heat
              </Checkbox>
            </div>
            <div className="flex-1">
              <Checkbox
                checked={fields.internet}
                onChange={handleCheckboxChange("internet")}
              >
                Internet
              </Checkbox>
            </div>
            <div className="flex-1">
              <Checkbox
                checked={fields.air_conditioning}
                onChange={handleCheckboxChange("air_conditioning")}
              >
                Air Conditioning
              </Checkbox>
            </div>
            <div className="flex-1">
              <Checkbox
                checked={fields.water}
                onChange={handleCheckboxChange("water")}
              >
                Water
              </Checkbox>
            </div>
          </div>
        </div>

        <div className="mt-28 md:mt-36">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Checkbox
                checked={fields.gym}
                onChange={handleCheckboxChange("gym")}
              >
                Gym
              </Checkbox>
            </div>
            <div className="flex-1">
              <Checkbox
                checked={fields.pool}
                onChange={handleCheckboxChange("pool")}
              >
                Pool
              </Checkbox>
            </div>
            <div className="flex-1">
              <Checkbox
                checked={fields.dishwasher}
                onChange={handleCheckboxChange("dishwasher")}
              >
                Dishwasher
              </Checkbox>
            </div>
            <div className="flex-1">
              <Checkbox
                checked={fields.EV_charging}
                onChange={handleCheckboxChange("EV_charging")}
              >
                EV Charging
              </Checkbox>
            </div>
            <div className="flex-1">
              <Checkbox
                checked={fields.storage}
                onChange={handleCheckboxChange("storage")}
              >
                Storage
              </Checkbox>
            </div>
            <div className="flex-1">
              <Checkbox
                checked={fields.in_suite_laundry}
                onChange={handleCheckboxChange("in_suite_laundry")}
              >
                In-Suite Laundry
              </Checkbox>
            </div>
          </div>
        </div>

        <div className="mt-28 flex justify-between">
          <div className="flex-1 p-2">
            <div className="flex flex-col">
              <Input
                type="text"
                label="Address"
                placeholder="Enter your address"
                value={fields.address}
                onChange={handleInputChange("address")}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-28">
          <Button size="md" color="primary" className="mt-8">
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
