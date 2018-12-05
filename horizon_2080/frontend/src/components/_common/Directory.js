import React, { Component } from "react";

const Directory = (props) => {
    const { folder, target } = props;
    return (
        <div>
            <h4>
                {folder} / {target}
            </h4>
        </div>
    );
};

export default Directory;
