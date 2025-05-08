// src/global.d.ts
import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Use 'any' to avoid type issues or define specific elements as needed
      [elem: string]: any;
    }
  }
}
