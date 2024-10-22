import React from 'react';

function NewExtractFormSystemChoice({ chosenSystem, setChosenSystem, status, setStartingHour, setEndingHour}) {

  return (
      <fieldset>
        <legend>
          Choisissez à partir de quelle source vous souhaitez créer un nouvel extract :
        </legend>
          <div>
              <input
                  type="radio"
                  name="chosen-source-system"
                  id="source-salesforce-ma"
                  value="salesforce-ma"
                  checked={chosenSystem === "salesforce-ma"}
                  disabled={status === "loading"}
                  onChange={event => {
                      setChosenSystem(event.target.value)
                  }}
              />
              <label htmlFor="source-salesforce-ma">Salesforce MA</label>
          </div>
          <div>
              <input
                  type="radio"
                  name="chosen-source-system"
                  id="source-salesforce-gsl"
                  value="salesforce-gsl"
                  checked={chosenSystem === "salesforce-gsl"}
                  disabled={status === "loading"}
                  onChange={event => {
                      setChosenSystem(event.target.value)
                  }}
              />
              <label htmlFor="source-salesforce-gsl">Salesforce GSL</label>
          </div>
          <div>
              <input
                  type="radio"
                  name="chosen-source-system"
                  id="source-flamingo"
                  value="flamingo"
                  checked={chosenSystem === "flamingo"}
                  disabled={status === "loading"}
                  onClick={() => {
                      setStartingHour(1)
                      setEndingHour(2)
                  }}
                  onChange={event => {
                      setChosenSystem(event.target.value)
                  }}
              />
              <label htmlFor="source-flamingo">Flamingo</label>
          </div>
      </fieldset>
  );
}

export default NewExtractFormSystemChoice;
