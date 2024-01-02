import React from "react";
import { Skeleton } from "primereact/skeleton";

export default function SkeletonBody({ type }) {
  return (
    <div>
      {type === 1 ? (
        <Skeleton width="12rem" height="12rem"></Skeleton>
      ) : type === 2 ? (
        <div className="grid gap-2">
          <Skeleton width="4rem" height="1rem"></Skeleton>
          <Skeleton width="14rem" height="2rem"></Skeleton>
          <Skeleton width="17rem" height="3rem"></Skeleton>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
