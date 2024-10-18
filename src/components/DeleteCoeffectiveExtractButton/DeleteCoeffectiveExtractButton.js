"use client"
import React from 'react';
import DeleteExtractConfirmationModal from "@/components/DeleteExtractConfirmationModal";

function DeleteCoeffectiveExtractButton({ gsheetFile, extract, setIsExtractRowHidden }) {

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <>
            {isModalOpen && <DeleteExtractConfirmationModal setIsModalOpen={setIsModalOpen} gsheetFile={gsheetFile} extract={extract} setIsExtractRowHidden={setIsExtractRowHidden}/>}
            <button onClick={
                () => {
                    setIsModalOpen(!isModalOpen)
                }
            }><span className="material-symbols-outlined">delete</span></button>
        </>
    )
}

export default React.memo(DeleteCoeffectiveExtractButton);
