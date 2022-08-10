import React from 'react';
import Mylibrary from "./library";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Mylibrary/>);