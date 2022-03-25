import React, { Fragment } from "react";
import {
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./checkOutStep.css";

const CheckOutStep = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyle = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        style={stepStyle}
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color:
                  activeStep >= index
                    ? "#fca92d"
                    : "rgba(0,0,0,0.67)",
              }}
              icon={step.icon}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckOutStep;
