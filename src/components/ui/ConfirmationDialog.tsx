import React, { Fragment } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AsyncButton from "./AsyncButton";

export interface ConfirmationOptions {
	variant: "confirm" | "info";
	title: string;
	description: string;
	asyncSubmit?: boolean;
	confirmText?: string;
	cancelText?: string;
	okText?: string;
}

interface ConfirmationDialogProps extends ConfirmationOptions {
	open: boolean;
	submitting: boolean;
	onSubmit: () => void;
	onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
    title:{
       minWidth: 200
    },
    submitting: {
        position: "absolute"
    }
}));

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props) => {
	const { open, submitting, onSubmit, onClose, title, variant, description, asyncSubmit, confirmText, cancelText, okText } = props;
    const classes = useStyles();
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle id="alert-dialog-title" className={classes.title}>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{description}</DialogContentText>
			</DialogContent>
			<DialogActions>
				{variant === "confirm" && (
					<Fragment>
						<Button color="primary" onClick={onClose} autoFocus disabled={asyncSubmit && submitting}>
							{cancelText || "Cancel"}
						</Button>
						<AsyncButton color="primary" onClick={onSubmit} updating={asyncSubmit && submitting}>
							{confirmText || "Confirm"}
            			</AsyncButton>
					</Fragment>
				)}
				{variant === "info" && (
					<AsyncButton color="primary" onClick={onSubmit} updating={asyncSubmit && submitting}>
						{okText || "Ok"}
					</AsyncButton>
				)}
			</DialogActions>
		</Dialog>
	);
};
