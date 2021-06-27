import React, { useState } from "react";
import {
  List,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiTypography from "@material-ui/core/Typography";

import "./Breakdown.css";
import PersonBreakdown from "./PersonBreakdown/PersonBreakdown";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Typography = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}))(MuiTypography);

const Breakdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [whatsappString] = useState("https://api.whatsapp.com/send?text=");
  const [teleString] = useState("tg://msg_url?url=&text=");
  const [bdString, setBdString] = useState("");

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
    const newline = "%0A";
    let BDString = `Total: ${props.total}${newline}${newline}` 
    // Loop through state and add
    props.people.forEach((person) => {
      // Add name to list
      BDString += `${person.personName} - $${person.total.toFixed(
        2
      )}${newline}`;
      // Add shares to list
      person.shares.forEach((share) => {
        BDString += ` - ${share.itemName} (${
          share.fraction
        }) $${share.sharePrice.toFixed(2)}${newline}`;
      });
      // Add service and gst charge
      const serviceAndGst = person.total - person.subTotal;
      BDString += ` - GST / Service $${serviceAndGst.toFixed(
        2
      )}${newline}${newline}`;
    });
    setBdString(BDString);
  };

  const createBDText = () => {
    const bdText = props.people.map((person) => {
      const shares = person.shares.map((share) => {
        return (
          <Typography variant="body2" gutterBottom key={share.itemId}>
            - {share.itemName} ({share.fraction}) ${share.sharePrice.toFixed(2)}
          </Typography>
        );
      });
      const serviceAndGstTypo = (
        <Typography variant="caption" gutterBottom key={person.id}>
          - GST / Service ${(person.total - person.subTotal).toFixed(2)}
        </Typography>
      );
      return (
        <div key={person.id}>
          <Typography variant="subtitle1" gutterBottom key={person.id}>
            {person.personName} - ${person.total.toFixed(2)}
          </Typography>
          {shares}
          {serviceAndGstTypo}
        </div >
      );
    });
    return bdText;
  };

  const personBreakdownArr = () => {
    const breakdownArr = props.people.map((el) => {
      return <PersonBreakdown key={el.id} personObj={el} />;
    });
    return breakdownArr;
  };

  return (
    <div className="Breakdown">
      <h3>Total: ${props.total}</h3>
      <List className="BreakdownList" style={{ marginBottom: "10px" }}>
        {personBreakdownArr()}
      </List>

      <Dialog onClose={handleClose} open={isOpen}>
        <DialogTitle onClose={handleClose}>Share</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>
            Total - ${props.total}
          </Typography>
          {createBDText()}
          <DialogContent>
            <Button
              style={{ backgroundColor: "lightgreen", margin: "0 5px 0 5px" }}
              href={whatsappString + bdString}
            >
              Whatsapp
            </Button>
            <Button
              style={{ backgroundColor: "lightblue", margin: "0 5px 0 5px" }}
              href={teleString + bdString}
            >
              Telegram
            </Button>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Button onClick={handleOpen} variant="contained">
        Share
      </Button>
    </div>
  );
};

export default Breakdown;