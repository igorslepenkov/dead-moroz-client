import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export enum ConfrimationStatus {
  Success = "success",
  Error = "error",
}

type ConfirmationParam = ConfrimationStatus | null;

interface IConfirmationParams {
  confirmation: ConfirmationParam;
  error: string | null;
}

export const useConfirmationParams = () => {
  const [params] = useSearchParams();
  const [confirmationParams, setConfirmationParams] =
    useState<IConfirmationParams>(() => {
      return {
        confirmation: params.get("confirmation") as ConfirmationParam,
        error: params.get("error"),
      };
    });

  useEffect(() => {
    setConfirmationParams(() => {
      return {
        confirmation: params.get("confirmation") as ConfirmationParam,
        error: params.get("error"),
      };
    });
  }, [params]);

  return confirmationParams;
};
