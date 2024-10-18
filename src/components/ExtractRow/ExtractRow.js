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
                    <td>{extract.extract_type === "salesforce-ma" ? "SF MA" : (extract.extract_type === "salesforce-gsl" ? "SF GSL" : "Flamingo")}</td>
                    <td>{extract.extract_type === "salesforce-ma" ? (
                        <a href={`https://meilleursagents.lightning.force.com/lightning/r/Report/${extract.report_id}/view`}>
                            {extract.report_id}
                        </a>
                    ) : (extract.extract_type === "salesforce-gsl" ? (
                            <a href={`https://windu.lightning.force.com/lightning/r/Report/${extract.report_id}/view`}>
                                {extract.report_id}
                            </a>
                        ) : <p>{extract.report_id}</p>
                    )}</td>
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
