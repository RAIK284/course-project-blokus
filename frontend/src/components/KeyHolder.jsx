import React from "react";
import "./KeyHolder.css";

function KeyHolder() {
  return (
    <>
        <div class="rKeyContainer">
            <div class="key">
                <div class="keyInner">
                <div class="keyText">R</div>
                </div>
            </div>
            <div class="keyLabel"> : Rotate</div>
            </div>
        <div class="fKeyContainer">
            <div class="key">
                <div class="keyInner">
                <div class="keyText">F</div>
                </div>
            </div>
            <div class="keyLabel"> : Flip</div>
        </div>
    </>
  );
}

export default KeyHolder;
