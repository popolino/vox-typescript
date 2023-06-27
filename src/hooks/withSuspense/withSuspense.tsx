import React from "react";
import SvgSelector from "../../components/svgSelector/SvgSelector";

export function withSuspense<WCP extends {}>(
  WrappedComponent: React.ComponentType<WCP>
) {
  return (props: WCP) => {
    return (
      <React.Suspense
        fallback={
          <div className="main-svg">
            <SvgSelector id="main_preloader" />
          </div>
        }
      >
        <WrappedComponent {...props} />
      </React.Suspense>
    );
  };
}
