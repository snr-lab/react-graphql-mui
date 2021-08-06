import React, { Fragment, useState, useContext, createContext, useRef } from "react";
import { ConfirmationDialog, ConfirmationOptions } from "../components/ui/ConfirmationDialog";

const ConfirmationServiceContext = createContext<[
  (options: ConfirmationOptions) => Promise<void>,
  () => void
]>([Promise.reject, () => {}]);

export const useAppConfirmation = () => useContext(ConfirmationServiceContext);

type ConfirmationProps = {
    children: React.ReactNode;
}

const Confirmation: React.FC<ConfirmationProps> = ({ children }) => {
  const [confirmationState, setConfirmationState] = useState<ConfirmationOptions | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const awaitingPromiseRef = useRef<{
    resolve: () => void;
    reject: () => void;
  }>();

  const openConfirmation = (options: ConfirmationOptions) => {
    setConfirmationState(options);
    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject();
    }
    setConfirmationState(null);
    setSubmitting(false);
  };

  const handleSubmit = () => {
    if(confirmationState && !confirmationState.asyncSubmit){
      setConfirmationState(null);
      setSubmitting(false);
    }else{
      setSubmitting(true);
    }
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve();
    }
  };

  return (
    <Fragment>
      <ConfirmationServiceContext.Provider
        value={[openConfirmation, handleClose]}
        children={children}
      />
        {confirmationState && <ConfirmationDialog
          open={Boolean(confirmationState)}
          onSubmit={handleSubmit}
          onClose={handleClose}
          submitting={submitting}
          {...confirmationState}
        />}
    </Fragment>
  );
};

export default Confirmation;
