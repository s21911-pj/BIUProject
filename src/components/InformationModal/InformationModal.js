import React from "react";
import "./InformationModal.css";

import Button from "./../Button/Button.js";

const InformationModal = ({ closeModal }) => {
    return (
        <div className="InformationModal">
            <div className="modal-container">
                <div className="modal-close-btn-container">
                    <button onClick={closeModal}>X</button>
                </div>
                <div className="modal-title">
                    <h1>Sudoku Game</h1>
                </div>
                <div className="modal-body">
                    <p>
                      Welcome
                    </p>
                    <div className="links">

                        <a href="https://github.com/s21911-pj/BIUProject.git">GitHub</a>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button
                        onClick={() =>
                            window.open("https://github.com/s21911-pj/BIUProject.git")
                        }
                        buttonStyle="btn--primary--solid"
                        text="GitHub"
                    />
                    <Button
                        onClick={closeModal}
                        buttonStyle="btn--success--solid"
                        text="Continue"
                    />
                </div>
            </div>
        </div>
    );
};

export default InformationModal;