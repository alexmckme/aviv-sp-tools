"use client"
import React from 'react';
import ExtractTable from "@/components/ExtractTable";
import DeleteCoeffectiveGsheetButton from "@/components/DeleteCoeffectiveGsheetButton";

function SheetTableRow({ formattedGsheetCreationDate, gsheetFile, gsheetExtractsList }) {

    const [showExtracts, setShowExtracts] = React.useState(false);
    const [isSheetRowDeleted, setIsSheetRowDeleted] = React.useState(false);

    return (
        <>
            {!isSheetRowDeleted &&
                <tbody>
                <tr>
                    <td>{formattedGsheetCreationDate}</td>
                    <td><a
                        href={`https://docs.google.com/spreadsheets/d/${gsheetFile.id}`}
                        target={"_blank"}>🔗</a></td>
                    <td>{gsheetFile.name}</td>
                    {/*<td><span className="material-symbols-outlined">edit</span></td>*/}
                    <td>
                        <button onClick={() => {
                            setShowExtracts(!showExtracts);
                        }}><span
                            className="material-symbols-outlined">{showExtracts ? "collapse_all" : "expand_all"}</span>
                        </button>
                    </td>
                    <td>
                        <DeleteCoeffectiveGsheetButton gsheetFile={gsheetFile}
                                                       setIsSheetRowDeleted={setIsSheetRowDeleted}
                                                       gsheetExtractsList={gsheetExtractsList}/>

                    </td>
                </tr>

                {showExtracts &&
                    <ExtractTable gsheetFile={gsheetFile} gsheetExtractsList={gsheetExtractsList}/>
                }
                </tbody>
            }
        </>
    );
}

export default React.memo(SheetTableRow);
