import React from "react";
import "./KeyHolder.css";

function KeyHolder() {
  return (
    <>
        <div className="rKeyContainer">
            <div className="key">
                <div className="keyInner">
                <div className="keyText">R</div>
                </div>
            </div>
            <div className="keyLabel"> : Rotate</div>
            </div>
        <div className="fKeyContainer">
            <div className="key">
                <div className="keyInner">
                <div className="keyText">F</div>
                </div>
            </div>
            <div className="keyLabel"> : Flip</div>
        </div>
    </>
  );
}

export default KeyHolder;
