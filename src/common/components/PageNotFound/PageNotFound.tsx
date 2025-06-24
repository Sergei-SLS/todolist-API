import styles from "./PageNotFound.module.css"
import { Link } from "react-router"
import Button from "@mui/material/Button"

export const PageNotFound = () => (
  <>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>

    <Button
      variant="contained"
      color="primary"
      component={Link}
      to={"/"}
      sx={{ display: "flex", mx: "auto", mt: 3, width: 200 }}
    >
      {" "}
      Go to Home{" "}
    </Button>
  </>
)
