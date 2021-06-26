import React, { useState } from "react";
// import { connect } from "react-redux";
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

import classes from "./Breakdown.module.css";
// import * as actions from "../../store/actions/index";
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
    // this.setState({ isOpen: false });
    setIsOpen(false);
  };

  const handleOpen = () => {
    // this.setState({ isOpen: true });
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
      // const serviceAndGst = person.total - person.subTotal;
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
    <div className={classes.Breakdown}>
      <h3>Total: ${props.total}</h3>
      <List className={classes.BreakdownList} style={{ marginBottom: "10px" }}>
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

/* OLD CODE */

// class Breakdown extends Component {
//   state = {
//     isOpen: false,
//     whatsappString: "https://api.whatsapp.com/send?text=",
//     // teleToken: '1373978841:AAEk3fv24Wb1HJRuYXPGJvLows8s6bSyOJU',
//     // telegramString: 'https://api.telegram.org/bot',
//     // telegramString2: 'tg://msg?text='
//   };

//   handleClose = () => {
//     this.setState({ isOpen: false });
//   };

//   handleOpen = () => {
//     this.setState({ isOpen: true });

//     // update whatsapp string
//     let WAString = this.state.whatsappString;
//     const newline = "%0A";
//     // loop through state and add
//     this.props.people.forEach((person) => {
//       // add name to list
//       WAString += `${person.personName} - $${person.total.toFixed(
//         2
//       )}${newline}`;
//       // add shares to list
//       person.shares.forEach((share) => {
//         WAString += ` - ${share.itemName} (${
//           share.fraction
//         }) $${share.sharePrice.toFixed(2)}${newline}`;
//       });
//       // add service and gst charge
//       const serviceAndGst = person.total - person.subTotal;
//       WAString += ` - GST / Service $${serviceAndGst.toFixed(
//         2
//       )}${newline}${newline}`;
//     });

//     this.setState({ whatsappString: WAString });

//     // // update telegram string
//     // // let TELEString = this.state.telegramString + this.state.teleToken + '/sendMessage?text=';
//     // let TELEString = this.state.telegramString2;
//     // // loop through state and add
//     // this.props.people.forEach(person => {
//     //     // add name to list
//     //     const personName = person.personName;
//     //     TELEString = TELEString + personName + newline;
//     // })
//     // this.setState({ whatsappString: WAString, telegramString2: TELEString });
//   };

//   render() {
//     const personBreakdownArr = this.props.people.map((el) => {
//       return <PersonBreakdown key={el.id} personObj={el} />;
//     });

//     return (
//       <div className={classes.Breakdown}>
//         <h3>Total: {this.props.total}</h3>
//         <List
//           className={classes.BreakdownList}
//           style={{ marginBottom: "10px" }}
//         >
//           {personBreakdownArr}
//         </List>
//         {/* <div className={classes.ButtonDiv}>
//                     <Button variant="contained" onClick={this.props.onPrev}>
//                         <NavigateBefore />People
//                     </Button>
//                     <Button onClick={this.handleOpen} variant="contained">
//                         Share<NavigateNext />
//                     </Button>
//                 </div> */}
//         <Modal
//           className={classes.modal}
//           open={this.state.isOpen}
//           onClose={this.handleClose}
//           closeAfterTransition
//           BackdropComponent={Backdrop}
//           BackdropProps={{ timeout: 500 }}
//         >
//           <Fade in={this.state.isOpen}>
//             <div className={classes.Paper}>
//               <h3>Where would you like to share?</h3>
//               <Button href={this.state.whatsappString}>Whatsapp</Button>
//               {/* <Button href={this.state.telegramString2}>
//                                 Telegram
//                             </Button> */}
//             </div>
//           </Fade>
//         </Modal>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     people: state.people.people,
//     subTotal: state.bill.subTotal,
//     total: state.bill.total,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onNext: () => dispatch(actions.next()),
//     onPrev: () => dispatch(actions.previous()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Breakdown);
