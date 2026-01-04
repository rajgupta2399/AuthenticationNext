"use client";
import React, { useState, useEffect } from "react";
import {
  AreYouPlanningSelectInput,
  SelectCountry,
  SelectCurrency,
  SelectDegree,
  SelectDropLocation,
  SelectDropRequired,
  SelectFoodPreference,
  SelectGender,
  SelectNumberOfDays,
  SelectNumberOfPax,
  SelectPickupLocation,
  SelectPickupRequired,
  SelectProgram,
  SelectTshirtSizeAlumni,
  SelectTshirtSizePartner,
} from "./SuverysFormComp";
import Label from "@/src/components/ui/input/Label";
import Input from "@/src/components/ui/input/InputField";
import DatePicker from "@/src/components/form/date-picker";
import SurveyForm from "./SurveyFormButton";
import ViewSurveys from "./SurveyViewReport";

const Page = () => {
  return (
    <div className="">
      <div className="">
        <div className="">
          <SurveyForm />
        </div>
        <ViewSurveys />
      </div>
    </div>
  );
};

export default Page;
