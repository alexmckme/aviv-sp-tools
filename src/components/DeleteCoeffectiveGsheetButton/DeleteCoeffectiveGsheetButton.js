"use client"
import React from 'react';
import DeleteGsheetConfirmationModal from "@/components/DeleteGsheetConfirmationModal";

function DeleteCoeffectiveGsheetButton({gsheetFile, setIsSheetRowDeleted, gsheetExtractsList}) {

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
      <>
        {isModalOpen && <DeleteGsheetConfirmationModal setIsModalOpen={setIsModalOpen} gsheetFile={gsheetFile} setIsSheetRowDeleted={setIsSheetRowDeleted} gsheetExtractsList={gsheetExtractsList}/>}
        <button onClick={
          () => {
            setIsModalOpen(!isModalOpen)
          }
        }><span className="material-symbols-outlined">delete</span></button>
      </>
  );
}

export default DeleteCoeffectiveGsheetButton;
