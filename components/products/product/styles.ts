import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root:{
    maxWidth: "100%"
  },
  media: {
    height: 0,
    width: "100%",
    paddingTop: '56.25%'
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between"
  }
})