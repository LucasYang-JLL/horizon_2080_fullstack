import React, { Component } from "react";

const Directory = (props) => {
    const { folder, target } = props;
    return (
        <div style={{ margin: "16px 0", fontWeight: "bold" }}>
            <span>
                {folder} {target ? `/ ${target}` : null}
            </span>
        </div>
    );
};

export default Directory;
