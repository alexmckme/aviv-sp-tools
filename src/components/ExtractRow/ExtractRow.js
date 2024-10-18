"use client"
import React from 'react';
import DeleteCoeffectiveExtractButton from "@/components/DeleteCoeffectiveExtractButton/DeleteCoeffectiveExtractButton";

function ExtractRow({ formattedExtractCreationDate, gsheetFile, extract, formattedLastRefreshDate }) {

  const [isExtractRowHidden, setIsExtractRowHidden] = React.useState(false);

  return (
      <>
        {!isExtractRowHidden &&
            <tr>
              <td>{formattedExtractCreationDate}</td>
              <td><a
                  href={`https://docs.google.com/spreadsheets/d/${gsheetFile.id}/edit?gid=${extract.onglet_id}`}
                  target={"_blank"}>🔗</a></td>
              <td>{extract.report_id}</td>
              <td>{extract.frequency}</td>
              <td>{extract.starting_hour}h00</td>
              <td>{extract.ending_hour}h00</td>
              <td>{formattedLastRefreshDate}</td>
              {/*<td><span className="material-symbols-outlined">edit</span></td>*/}
              <td>
                <DeleteCoeffectiveExtractButton gsheetFile={gsheetFile} extract={extract} setIsExtractRowHidden={setIsExtractRowHidden}/>
              </td>
            </tr>}
      </>
  );
}

export default ExtractRow;
