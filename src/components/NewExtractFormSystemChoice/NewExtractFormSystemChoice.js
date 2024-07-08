import React from 'react';

function NewExtractFormSystemChoice({ chosenSystem, setChosenSystem}) {

  return (
      <fieldset>
        <legend>
          Choisissez à partir de quelle source vous souhaitez créer un nouvel extract :
        </legend>
        <input
            type="radio"
            name="chosen-source-system"
            id="source-salesforce-ma"
            value="salesforce-ma"
            checked={chosenSystem === "salesforce-ma"}
            onChange={event => {
              setChosenSystem(event.target.value)
            }}
        />
        <label htmlFor="source-salesforce-ma">Salesforce MA</label>
        <input
            type="radio"
            name="chosen-source-system"
            id="source-salesforce-gsl"
            value="salesforce-gsl"
            checked={chosenSystem === "salesforce-gsl"}
            onChange={event => {
              setChosenSystem(event.target.value)
            }}
        />
        <label htmlFor="source-salesforce-gsl">Salesforce GSL</label>
        <input
            type="radio"
            name="chosen-source-system"
            id="source-flamingo"
            value="flamingo"
            checked={chosenSystem === "flamingo"}
            onChange={event => {
              setChosenSystem(event.target.value)
            }}
        />
        <label htmlFor="source-flamingo">Flamingo</label>
      </fieldset>
  );
}

export default NewExtractFormSystemChoice;
